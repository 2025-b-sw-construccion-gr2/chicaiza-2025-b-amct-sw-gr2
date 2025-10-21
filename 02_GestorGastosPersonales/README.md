# 💸 Gestor de Gastos Personales

Aplicativo en **Node.js** que permite registrar y visualizar tus gastos diarios con estadísticas simples, utilizando **librerías propias** para fomentar la reutilización de código.

## 🧠 Prompt utilizado

Necesito un ejemplo completo en Node.js de un Gestor de Gastos Personales que use librerías propias reutilizables y librerías externas (inquirer, chalk, fs-extra, cli-table3). El programa debe permitir agregar, listar y filtrar gastos con descripción, monto y categoría (Alimentos, Transporte, Ropa, Hogar, Otros), mostrar estadísticas (total, promedio y por categoría), guardar los datos en JSON y mostrar tablas con formato y colores.

---

## 📂 Estructura del proyecto

```bash
gestor-gastos/
├── index.js
├── package.json
├── README.md
├── data/
│   └── gastos.json   
└── lib/
    ├── logger.js
    ├── input.js
    ├── gastos.js
    ├── estadisticas.js
    └── fileManager.js
```

## ⚙️ Instalación

```bash
git clone https://github.com/2025-b-sw-construccion-gr2/chicaiza-2025-b-amct-sw-gr2.git

cd 02_GestorGastosPersonales

npm install inquirer chalk fs-extra cli-table3
```

## ▶️ Uso

```bash
node index.js
```

Sigue las instrucciones en pantalla para:
- Agregar un gasto  
- Ver todos los gastos  
- Filtrar por categoría  
- Ver estadísticas  
- Salir del programa  

## 🧩 Librerías usadas

### Externas
- inquirer → Para interacción con el usuario en la consola: menús, preguntas, selección de opciones y validación de entradas.

- chalk → Para colorear y dar formato a los textos de la consola, haciendo los mensajes más claros y visuales.

- fs-extra → Para leer y escribir archivos JSON de manera fácil y segura, incluyendo creación automática de carpetas.

- cli-table3 → Para mostrar datos en tablas en la consola, con columnas alineadas y encabezados.

### Propias
- logger.js → Maneja los mensajes y logs de la aplicación, con colores y símbolos para info, éxito, advertencia y error.

- input.js → Contiene funciones para pedir datos al usuario y mostrar menús, usando inquirer; también permite manejar categorías dinámicas.

- gastos.js → Funciones para agregar, listar y filtrar gastos, mostrando los datos en formato de tabla y usando las librerías propias.

- estadisticas.js → Funciones para calcular estadísticas simples: total gastado, promedio por gasto y desglose por categoría.

- fileManager.js → Se encarga de guardar y cargar los gastos en un archivo JSON, asegurando que la carpeta y el archivo existan, usando fs-extra.