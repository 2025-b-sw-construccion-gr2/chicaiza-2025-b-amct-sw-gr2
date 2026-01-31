-- ========================================
-- Script SQL para Sistema de Recetas
-- Base de datos: MySQL
-- ========================================

-- Crear la base de datos si no existe
CREATE DATABASE IF NOT EXISTS sistema_recetas
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

-- Usar la base de datos
USE sistema_recetas;

-- Eliminar tablas si existen (para reiniciar)
DROP TABLE IF EXISTS ingrediente;
DROP TABLE IF EXISTS categoria;

-- Crear la tabla categoria
CREATE TABLE categoria (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    icono VARCHAR(10)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Crear la tabla ingrediente con relación a categoria
CREATE TABLE ingrediente (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL,
    nombre_ingles VARCHAR(50) NOT NULL,
    imagen_url VARCHAR(255),
    categoria_id INT,
    FOREIGN KEY (categoria_id) REFERENCES categoria(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Insertar categorías
INSERT INTO categoria (nombre, icono) VALUES
    ('Carnes', '🥩'),
    ('Aves', '🍗'),
    ('Mariscos', '🦐'),
    ('Lácteos', '🧀'),
    ('Verduras', '🥬'),
    ('Frutas', '🍎'),
    ('Granos y Cereales', '🌾'),
    ('Condimentos', '🧂'),
    ('Otros', '📦');

-- Insertar ingredientes con nombre en español, inglés e imágenes
-- Carnes (categoria_id = 1)
INSERT INTO ingrediente (nombre, nombre_ingles, imagen_url, categoria_id) VALUES
    ('Carne de res', 'beef', 'https://spoonacular.com/cdn/ingredients_100x100/beef-cubes-raw.png', 1),
    ('Cerdo', 'pork', 'https://spoonacular.com/cdn/ingredients_100x100/pork-tenderloin-raw.png', 1),
    ('Tocino', 'bacon', 'https://spoonacular.com/cdn/ingredients_100x100/raw-bacon.png', 1),
    ('Jamón', 'ham', 'https://spoonacular.com/cdn/ingredients_100x100/ham-whole.jpg', 1),
    ('Chorizo', 'chorizo', 'https://spoonacular.com/cdn/ingredients_100x100/chorizo.jpg', 1);

-- Aves (categoria_id = 2)
INSERT INTO ingrediente (nombre, nombre_ingles, imagen_url, categoria_id) VALUES
    ('Pollo', 'chicken', 'https://spoonacular.com/cdn/ingredients_100x100/whole-chicken.jpg', 2),
    ('Pechuga de pollo', 'chicken breast', 'https://spoonacular.com/cdn/ingredients_100x100/chicken-breast.png', 2),
    ('Pavo', 'turkey', 'https://spoonacular.com/cdn/ingredients_100x100/turkey-raw-whole.jpg', 2);

-- Mariscos (categoria_id = 3)
INSERT INTO ingrediente (nombre, nombre_ingles, imagen_url, categoria_id) VALUES
    ('Pescado', 'fish', 'https://spoonacular.com/cdn/ingredients_100x100/fish-fillet.jpg', 3),
    ('Camarón', 'shrimp', 'https://spoonacular.com/cdn/ingredients_100x100/shrimp.png', 3),
    ('Atún', 'tuna', 'https://spoonacular.com/cdn/ingredients_100x100/canned-tuna.png', 3),
    ('Salmón', 'salmon', 'https://spoonacular.com/cdn/ingredients_100x100/salmon.png', 3);

-- Lácteos (categoria_id = 4)
INSERT INTO ingrediente (nombre, nombre_ingles, imagen_url, categoria_id) VALUES
    ('Leche', 'milk', 'https://spoonacular.com/cdn/ingredients_100x100/milk.png', 4),
    ('Queso', 'cheese', 'https://spoonacular.com/cdn/ingredients_100x100/cheddar-cheese.png', 4),
    ('Crema', 'cream', 'https://spoonacular.com/cdn/ingredients_100x100/fluid-cream.jpg', 4),
    ('Mantequilla', 'butter', 'https://spoonacular.com/cdn/ingredients_100x100/butter-sliced.jpg', 4),
    ('Huevo', 'egg', 'https://spoonacular.com/cdn/ingredients_100x100/egg.png', 4),
    ('Yogurt', 'yogurt', 'https://spoonacular.com/cdn/ingredients_100x100/plain-yogurt.jpg', 4);

-- Verduras (categoria_id = 5)
INSERT INTO ingrediente (nombre, nombre_ingles, imagen_url, categoria_id) VALUES
    ('Tomate', 'tomato', 'https://spoonacular.com/cdn/ingredients_100x100/tomato.png', 5),
    ('Cebolla', 'onion', 'https://spoonacular.com/cdn/ingredients_100x100/brown-onion.png', 5),
    ('Ajo', 'garlic', 'https://spoonacular.com/cdn/ingredients_100x100/garlic.png', 5),
    ('Pimiento', 'bell pepper', 'https://spoonacular.com/cdn/ingredients_100x100/bell-pepper-orange.png', 5),
    ('Zanahoria', 'carrot', 'https://spoonacular.com/cdn/ingredients_100x100/sliced-carrot.png', 5),
    ('Papa', 'potato', 'https://spoonacular.com/cdn/ingredients_100x100/potatoes-yukon-gold.png', 5),
    ('Lechuga', 'lettuce', 'https://spoonacular.com/cdn/ingredients_100x100/iceberg-lettuce.jpg', 5),
    ('Espinaca', 'spinach', 'https://spoonacular.com/cdn/ingredients_100x100/spinach.jpg', 5),
    ('Brócoli', 'broccoli', 'https://spoonacular.com/cdn/ingredients_100x100/broccoli.jpg', 5),
    ('Champiñones', 'mushrooms', 'https://spoonacular.com/cdn/ingredients_100x100/mushrooms.png', 5),
    ('Aguacate', 'avocado', 'https://spoonacular.com/cdn/ingredients_100x100/avocado.jpg', 5),
    ('Maíz', 'corn', 'https://spoonacular.com/cdn/ingredients_100x100/corn.png', 5);

-- Frutas (categoria_id = 6)
INSERT INTO ingrediente (nombre, nombre_ingles, imagen_url, categoria_id) VALUES
    ('Limón', 'lemon', 'https://spoonacular.com/cdn/ingredients_100x100/lemon.png', 6),
    ('Naranja', 'orange', 'https://spoonacular.com/cdn/ingredients_100x100/orange.png', 6),
    ('Manzana', 'apple', 'https://spoonacular.com/cdn/ingredients_100x100/apple.jpg', 6),
    ('Plátano', 'banana', 'https://spoonacular.com/cdn/ingredients_100x100/bananas.jpg', 6),
    ('Fresa', 'strawberry', 'https://spoonacular.com/cdn/ingredients_100x100/strawberries.png', 6);

-- Granos y Cereales (categoria_id = 7)
INSERT INTO ingrediente (nombre, nombre_ingles, imagen_url, categoria_id) VALUES
    ('Arroz', 'rice', 'https://spoonacular.com/cdn/ingredients_100x100/uncooked-white-rice.png', 7),
    ('Pasta', 'pasta', 'https://spoonacular.com/cdn/ingredients_100x100/spaghetti.jpg', 7),
    ('Frijoles', 'beans', 'https://spoonacular.com/cdn/ingredients_100x100/black-beans.jpg', 7),
    ('Lentejas', 'lentils', 'https://spoonacular.com/cdn/ingredients_100x100/lentils-brown.jpg', 7),
    ('Pan', 'bread', 'https://spoonacular.com/cdn/ingredients_100x100/white-bread.jpg', 7),
    ('Harina', 'flour', 'https://spoonacular.com/cdn/ingredients_100x100/flour.png', 7);

-- Condimentos (categoria_id = 8)
INSERT INTO ingrediente (nombre, nombre_ingles, imagen_url, categoria_id) VALUES
    ('Sal', 'salt', 'https://spoonacular.com/cdn/ingredients_100x100/salt.jpg', 8),
    ('Pimienta', 'pepper', 'https://spoonacular.com/cdn/ingredients_100x100/pepper.jpg', 8),
    ('Aceite de oliva', 'olive oil', 'https://spoonacular.com/cdn/ingredients_100x100/olive-oil.jpg', 8),
    ('Vinagre', 'vinegar', 'https://spoonacular.com/cdn/ingredients_100x100/vinegar-(white).jpg', 8),
    ('Salsa de soya', 'soy sauce', 'https://spoonacular.com/cdn/ingredients_100x100/soy-sauce.jpg', 8),
    ('Mostaza', 'mustard', 'https://spoonacular.com/cdn/ingredients_100x100/dijon-mustard.jpg', 8);

-- Verificar los datos insertados
SELECT c.nombre as categoria, c.icono, COUNT(i.id) as total_ingredientes
FROM categoria c
LEFT JOIN ingrediente i ON c.id = i.categoria_id
GROUP BY c.id, c.nombre, c.icono
ORDER BY c.nombre;

-- Ver todos los ingredientes con su traducción
SELECT i.nombre, i.nombre_ingles, c.nombre as categoria
FROM ingrediente i
JOIN categoria c ON i.categoria_id = c.id
ORDER BY c.nombre, i.nombre;
