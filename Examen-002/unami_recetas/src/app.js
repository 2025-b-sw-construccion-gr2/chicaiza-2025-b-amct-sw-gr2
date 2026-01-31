require('dotenv').config();
const express = require('express');
const path = require('path');
const { testConnection } = require('./config/database');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar motor de plantillas EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware para parsear datos de formularios
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.use('/', routes);

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).render('inicio', {
        title: 'Página no encontrada | Umami'
    });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).send('Error interno del servidor');
});

// Iniciar servidor
async function iniciarServidor() {
    // Probar conexión a la base de datos
    await testConnection();

    app.listen(PORT, () => {
        console.log(`
╔════════════════════════════════════════════════════╗
║                                                    ║
║     🍜  UMAMI - Sistema de Recetas                 ║
║     ──────────────────────────────                 ║
║                                                    ║
║     Servidor corriendo en:                         ║
║     http://localhost:${PORT}                          ║
║                                                    ║
║     Presiona Ctrl+C para detener                   ║
║                                                    ║
╚════════════════════════════════════════════════════╝
        `);
    });
}

iniciarServidor();
