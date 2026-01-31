const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Categoria = require('./Categoria');

/**
 * Modelo Sequelize que representa un ingrediente en la base de datos.
 */
const Ingrediente = sequelize.define(
  'Ingrediente',
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
    nombre_ingles: {
      type: DataTypes.STRING(50),
      allowNull: false,
      field: 'nombre_ingles',
    },
    imagen_url: {
      type: DataTypes.STRING(255),
      allowNull: true,
      field: 'imagen_url',
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'categoria_id',
      references: {
        model: Categoria,
        key: 'id',
      },
    },
  },
  {
    tableName: 'ingrediente',
  },
);

// Definir relación con Categoria
Ingrediente.belongsTo(Categoria, {
  foreignKey: 'categoria_id',
  as: 'categoria',
});

Categoria.hasMany(Ingrediente, {
  foreignKey: 'categoria_id',
  as: 'ingredientes',
});

module.exports = Ingrediente;
