const { Ingrediente, Categoria } = require('../models');

/**
 * Servicio para la lógica de negocio de Ingredientes.
 */

/**
 * Obtiene todos los ingredientes disponibles.
 * @returns {Promise<Array>} Lista de ingredientes
 */
async function obtenerTodosLosIngredientes() {
    try {
        const ingredientes = await Ingrediente.findAll({
            include: [{
                model: Categoria,
                as: 'categoria'
            }],
            order: [['nombre', 'ASC']]
        });
        return ingredientes;
    } catch (error) {
        console.error('Error al obtener ingredientes:', error.message);
        return [];
    }
}

/**
 * Obtiene todos los ingredientes agrupados por categoría.
 * @returns {Promise<Map>} Mapa de Categoría -> Lista de Ingredientes
 */
async function obtenerIngredientesAgrupadosPorCategoria() {
    try {
        const categorias = await Categoria.findAll({
            include: [{
                model: Ingrediente,
                as: 'ingredientes'
            }],
            order: [
                ['nombre', 'ASC'],
                [{ model: Ingrediente, as: 'ingredientes' }, 'nombre', 'ASC']
            ]
        });

        // Convertir a un formato de mapa para la vista
        const mapa = new Map();
        for (const categoria of categorias) {
            if (categoria.ingredientes && categoria.ingredientes.length > 0) {
                mapa.set(categoria, categoria.ingredientes);
            }
        }

        return mapa;
    } catch (error) {
        console.error('Error al obtener ingredientes por categoría:', error.message);
        return new Map();
    }
}

/**
 * Obtiene ingredientes por sus IDs.
 * @param {number[]} ids - Lista de IDs de ingredientes
 * @returns {Promise<Array>} Lista de ingredientes
 */
async function obtenerIngredientesPorIds(ids) {
    if (!ids || ids.length === 0) {
        return [];
    }

    try {
        const ingredientes = await Ingrediente.findAll({
            where: {
                id: ids
            },
            include: [{
                model: Categoria,
                as: 'categoria'
            }]
        });
        return ingredientes;
    } catch (error) {
        console.error('Error al obtener ingredientes por IDs:', error.message);
        return [];
    }
}

/**
 * Obtiene un ingrediente por su ID.
 * @param {number} id - ID del ingrediente
 * @returns {Promise<Object|null>} Ingrediente encontrado o null
 */
async function obtenerIngredientePorId(id) {
    try {
        const ingrediente = await Ingrediente.findByPk(id, {
            include: [{
                model: Categoria,
                as: 'categoria'
            }]
        });
        return ingrediente;
    } catch (error) {
        console.error('Error al obtener ingrediente:', error.message);
        return null;
    }
}

module.exports = {
    obtenerTodosLosIngredientes,
    obtenerIngredientesAgrupadosPorCategoria,
    obtenerIngredientesPorIds,
    obtenerIngredientePorId
};
