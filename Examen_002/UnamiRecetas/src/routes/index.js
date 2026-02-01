const express = require('express');
const router = express.Router();
const ingredienteService = require('../services/ingredienteService');
const spoonacularClient = require('../services/spoonacularClient');

/**
 * Página de inicio
 * GET /
 */
router.get('/', (req, res) => {
  res.render('inicio', {
    title: 'Umami | El Quinto Sabor',
  });
});

/**
 * Alias para inicio
 * GET /inicio
 */
router.get('/inicio', (req, res) => {
  res.redirect('/');
});

/**
 * Página de selección de ingredientes
 * GET /ingredientes
 */
router.get('/ingredientes', async (req, res) => {
  try {
    const ingredientesPorCategoria =
      await ingredienteService.obtenerIngredientesAgrupadosPorCategoria();

    res.render('ingredientes', {
      title: 'Buscar Recetas | Umami',
      ingredientesPorCategoria,
    });
  } catch (error) {
    console.error('Error en /ingredientes:', error);
    res.render('ingredientes', {
      title: 'Buscar Recetas | Umami',
      ingredientesPorCategoria: new Map(),
    });
  }
});

/**
 * Buscar recetas con los ingredientes seleccionados
 * POST /recetas
 */
router.post('/recetas', async (req, res) => {
  try {
    let ingredientesIds = req.body.ingredientes || [];

    // Asegurar que sea un array
    if (!Array.isArray(ingredientesIds)) {
      ingredientesIds = [ingredientesIds];
    }

    let recetas = [];
    let ingredientesSeleccionados = [];

    if (ingredientesIds.length > 0) {
      // Convertir IDs a enteros
      const ids = ingredientesIds.map((id) => parseInt(id, 10));

      // Obtener los ingredientes de la BD
      const ingredientes = await ingredienteService.obtenerIngredientesPorIds(ids);

      // Extraer nombres en español para mostrar al usuario
      ingredientesSeleccionados = ingredientes.map((ing) => ing.nombre);

      // Extraer nombres en inglés para la API
      const ingredientesEnIngles = ingredientes.map((ing) => ing.nombre_ingles);

      // Consultar la API de Spoonacular con nombres en inglés
      recetas = await spoonacularClient.buscarRecetasPorIngredientes(ingredientesEnIngles, 10);
    }

    res.render('recetas', {
      title: 'Resultados Umami | Análisis de Sabores',
      recetas,
      ingredientesSeleccionados,
    });
  } catch (error) {
    console.error('Error en POST /recetas:', error);
    res.render('recetas', {
      title: 'Resultados Umami | Análisis de Sabores',
      recetas: [],
      ingredientesSeleccionados: [],
    });
  }
});

/**
 * Redirigir GET /recetas a ingredientes
 * GET /recetas
 */
router.get('/recetas', (req, res) => {
  res.redirect('/ingredientes');
});

/**
 * Ver detalle de una receta
 * GET /receta?id=123
 */
router.get('/receta', async (req, res) => {
  const idParam = req.query.id;

  if (!idParam) {
    return res.redirect('/ingredientes');
  }

  try {
    const recetaId = parseInt(idParam, 10);

    if (isNaN(recetaId)) {
      return res.redirect('/ingredientes');
    }

    // Obtener detalle de la receta desde la API
    const receta = await spoonacularClient.obtenerDetalleReceta(recetaId);

    if (receta) {
      res.render('receta-detalle', {
        title: `${receta.titleEs} | Umami`,
        receta,
      });
    } else {
      res.redirect('/ingredientes');
    }
  } catch (error) {
    console.error('Error en /receta:', error);
    res.redirect('/ingredientes');
  }
});

module.exports = router;
