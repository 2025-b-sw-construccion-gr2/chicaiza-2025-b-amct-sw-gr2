require('dotenv').config();
const { Sequelize } = require('sequelize');

// Configuración de la conexión a MySQL
const sequelize = new Sequelize(
    process.env.DB_NAME || 'sistema_recetas',
    process.env.DB_USER || 'root',
    process.env.DB_PASSWORD || '',
    {
        host: process.env.DB_HOST || 'localhost',
        port: process.env.DB_PORT || 3306,
        dialect: 'mysql',
        logging: false, // Cambiar a console.log para ver queries SQL
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        define: {
            timestamps: false, // No usar createdAt/updatedAt por defecto
            freezeTableName: true // Usar nombre de tabla exacto, sin pluralizar
        }
    }
);

// Función para probar la conexión
const testConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('✅ Conexión a MySQL establecida correctamente.');
    } catch (error) {
        console.error('❌ Error al conectar con MySQL:', error.message);
    }
};

module.exports = { sequelize, testConnection };
