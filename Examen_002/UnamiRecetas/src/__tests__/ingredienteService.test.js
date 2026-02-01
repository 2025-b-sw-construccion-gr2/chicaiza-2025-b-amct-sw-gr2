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

describe('ingredienteService', () => {
  beforeEach(() => jest.clearAllMocks());

  test('obtenerTodosLosIngredientes devuelve lista', async () => {
    const mock = [{ id: 1, nombre: 'A' }];
    Ingrediente.findAll.mockResolvedValue(mock);
    const res = await service.obtenerTodosLosIngredientes();
    expect(res).toEqual(mock);
  });

  test('obtenerIngredientesAgrupadosPorCategoria devuelve Map con categorias', async () => {
    const categoria = { id: 10, nombre: 'Cat', ingredientes: [{ id: 2, nombre: 'B' }] };
    Categoria.findAll.mockResolvedValue([categoria]);

    const mapa = await service.obtenerIngredientesAgrupadosPorCategoria();
    expect(mapa instanceof Map).toBeTruthy();
    expect(mapa.get(categoria)).toEqual(categoria.ingredientes);
  });

  test('obtenerIngredientesPorIds retorna vacío si ids vacío', async () => {
    const res = await service.obtenerIngredientesPorIds([]);
    expect(res).toEqual([]);
  });

  test('obtenerIngredientesPorIds devuelve ingredientes cuando ids no vacío', async () => {
    const mock = [{ id: 1, nombre: 'A' }, { id: 2, nombre: 'B' }];
    Ingrediente.findAll.mockResolvedValue(mock);

    const res = await service.obtenerIngredientesPorIds([1, 2]);

    expect(Ingrediente.findAll).toHaveBeenCalledWith(expect.objectContaining({
      where: { id: [1, 2] },
    }));
    expect(res).toEqual(mock);
  });

  test('obtenerIngredientesAgrupadosPorCategoria incluye solo categorias con ingredientes', async () => {
    const catCon = { id: 1, nombre: 'Con', ingredientes: [{ id: 11, nombre: 'X' }] };
    const catSin = { id: 2, nombre: 'Sin', ingredientes: [] };

    Categoria.findAll.mockResolvedValue([catCon, catSin]);

    const mapa = await service.obtenerIngredientesAgrupadosPorCategoria();

    expect(mapa instanceof Map).toBeTruthy();
    expect(mapa.size).toBe(1);
    expect(mapa.get(catCon)).toEqual(catCon.ingredientes);
    expect(mapa.has(catSin)).toBeFalsy();
  });

  test('obtenerIngredientePorId devuelve ingrediente', async () => {
    const item = { id: 3, nombre: 'C' };
    Ingrediente.findByPk.mockResolvedValue(item);
    const res = await service.obtenerIngredientePorId(3);
    expect(res).toEqual(item);
  });
});
