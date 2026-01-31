# 🍜 Umami - Sistema de Recetas (Node.js + Express)

**El Quinto Sabor** - Un sistema elegante para descubrir recetas basadas en los ingredientes que tienes en casa.

## 📋 Descripción

Este proyecto es una migración del sistema de recetas original (Java + Hibernate + JSP) a Node.js con Express. Utiliza la API de Spoonacular para buscar recetas y la API de MyMemory para traducir los resultados al español.

## 🚀 Tecnologías Utilizadas

- **Node.js** - Entorno de ejecución JavaScript
- **Express** - Framework web minimalista
- **Sequelize** - ORM para Node.js
- **MySQL** - Base de datos relacional
- **EJS** - Motor de plantillas
- **Axios** - Cliente HTTP para APIs
- **dotenv** - Gestión de variables de entorno

## 📁 Estructura del Proyecto

```
nodejs/
├── src/
│   ├── app.js                 # Punto de entrada de la aplicación
│   ├── config/
│   │   └── database.js        # Configuración de Sequelize/MySQL
│   ├── models/
│   │   ├── index.js           # Exporta todos los modelos
│   │   ├── Categoria.js       # Modelo de Categoría
│   │   └── Ingrediente.js     # Modelo de Ingrediente
│   ├── routes/
│   │   └── index.js           # Definición de rutas
│   ├── services/
│   │   ├── ingredienteService.js   # Lógica de negocio para ingredientes
│   │   ├── spoonacularClient.js    # Cliente para API Spoonacular
│   │   └── traductorService.js     # Servicio de traducción
│   └── views/
│       ├── inicio.ejs              # Página de inicio
│       ├── ingredientes.ejs        # Selección de ingredientes
│       ├── recetas.ejs             # Resultados de búsqueda
│       └── receta-detalle.ejs      # Detalle de receta
├── .env                       # Variables de entorno (no en Git)
├── .gitignore                 # Archivos ignorados
├── package.json               # Dependencias y scripts
└── README.md                  # Este archivo
```

## ⚙️ Requisitos Previos

1. **Node.js** (v18 o superior)
2. **MySQL** (v8.0 o superior)
3. **Base de datos configurada** - Ejecutar el script SQL:
   ```bash
   mysql -u root -p < ../sql/init.sql
   ```

## 🔧 Instalación

1. **Navegar a la carpeta del proyecto:**
   ```bash
   cd unami_recetas
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar variables de entorno:**
   
   Edita el archivo `.env` con tus credenciales. Por motivos académicos, se incluyen valores por defecto.

4. **Iniciar la aplicación:**
   ```bash
   # Modo desarrollo (con hot reload)
   npm run dev
   
   # Modo producción
   npm start
   ```

5. **Abrir en el navegador:**
   ```
   http://localhost:3000
   ```

## 📖 Rutas Disponibles

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/` | Página de inicio |
| GET | `/ingredientes` | Selección de ingredientes |
| POST | `/recetas` | Buscar recetas con ingredientes |
| GET | `/receta?id=123` | Ver detalle de una receta |

## 🔑 API Keys

### Spoonacular
- Registro en [Spoonacular](https://spoonacular.com/food-api)
- API Key gratuita
- Límite: 150 requests/día en plan gratuito

### MyMemory (Traducciones)
- No requiere API Key
- Límite: 5000 caracteres/día sin registro

## 🎨 Características

- ✅ Diseño elegante y minimalista
- ✅ Ingredientes organizados por categorías
- ✅ Búsqueda de recetas en tiempo real
- ✅ Traducción automática al español
- ✅ Indicador de coincidencia de ingredientes
- ✅ Detalle completo de recetas
- ✅ Etiquetas de dieta (vegetariano, vegano, sin gluten)
- ✅ Responsive design

