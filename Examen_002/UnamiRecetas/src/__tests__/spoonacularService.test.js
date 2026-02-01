jest.mock('axios');
jest.mock('../traductorService', () => ({
  traducirTituloReceta: jest.fn().mockResolvedValue('TÍTULO ES'),
  traducir: jest.fn().mockResolvedValue('TEXTO ES'),
  traducirIngrediente: jest.fn().mockResolvedValue('ING ES'),
  traducirDescripcionIngrediente: jest.fn().mockResolvedValue('ORIG ES'),
}));

const axios = require('axios');
const client = require('../spoonacularClient');
const traductorService = require('../traductorService');

describe('spoonacularClient', () => {
  beforeEach(() => jest.clearAllMocks());

  test('traducirIngredienteAIngles convierte palabras conocidas', () => {
    expect(client.traducirIngredienteAIngles('pollo')).toBe('chicken');
    expect(client.traducirIngredienteAIngles('unknown')).toBe('unknown');
  });

  test('obtenerDetalleReceta traduce campos y extendedIngredients', async () => {
    axios.get.mockResolvedValue({
      data: {
        title: 'My Title',
        summary: '<p>Resumen</p>',
        instructions: '<div>Instrucciones</div>',
        extendedIngredients: [{ name: 'salt', original: '1 tsp salt' }],
      },
    });

    const receta = await client.obtenerDetalleReceta(42);

    expect(axios.get).toHaveBeenCalled();
    expect(traductorService.traducirTituloReceta).toHaveBeenCalledWith('My Title');
    expect(receta.titleEs).toBe('TÍTULO ES');
    expect(receta.summaryEs).toBe('TEXTO ES');
    expect(receta.instructionsEs).toBe('TEXTO ES');
    expect(receta.extendedIngredients[0].nameEs).toBe('ING ES');
    expect(receta.extendedIngredients[0].originalEs).toBe('ORIG ES');
  });

  test('buscarRecetasPorIngredientes traduce títulos y ingredientes', async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          title: 'R1',
          usedIngredients: [{ name: 'salt', original: 'orig' }],
          missedIngredients: [{ name: 'pepper', original: 'orig2' }],
        },
      ],
    });

    const recetas = await client.buscarRecetasPorIngredientes(['salt'], 5);

    expect(axios.get).toHaveBeenCalled();
    expect(recetas[0].titleEs).toBe('TÍTULO ES');
    expect(recetas[0].usedIngredients[0].nameEs).toBe('ING ES');
    expect(recetas[0].missedIngredients[0].originalEs).toBe('ORIG ES');
  });

  test('buscarRecetasPorIngredientes maneja receta con solo usedIngredients', async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          title: 'OnlyUsed',
          usedIngredients: [{ name: 'salt', original: 'orig' }],
        },
      ],
    });

    const recetas = await client.buscarRecetasPorIngredientes(['salt'], 3);

    expect(axios.get).toHaveBeenCalled();
    expect(recetas[0].titleEs).toBe('TÍTULO ES');
    expect(recetas[0].usedIngredients[0].nameEs).toBe('ING ES');
    expect(recetas[0].missedIngredients).toBeUndefined();
  });

  test('buscarRecetasPorIngredientes maneja receta con solo missedIngredients', async () => {
    axios.get.mockResolvedValue({
      data: [
        {
          title: 'OnlyMissed',
          missedIngredients: [{ name: 'pepper', original: 'orig2' }],
        },
      ],
    });

    const recetas = await client.buscarRecetasPorIngredientes(['pepper'], 2);

    expect(axios.get).toHaveBeenCalled();
    expect(recetas[0].titleEs).toBe('TÍTULO ES');
    expect(recetas[0].missedIngredients[0].originalEs).toBe('ORIG ES');
    expect(recetas[0].usedIngredients).toBeUndefined();
  });

  test('buscarRecetasPorIngredientes usa el valor por defecto cuando no se pasa numero', async () => {
    axios.get.mockResolvedValue({ data: [] });

    await client.buscarRecetasPorIngredientes(['salt']);

    expect(axios.get).toHaveBeenCalled();
    const callArgs = axios.get.mock.calls[0];
    const options = callArgs[1] || {};
    expect(options.params).toBeDefined();
    expect(options.params.number).toBe(10);
  });

  test('buscarRecetasPorIngredientes devuelve vacío cuando ingredientes vacío o nulo', async () => {
    axios.get.mockResolvedValue({ data: [] });

    const resEmpty = await client.buscarRecetasPorIngredientes([], 5);
    expect(resEmpty).toEqual([]);

    const resNull = await client.buscarRecetasPorIngredientes(null, 5);
    expect(resNull).toEqual([]);

    expect(axios.get).not.toHaveBeenCalled();
  });
});
