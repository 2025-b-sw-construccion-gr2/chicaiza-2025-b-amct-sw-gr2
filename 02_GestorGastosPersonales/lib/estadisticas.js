import { logger } from './logger.js';

export function mostrarEstadisticas(gastos) {
  if (gastos.length === 0) {
    logger.warning('No hay gastos registrados para mostrar estadísticas.');
    return;
  }

  const total = gastos.reduce((acc, g) => acc + g.monto, 0);
  const promedio = total / gastos.length;

  const porCategoria = {};
  gastos.forEach((g) => {
    porCategoria[g.categoria] = (porCategoria[g.categoria] || 0) + g.monto;
  });

  logger.titulo('📊 ESTADÍSTICAS');
  logger.info(`Total gastado: $${total.toFixed(2)}`);
  logger.info(`Promedio por gasto: $${promedio.toFixed(2)}`);

  console.log('\nGastos por categoría:');
  for (const [cat, val] of Object.entries(porCategoria)) {
    console.log(`  - ${cat}: $${val.toFixed(2)}`);
  }
}