import { mostrarMenuPrincipal } from './lib/input.js';
import { logger } from './lib/logger.js';
import { agregarGasto, listarGastos, filtrarPorCategoria } from './lib/gastos.js';
import { mostrarEstadisticas } from './lib/estadisticas.js';
import { cargarGastos, guardarGastos } from './lib/fileManager.js';

let gastos = await cargarGastos();

async function main() {
  logger.titulo('💸 GESTOR DE GASTOS PERSONALES');

  let salir = false;
  while (!salir) {
    const opcion = await mostrarMenuPrincipal();

    switch (opcion) {
      case 'Agregar gasto':
        gastos = await agregarGasto(gastos);
        await guardarGastos(gastos);
        break;

      case 'Ver todos los gastos':
        listarGastos(gastos);
        break;

      case 'Filtrar por categoría':
        await filtrarPorCategoria(gastos);
        break;

      case 'Ver estadísticas':
        mostrarEstadisticas(gastos);
        break;

      case 'Salir':
        salir = true;
        logger.info('👋 ¡Hasta luego!');
        break;
    }
  }
}

main();