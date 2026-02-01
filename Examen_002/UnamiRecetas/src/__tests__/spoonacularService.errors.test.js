jest.mock('axios');
jest.mock('../traductorService', () => ({
  traducirTituloReceta: jest.fn().mockResolvedValue('TÍTULO ES'),
  traducir: jest.fn().mockResolvedValue('TEXTO ES'),
  traducirIngrediente: jest.fn().mockResolvedValue('ING ES'),
  traducirDescripcionIngrediente: jest.fn().mockResolvedValue('ORIG ES'),
}));

const axios = require('axios');
const client = require('../spoonacularClient');

describe('spoonacularClient - error cases', () => {
  beforeEach(() => jest.clearAllMocks());

  test('obtenerDetalleReceta devuelve null cuando axios falla', async () => {
    axios.get.mockRejectedValue(new Error('network error'));
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const res = await client.obtenerDetalleReceta(123);

    expect(res).toBeNull();
    expect(console.error).toHaveBeenCalled();

    spy.mockRestore();
  });

  test('buscarRecetasPorIngredientes devuelve vacío cuando axios falla', async () => {
    axios.get.mockRejectedValue(new Error('network'));
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const res = await client.buscarRecetasPorIngredientes(['salt'], 5);

    expect(res).toEqual([]);
    expect(console.error).toHaveBeenCalled();

    spy.mockRestore();
  });

  test('obtenerDetalleReceta maneja respuesta parcial sin campos opcionales', async () => {
    axios.get.mockResolvedValue({ data: { title: 'Only title' } });

    const res = await client.obtenerDetalleReceta(1);

    expect(axios.get).toHaveBeenCalled();
    expect(res).not.toBeNull();
    expect(res.titleEs).toBe('TÍTULO ES');
  });
});
