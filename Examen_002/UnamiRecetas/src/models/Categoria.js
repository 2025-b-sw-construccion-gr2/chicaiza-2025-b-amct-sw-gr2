const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

/**
 * Modelo Sequelize que representa una categoría de ingredientes.
 */
const Categoria = sequelize.define(
  'Categoria',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    icono: {
      type: DataTypes.STRING(10),
      allowNull: true,
    },
  },
  {
    tableName: 'categoria',
  },
);

module.exports = Categoria;
