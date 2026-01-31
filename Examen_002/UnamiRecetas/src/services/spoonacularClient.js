const axios = require('axios');
const traductorService = require('./traductorService');

/**
 * Cliente para consumir la API de Spoonacular.
 */

const BASE_URL = process.env.SPOONACULAR_BASE_URL || 'https://api.spoonacular.com';
const API_KEY = process.env.SPOONACULAR_API_KEY || '';

// Mapa de traducción español -> inglés para ingredientes
const TRADUCCIONES_ES_EN = {
  'carne de res': 'beef',
  cerdo: 'pork',
  tocino: 'bacon',
  jamón: 'ham',
  chorizo: 'chorizo',
  pollo: 'chicken',
  'pechuga de pollo': 'chicken breast',
  pavo: 'turkey',
  pescado: 'fish',
  camarón: 'shrimp',
  atún: 'tuna',
  salmón: 'salmon',
  leche: 'milk',
  queso: 'cheese',
  crema: 'cream',
  mantequilla: 'butter',
  huevo: 'egg',
  yogurt: 'yogurt',
  tomate: 'tomato',
  cebolla: 'onion',
  ajo: 'garlic',
  pimiento: 'bell pepper',
  zanahoria: 'carrot',
  papa: 'potato',
  lechuga: 'lettuce',
  espinaca: 'spinach',
  brócoli: 'broccoli',
  champiñones: 'mushrooms',
  aguacate: 'avocado',
  maíz: 'corn',
  limón: 'lemon',
  naranja: 'orange',
  manzana: 'apple',
  plátano: 'banana',
  fresa: 'strawberry',
  arroz: 'rice',
  pasta: 'pasta',
  frijoles: 'beans',
  lentejas: 'lentils',
  pan: 'bread',
  harina: 'flour',
  sal: 'salt',
  pimienta: 'pepper',
  'aceite de oliva': 'olive oil',
  vinagre: 'vinegar',
  'salsa de soya': 'soy sauce',
  mostaza: 'mustard',
};

/**
 * Traduce un ingrediente de español a inglés.
 * @param {string} ingredienteEspanol - Nombre del ingrediente en español
 * @returns {string} Nombre del ingrediente en inglés
 */
function traducirIngredienteAIngles(ingredienteEspanol) {
  const normalizado = ingredienteEspanol.toLowerCase().trim();
  return TRADUCCIONES_ES_EN[normalizado] || ingredienteEspanol;
}

/**
 * Obtiene el detalle completo de una receta por su ID.
 * @param {number} recetaId - ID de la receta
 * @returns {Promise<Object|null>} Detalle de la receta o null si no se encuentra
 */
async function obtenerDetalleReceta(recetaId) {
  try {
    const url = `${BASE_URL}/recipes/${recetaId}/information`;

    const response = await axios.get(url, {
      params: { apiKey: API_KEY },
      timeout: 10000,
    });

    const receta = response.data;

    // Traducir campos principales
    receta.titleEs = await traductorService.traducirTituloReceta(receta.title);

    if (receta.summary) {
      // Limpiar HTML antes de traducir
      const textoLimpio = receta.summary
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      receta.summaryEs = await traductorService.traducir(textoLimpio);
    }

    if (receta.instructions) {
      const textoLimpio = receta.instructions
        .replace(/<[^>]*>/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      receta.instructionsEs = await traductorService.traducir(textoLimpio);
    }

    // Traducir ingredientes extendidos
    if (receta.extendedIngredients) {
      for (const ing of receta.extendedIngredients) {
        ing.nameEs = await traductorService.traducirIngrediente(ing.name);
        ing.originalEs = await traductorService.traducirDescripcionIngrediente(ing.original);
      }
    }

    return receta;
  } catch (error) {
    console.error('Error al obtener detalle de receta:', error.message);
    return null;
  }
}

/**
 * Busca recetas por ingredientes usando la API de Spoonacular.
 * @param {string[]} ingredientes - Lista de nombres de ingredientes (en inglés)
 * @param {number} numero - Número máximo de recetas a obtener
 * @returns {Promise<Array>} Lista de recetas encontradas
 */
async function buscarRecetasPorIngredientes(ingredientes, numero = 10) {
  if (!ingredientes || ingredientes.length === 0) {
    return [];
  }

  try {
    const ingredientesParam = ingredientes.join(',');
    const url = `${BASE_URL}/recipes/findByIngredients`;

    const response = await axios.get(url, {
      params: {
        apiKey: API_KEY,
        ingredients: ingredientesParam,
        number: numero,
        ranking: 1,
        ignorePantry: true,
      },
      timeout: 10000,
    });

    const recetas = response.data;

    // Traducir títulos y nombres de ingredientes
    for (const receta of recetas) {
      receta.titleEs = await traductorService.traducirTituloReceta(receta.title);

      if (receta.usedIngredients) {
        for (const ing of receta.usedIngredients) {
          ing.nameEs = await traductorService.traducirIngrediente(ing.name);
          ing.originalEs = await traductorService.traducirDescripcionIngrediente(ing.original);
        }
      }

      if (receta.missedIngredients) {
        for (const ing of receta.missedIngredients) {
          ing.nameEs = await traductorService.traducirIngrediente(ing.name);
          ing.originalEs = await traductorService.traducirDescripcionIngrediente(ing.original);
        }
      }
    }

    return recetas;
  } catch (error) {
    console.error('Error al buscar recetas:', error.message);
    return [];
  }
}

module.exports = {
  obtenerDetalleReceta,
  buscarRecetasPorIngredientes,
  traducirIngredienteAIngles,
};
