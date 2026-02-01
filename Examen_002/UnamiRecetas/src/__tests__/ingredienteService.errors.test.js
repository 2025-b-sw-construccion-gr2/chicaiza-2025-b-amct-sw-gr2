jest.mock('../models', () => ({
  Ingrediente: {
    findAll: jest.fn(),
    findByPk: jest.fn(),
  },
  Categoria: {
    findAll: jest.fn(),
  },
}));

const { Ingrediente, Categoria } = require('../models');
const service = require('../ingredienteService');

describe('ingredienteService - error cases', () => {
  beforeEach(() => jest.clearAllMocks());

  test('obtenerTodosLosIngredientes devuelve [] cuando falla', async () => {
    Ingrediente.findAll.mockRejectedValue(new Error('db error'));
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const res = await service.obtenerTodosLosIngredientes();

    expect(res).toEqual([]);
    expect(console.error).toHaveBeenCalled();

    spy.mockRestore();
  });

  test('obtenerIngredientesAgrupadosPorCategoria devuelve Map vacío cuando falla', async () => {
    Categoria.findAll.mockRejectedValue(new Error('db fail'));
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const mapa = await service.obtenerIngredientesAgrupadosPorCategoria();

    expect(mapa instanceof Map).toBeTruthy();
    expect(mapa.size).toBe(0);
    expect(console.error).toHaveBeenCalled();

    spy.mockRestore();
  });

  test('obtenerIngredientesPorIds devuelve [] cuando falla la consulta', async () => {
    Ingrediente.findAll.mockRejectedValue(new Error('db error'));
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const res = await service.obtenerIngredientesPorIds([1, 2]);

    expect(res).toEqual([]);
    expect(console.error).toHaveBeenCalled();

    spy.mockRestore();
  });

  test('obtenerIngredientePorId devuelve null cuando findByPk falla', async () => {
    Ingrediente.findByPk.mockRejectedValue(new Error('db fail'));
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});

    const res = await service.obtenerIngredientePorId(5);

    expect(res).toBeNull();
    expect(console.error).toHaveBeenCalled();

    spy.mockRestore();
  });
});
