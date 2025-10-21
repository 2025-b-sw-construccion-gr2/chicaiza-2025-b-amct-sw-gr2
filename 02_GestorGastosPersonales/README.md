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
- inquirer  
- chalk  
- fs-extra  
- cli-table3  

### Propias
- logger.js  
- input.js  
- gastos.js  
- estadisticas.js  
- fileManager.js  
