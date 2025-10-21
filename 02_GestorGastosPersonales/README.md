# 💸 Gestor de Gastos Personales

Aplicativo en **Node.js** que permite registrar y visualizar tus gastos diarios con estadísticas simples, utilizando **librerías propias** para fomentar la reutilización de código.

## 🧠 Prompt utilizado

> Necesito un ejemplo detallado en Node.js que cree un gestor de gastos personales, usando librerías propias y librerías externas como inquirer, chalk, fs-extra y cli-table3. Los gastos deben tener categoría, monto y descripción, además de proporcionar estadísticas

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
git clone ----
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
