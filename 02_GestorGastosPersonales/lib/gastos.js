import { solicitarGasto, seleccionarCategoria } from './input.js';
import { logger } from './logger.js';
import Table from 'cli-table3';

const categoriasBase = ['Alimentos', 'Transporte', 'Ropa', 'Entretenimiento', 'Hogar'];

export async function agregarGasto(gastos) {
  const nuevoGasto = await solicitarGasto(categoriasBase);
  nuevoGasto.fecha = new Date().toLocaleDateString();
  gastos.push(nuevoGasto);
  logger.success('Gasto agregado correctamente!');
  return gastos;
}

export function listarGastos(gastos) {
  if (gastos.length === 0) {
    logger.warning('No hay gastos registrados.');
    return;
  }

  const table = new Table({
    head: ['Descripción', 'Monto ($)', 'Categoría', 'Fecha'],
    colWidths: [25, 15, 20, 15],
  });

  gastos.forEach((g) => {
    table.push([g.descripcion, g.monto.toFixed(2), g.categoria, g.fecha]);
  });

  console.log(table.toString());
}

export async function filtrarPorCategoria(gastos) {
  const categorias = [...new Set(gastos.map((g) => g.categoria))];
  if (categorias.length === 0) {
    logger.warning('No hay categorías disponibles.');
    return;
  }

  const categoriaSeleccionada = await seleccionarCategoria(categorias);
  const filtrados = gastos.filter((g) => g.categoria === categoriaSeleccionada);

  if (filtrados.length === 0) {
    logger.warning('No hay gastos en esta categoría.');
  } else {
    logger.info(`Mostrando gastos en la categoría: ${categoriaSeleccionada}`);
    listarGastos(filtrados);
  }
}