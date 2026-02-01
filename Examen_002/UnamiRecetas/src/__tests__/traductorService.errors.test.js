const axios = require('axios');
const traductorService = require('../traductorService');

jest.mock('axios');

describe('traductorService - error and long text cases', () => {
  beforeEach(() => {
    traductorService.limpiarCache();
    jest.clearAllMocks();
  });

  test('cuando la API falla usa búsqueda parcial', async () => {
    axios.get.mockRejectedValue(new Error('network'));

    const res = await traductorService.traducir('hello chicken');

    expect(res.toLowerCase()).toContain('pollo');
  });

  test('traduce texto largo dividiéndolo en fragmentos', async () => {
    // Crear texto largo que supere MAX_QUERY_LENGTH
    const frase = 'This is a sentence about chicken. ';
    const largo = frase.repeat(30); // > 450 caracteres

    // Simular respuestas exitosas por fragmento
    axios.get.mockResolvedValue({ data: { responseData: { translatedText: 'fragmento' } } });

    const res = await traductorService.traducir(largo);

    expect(axios.get).toHaveBeenCalled();
    expect(typeof res).toBe('string');
  });

  test('funciones de envoltura retornan valor original cuando input vacío o nulo', async () => {
    expect(await traductorService.traducirIngrediente('')).toBe('');
    expect(await traductorService.traducirIngrediente(null)).toBe(null);

    expect(await traductorService.traducirDescripcionIngrediente('')).toBe('');
    expect(await traductorService.traducirDescripcionIngrediente(null)).toBe(null);

    expect(await traductorService.traducirTituloReceta('')).toBe('');
    expect(await traductorService.traducirTituloReceta(null)).toBe(null);

    // cuando hay texto, retorna la traducción (simulando API)
    axios.get.mockResolvedValue({ data: { responseData: { translatedText: 'hola' } } });
    const r = await traductorService.traducirIngrediente('hello');
    expect(r).toBe('hola');
  });

  test('buscarTraduccionParcial devuelve el texto original cuando no hay coincidencias', async () => {
    axios.get.mockRejectedValue(new Error('network'));

    const texto = 'qwertyxyz';
    const res = await traductorService.traducir(texto);

    expect(res).toBe(texto);
  });

  test('buscarTraduccionParcial reemplaza y capitaliza cuando hay coincidencia', async () => {
    axios.get.mockRejectedValue(new Error('network'));

    const res = await traductorService.traducir('This has chicken');

    expect(res).toBe('This has pollo');
  });

  test('traducirTextoLargo divide oracion larga por comas y traduce cada parte', async () => {
    // crear una oracion larga que supere MAX_QUERY_LENGTH y que tenga 3 partes separadas por comas
    const longPart = 'a'.repeat(460);
    const texto = `${longPart},part2,part3.`; // termina con punto para la separación de oraciones

    axios.get
      .mockImplementationOnce(() =>
        Promise.resolve({ data: { responseData: { translatedText: 'P1' } } }),
      )
      .mockImplementationOnce(() =>
        Promise.resolve({ data: { responseData: { translatedText: 'P2' } } }),
      )
      .mockImplementationOnce(() =>
        Promise.resolve({ data: { responseData: { translatedText: 'P3' } } }),
      );

    const res = await traductorService.traducir(texto);

    expect(axios.get).toHaveBeenCalledTimes(3);
    expect(res).toContain('P1');
    expect(res).toContain('P2');
    expect(res).toContain('P3');
  });

  test('flush de fragmentoActual cuando siguiente oración excede MAX_QUERY_LENGTH', async () => {
    // primera oración corta que se acumulará en fragmentoActual
    const short = 'Hello world.';
    // siguiente oración larga que excede MAX_QUERY_LENGTH
    const longOracion = 'a'.repeat(460) + '.';
    const texto = `${short} ${longOracion}`;

    // la primera llamada será para traducir el fragmento acumulado (short), la segunda para la parte larga
    axios.get
      .mockResolvedValueOnce({ data: { responseData: { translatedText: 'FLUSHED' } } })
      .mockResolvedValueOnce({ data: { responseData: { translatedText: 'LONG' } } });

    const res = await traductorService.traducir(texto);

    expect(axios.get).toHaveBeenCalledTimes(2);
    expect(res).toContain('FLUSHED');
    expect(res).toContain('LONG');
  });

  test('traducirFragmento retorna texto original cuando solo contiene espacios', async () => {
    axios.get.mockRejectedValue(new Error('network'));

    const input = '   ';
    const res = await traductorService.traducir(input);

    expect(res).toBe(input);
  });

  test('traducirFragmento retorna mismo valor para null, undefined y cadena vacía', async () => {
    expect(await traductorService.traducirFragmento('')).toBe('');
    expect(await traductorService.traducirFragmento(null)).toBe(null);
    expect(await traductorService.traducirFragmento(undefined)).toBe(undefined);
  });

  test('traducirFragmento usa la traducción cuando la API responde correctamente', async () => {
    axios.get.mockResolvedValue({ data: { responseData: { translatedText: 'hola' } } });

    const res = await traductorService.traducirFragmento('hello');
    expect(axios.get).toHaveBeenCalled();
    expect(res).toBe('hola');
  });

  test('traducirFragmento cubre la rama cuando response.data y responseData existen', async () => {
    const payload = { data: { responseData: { translatedText: 'buenas' } } };
    axios.get.mockResolvedValue(payload);

    const res = await traductorService.traducirFragmento('greet');
    expect(res).toBe('buenas');
  });

  test('traducirFragmento guarda en caché y evita segunda llamada a la API', async () => {
    traductorService.limpiarCache();
    axios.get.mockResolvedValue({ data: { responseData: { translatedText: 'cached' } } });

    const first = await traductorService.traducirFragmento('cacheme');
    expect(first).toBe('cached');
    expect(axios.get).toHaveBeenCalledTimes(1);

    // segunda llamada igual, debe venir del caché y no invocar axios de nuevo
    const second = await traductorService.traducirFragmento('cacheme');
    expect(second).toBe('cached');
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  test('ejecuta la rama exacta donde response.data.responseData.translatedText existe', async () => {
    traductorService.limpiarCache();
    const payload = { data: { responseData: { translatedText: 'EXACT' } } };
    axios.get.mockResolvedValue(payload);

    const r = await traductorService.traducirFragmento('exact-text');
    expect(r).toBe('EXACT');
    // comprobar caché evitó nueva llamada
    const r2 = await traductorService.traducirFragmento('exact-text');
    expect(r2).toBe('EXACT');
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

  test('traducirFragmento maneja respuesta sin data (response = {}) y usa fallback', async () => {
    traductorService.limpiarCache();
    axios.get.mockResolvedValue({});

    const input = 'no-match-word';
    const res = await traductorService.traducirFragmento(input);
    expect(res).toBe(input);
  });

  test('traducirFragmento maneja response.data vacío y usa buscarTraduccionParcial', async () => {
    traductorService.limpiarCache();
    axios.get.mockResolvedValue({ data: {} });

    const res = await traductorService.traducirFragmento('This has chicken');
    expect(res).toBe('This has pollo');
  });

  test('traducirFragmento maneja response.data.responseData nulo y usa buscarTraduccionParcial', async () => {
    traductorService.limpiarCache();
    axios.get.mockResolvedValue({ data: { responseData: null } });

    const res = await traductorService.traducirFragmento('Chicken soup');
    expect(res.toLowerCase()).toContain('pollo');
  });

  test('traducirFragmento cae a buscarTraduccionParcial cuando la API devuelve QUERY LENGTH LIMIT EXCEEDED', async () => {
    axios.get.mockResolvedValue({
      data: { responseData: { translatedText: 'QUERY LENGTH LIMIT EXCEEDED' } },
    });

    const res = await traductorService.traducirFragmento('This has chicken');
    expect(res).toBe('This has pollo');
  });

  test('traducirFragmento cae a buscarTraduccionParcial cuando la API devuelve MYMEMORY WARNING', async () => {
    axios.get.mockResolvedValue({ data: { responseData: { translatedText: 'MYMEMORY WARNING' } } });

    const res = await traductorService.traducirFragmento('Chicken and rice');
    expect(res).toBe('Pollo and rice');
  });

  test('traducirDescripcionIngrediente y traducirTituloReceta delegan a traducir', async () => {
    axios.get.mockResolvedValue({ data: { responseData: { translatedText: 'descripcion-es' } } });

    const desc = await traductorService.traducirDescripcionIngrediente('some description');
    expect(desc).toBe('descripcion-es');

    axios.get.mockResolvedValue({ data: { responseData: { translatedText: 'titulo-es' } } });
    const title = await traductorService.traducirTituloReceta('some title');
    expect(title).toBe('titulo-es');
  });
});
