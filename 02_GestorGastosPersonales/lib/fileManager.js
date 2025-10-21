import fs from 'fs-extra';
import { logger } from './logger.js';

const FILE_PATH = './data/gastos.json';

export async function cargarGastos() {
  try {
    if (await fs.pathExists(FILE_PATH)) {
      const data = await fs.readJson(FILE_PATH);
      return data;
    }
    return [];
  } catch (error) {
    logger.error('Error al cargar los gastos.');
    return [];
  }
}

export async function guardarGastos(gastos) {
  try {
    await fs.writeJson(FILE_PATH, gastos, { spaces: 2 });
    logger.success('Datos guardados correctamente.');
  } catch (error) {
    logger.error('Error al guardar los gastos.');
  }
}