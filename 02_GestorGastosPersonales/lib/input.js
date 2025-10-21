import inquirer from 'inquirer';

export async function mostrarMenuPrincipal() {
  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: 'Selecciona una opción:',
      choices: [
        'Agregar gasto',
        'Ver todos los gastos',
        'Filtrar por categoría',
        'Ver estadísticas',
        'Salir',
      ],
    },
  ]);
  return opcion;
}

export async function solicitarGasto(categorias) {
  const respuestas = await inquirer.prompt([
    {
      type: 'input',
      name: 'descripcion',
      message: 'Descripción del gasto:',
    },
    {
      type: 'number',
      name: 'monto',
      message: 'Monto gastado:',
      validate: (value) => (value > 0 ? true : 'Ingresa un monto válido.'),
    },
    {
      type: 'list',
      name: 'categoria',
      message: 'Selecciona la categoría:',
      choices: [...categorias, 'Otros'],
    },
  ]);

  if (respuestas.categoria === 'Otros') {
    const { nuevaCategoria } = await inquirer.prompt([
      {
        type: 'input',
        name: 'nuevaCategoria',
        message: 'Ingresa el nombre de la nueva categoría:',
      },
    ]);
    respuestas.categoria = nuevaCategoria;
  }

  return respuestas;
}

export async function seleccionarCategoria(categorias) {
  const { categoria } = await inquirer.prompt([
    {
      type: 'list',
      name: 'categoria',
      message: 'Selecciona la categoría a filtrar:',
      choices: categorias,
    },
  ]);
  return categoria;
}