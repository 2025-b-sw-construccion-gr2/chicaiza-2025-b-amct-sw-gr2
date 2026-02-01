const axios = require('axios');

/**
 * Servicio de traducción usando MyMemory API (gratuita, sin API key).
 * URL: https://mymemory.translated.net/
 * Límite: 5000 caracteres/día sin registro.
 */

const MYMEMORY_URL = 'https://api.mymemory.translated.net/get';
const MAX_QUERY_LENGTH = 450;

// Caché para evitar llamadas repetidas a la API
const cache = new Map();

// Mapa de respaldo para traducciones comunes
const TRADUCCIONES_RESPALDO = {
  chicken: 'pollo',
  beef: 'carne de res',
  pork: 'cerdo',
  fish: 'pescado',
  egg: 'huevo',
  eggs: 'huevos',
  milk: 'leche',
  cheese: 'queso',
  butter: 'mantequilla',
  cream: 'crema',
  tomato: 'tomate',
  tomatoes: 'tomates',
  onion: 'cebolla',
  onions: 'cebollas',
  garlic: 'ajo',
  potato: 'papa',
  potatoes: 'papas',
  carrot: 'zanahoria',
  carrots: 'zanahorias',
  rice: 'arroz',
  pasta: 'pasta',
  bread: 'pan',
  salt: 'sal',
  pepper: 'pimienta',
  sugar: 'azúcar',
  flour: 'harina',
  oil: 'aceite',
  'olive oil': 'aceite de oliva',
  water: 'agua',
  lemon: 'limón',
  orange: 'naranja',
  apple: 'manzana',
  banana: 'plátano',
  spinach: 'espinaca',
  lettuce: 'lechuga',
  mushroom: 'champiñón',
  mushrooms: 'champiñones',
  bacon: 'tocino',
  ham: 'jamón',
  shrimp: 'camarón',
  salmon: 'salmón',
  tuna: 'atún',
  'chicken breast': 'pechuga de pollo',
  'ground beef': 'carne molida',
  'bell pepper': 'pimiento',
  broccoli: 'brócoli',
  corn: 'maíz',
  beans: 'frijoles',
  lentils: 'lentejas',
  vinegar: 'vinagre',
  'soy sauce': 'salsa de soya',
  mustard: 'mostaza',
  avocado: 'aguacate',
  yogurt: 'yogurt',
  turkey: 'pavo',
  chorizo: 'chorizo',
  strawberry: 'fresa',
  strawberries: 'fresas',
};

/**
 * Traduce un fragmento corto usando MyMemory API.
 * @param {string} texto - Texto en inglés
 * @returns {Promise<string>} Texto traducido al español
 */
async function traducirFragmento(texto) {
  if (!texto || texto.trim() === '') {
    return texto;
  }

  const textoLimpio = texto.trim();
  const cacheKey = textoLimpio.toLowerCase();

  // Verificar caché primero
  if (cache.has(cacheKey)) {
    return cache.get(cacheKey);
  }

  // Verificar respaldo
  if (TRADUCCIONES_RESPALDO[cacheKey]) {
    const traduccion = TRADUCCIONES_RESPALDO[cacheKey];
    cache.set(cacheKey, traduccion);
    return traduccion;
  }

  try {
    const response = await axios.get(MYMEMORY_URL, {
      params: {
        q: textoLimpio,
        langpair: 'en|es',
      },
      timeout: 5000,
    });

    if (response.data && response.data.responseData && response.data.responseData.translatedText) {
      const traduccion = response.data.responseData.translatedText;

      // Verificar que no sea un error
      if (
        traduccion &&
        !traduccion.includes('QUERY LENGTH LIMIT EXCEEDED') &&
        !traduccion.includes('MYMEMORY WARNING')
      ) {
        cache.set(cacheKey, traduccion);
        return traduccion;
      }
    }
  } catch (error) {
    console.error(`Error al traducir '${texto}':`, error.message);
  }

  // Si falla, buscar traducción parcial o retornar original
  return buscarTraduccionParcial(texto);
}

/**
 * Busca traducción parcial en el mapa de respaldo.
 */
function buscarTraduccionParcial(texto) {
  const textoLower = texto.toLowerCase();

  for (const [ingles, espanol] of Object.entries(TRADUCCIONES_RESPALDO)) {
    if (textoLower.includes(ingles)) {
      const resultado = textoLower.replace(ingles, espanol);
      return resultado.charAt(0).toUpperCase() + resultado.slice(1);
    }
  }

  return texto;
}

/**
 * Traduce un texto largo dividiéndolo en fragmentos.
 */
async function traducirTextoLargo(texto) {
  const oraciones = texto.split(/(?<=[.!?])\s+/);
  const resultados = [];
  let fragmentoActual = '';

  for (const oracion of oraciones) {
    if (oracion.length > MAX_QUERY_LENGTH) {
      if (fragmentoActual) {
        resultados.push(await traducirFragmento(fragmentoActual.trim()));
        fragmentoActual = '';
      }
      // Dividir por comas si es muy larga
      const partes = oracion.split(/,\s*/);
      for (const parte of partes) {
        resultados.push(await traducirFragmento(parte.trim()));
      }
    } else if (fragmentoActual.length + oracion.length + 1 > MAX_QUERY_LENGTH) {
      resultados.push(await traducirFragmento(fragmentoActual.trim()));
      fragmentoActual = oracion;
    } else {
      fragmentoActual += (fragmentoActual ? ' ' : '') + oracion;
    }
  }

  if (fragmentoActual) {
    resultados.push(await traducirFragmento(fragmentoActual.trim()));
  }

  return resultados.join(' ').trim();
}

/**
 * Traduce un texto de inglés a español.
 * @param {string} texto - Texto en inglés
 * @returns {Promise<string>} Texto traducido al español
 */
async function traducir(texto) {
  if (!texto || texto.trim() === '') {
    return texto;
  }

  const textoLimpio = texto.trim();

  if (textoLimpio.length > MAX_QUERY_LENGTH) {
    return traducirTextoLargo(textoLimpio);
  }

  return traducirFragmento(textoLimpio);
}

/**
 * Traduce el nombre de un ingrediente.
 */
async function traducirIngrediente(ingredienteIngles) {
  if (!ingredienteIngles) return ingredienteIngles;
  return traducir(ingredienteIngles);
}

/**
 * Traduce una descripción de ingrediente completa.
 */
async function traducirDescripcionIngrediente(descripcion) {
  if (!descripcion) return descripcion;
  return traducir(descripcion);
}

/**
 * Traduce el título de una receta.
 */
async function traducirTituloReceta(titulo) {
  if (!titulo) return titulo;
  return traducir(titulo);
}

/**
 * Limpia la caché de traducciones.
 */
function limpiarCache() {
  cache.clear();
}

module.exports = {
  traducir,
  traducirIngrediente,
  traducirDescripcionIngrediente,
  traducirTituloReceta,
  limpiarCache,
  traducirFragmento,
  TRADUCCIONES_RESPALDO,
};
