const axios = require('axios');
const traductorService = require('../traductorService');

jest.mock('axios');

describe('traductorService', () => {
  beforeEach(() => {
    traductorService.limpiarCache();
    jest.clearAllMocks();
  });

  test('usa el mapa de respaldo para palabras comunes', async () => {
    const res = await traductorService.traducir('chicken');
    expect(res.toLowerCase()).toBe('pollo');
  });

  test('llama a la API externa cuando no hay respaldo', async () => {
    axios.get.mockResolvedValue({ data: { responseData: { translatedText: 'hola' } } });
    const res = await traductorService.traducir('hello');
    expect(axios.get).toHaveBeenCalled();
    expect(res).toBe('hola');
  });

  test('traducir devuelve el mismo texto vacío o nulo', async () => {
    expect(await traductorService.traducir('')).toBe('');
    expect(await traductorService.traducir(null)).toBe(null);
  });
});
