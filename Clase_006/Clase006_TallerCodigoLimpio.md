# Clase 006 - Taller: Aplicando Principios de Código Limpio en Proyectos Reales

**Repositorio analizado:** [trekhleb/javascript-algorithms](https://github.com/trekhleb/javascript-algorithms)  
**Lenguaje:** JavaScript  
**Estudiante:** Evelin Rocha, Andrea Chicaiza  
**Fecha:** 2 de noviembre de 2025

---

## 1️⃣ Introducción

Este taller tiene como objetivo aplicar los principios de **Código Limpio** en código real proveniente de un repositorio público.  
Se busca identificar olores de código, proponer refactorizaciones y justificar cómo dichas mejoras aumentan la mantenibilidad, legibilidad y claridad del software.

---

## 2️⃣ Archivos seleccionados

| Archivo | Ruta en el repositorio | Descripción |
|---|---|---|
| `BubbleSort.js` | `/src/algorithms/sorting/bubble-sort/BubbleSort.js` | Implementa el algoritmo Bubble Sort. |
| `DoublyLinkedList.js` | `/src/data-structures/linked-list/doubly-linked-list/DoublyLinkedList.js` | Implementa una lista doblemente enlazada. |

---

## 3️⃣ Análisis del archivo 1: `BubbleSort.js`

### Código original (simplificado)
```js
  export default function bubbleSort(originalArray) {
    const array = [...originalArray];
    let swapped;
    do {
      swapped = false;
      for (let i = 1; i < array.length; i++) {
        if (array[i - 1] > array[i]) {
          const temp = array[i - 1];
          array[i - 1] = array[i];
          array[i] = temp;
          swapped = true;
        }
      }
    } while (swapped);
    return array;
  }
```

### 🔹 Observaciones según principios de Código Limpio

| Principio | Observación |
|---|---|
| Nombres significativos | Los nombres `array`, `temp` y `swapped` podrían ser más descriptivos. |
| Funciones pequeñas | Toda la lógica está en una sola función; sería mejor dividirla (`swap`, `isGreater`, etc.). |
| Responsabilidad única | La función mezcla comparación e intercambio; separar responsabilidades mejora el mantenimiento. |
| Comentarios | No hay comentarios ni documentación. |
| Validaciones | No se valida que la entrada sea un arreglo. |

### 🔹 Olores de código detectados

- Código repetitivo en el intercambio.  
- Falta de separación de responsabilidades.  
- Ausencia de validación de entrada.  
- Nombres poco descriptivos.  
- Ausencia de documentación.  

### 🔹 Propuestas de mejora

| Nº | Mejora | Descripción | Justificación |
|---:|---|---|---|
| 1 | Validar entrada | Verificar que `originalArray` sea un arreglo. | Evita errores en ejecución. |
| 2 | Crear `swap()` | Extraer el intercambio a una función. | Aumenta legibilidad. |
| 3 | Crear `isGreater()` | Encapsular la comparación. | Mejora testabilidad. |
| 4 | Renombrar variables | Usar `sortedArray`, `wasSwapped`. | Mejora claridad. |
| 5 | Documentar | Agregar comentarios breves. | Facilita el mantenimiento. |

### 🔹 Versión refactorizada propuesta

```js
  function swap(arr, i, j) {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  function isGreater(a, b) {
    return a > b;
  }

  export default function bubbleSort(originalArray) {
    if (!Array.isArray(originalArray)) {
      throw new TypeError('Expected an array as input');
    }

    const sortedArray = [...originalArray];
    let wasSwapped;

    do {
      wasSwapped = false;
      for (let i = 1; i < sortedArray.length; i++) {
        if (isGreater(sortedArray[i - 1], sortedArray[i])) {
          swap(sortedArray, i - 1, i);
          wasSwapped = true;
        }
      }
    } while (wasSwapped);

    return sortedArray;
  }
  ```

### 🔹 Conclusión (BubbleSort)

El archivo `BubbleSort.js` es funcional, pero puede beneficiarse de una mejor legibilidad y estructura modular.  
Las mejoras propuestas promueven un código más claro, con responsabilidad única, nombres descriptivos y validaciones seguras.

---

## 4️⃣ Análisis del archivo 2: `DoublyLinkedList.js`

### Código original (simplificado)
```js
  export default class DoublyLinkedList {
    constructor() {
      this.head = null;
      this.tail = null;
    }

    append(value) {
      const newNode = { value, next: null, prev: this.tail };
      if (this.tail) {
        this.tail.next = newNode;
      } else {
        this.head = newNode;
      }
      this.tail = newNode;
      return this;
    }

    prepend(value) {
      const newNode = { value, next: this.head, prev: null };
      if (this.head) {
        this.head.prev = newNode;
      } else {
        this.tail = newNode;
      }
      this.head = newNode;
      return this;
    }

    delete(value) {
      if (!this.head) return null;
      let current = this.head;
      while (current) {
        if (current.value === value) {
          if (current.prev) current.prev.next = current.next;
          if (current.next) current.next.prev = current.prev;
          if (current === this.head) this.head = current.next;
          if (current === this.tail) this.tail = current.prev;
          return current;
        }
        current = current.next;
      }
      return null;
    }
  }
  ```

  ### 🔹 Observaciones según principios de Código Limpio

  | Principio | Observación |
  |---|---|
  | Nombres descriptivos | Correctos en su mayoría (`append`, `prepend`, `delete`). |
  | Responsabilidad única | Cada método cumple un propósito claro, pero puede documentarse mejor. |
  | Evitar repetición | La creación de nodos podría centralizarse en un método auxiliar. |
  | Validaciones | No se validan los valores antes de insertarlos o eliminarlos. |
  | Comentarios | No hay comentarios explicativos sobre el flujo de los enlaces. |

  ### 🔹 Olores de código detectados

  - Código duplicado en la creación de nodos (append y prepend).  
  - Falta de validación de entrada (null, undefined).  
  - Ausencia de documentación sobre cómo se gestionan los enlaces.  
  - No se maneja el caso de eliminar valores inexistentes con mensajes o excepciones.  

  ### 🔹 Propuestas de mejora

  | Nº | Mejora | Descripción | Justificación |
  |---:|---|---|---|
  | 1 | Centralizar creación de nodos | Crear método `createNode(value, prev, next)`. | Evita duplicación. |
  | 2 | Validar valores | Asegurar que `value` no sea `null` o `undefined`. | Previene errores. |
  | 3 | Agregar comentarios | Explicar cómo se enlazan y desenlazan los nodos. | Mejora comprensión. |
  | 4 | Métodos auxiliares | Agregar `isEmpty()`, `size()` o `toArray()`. | Aumenta reutilización y facilita pruebas. |

  ### 🔹 Versión refactorizada propuesta

  ```js
  class DoublyLinkedListNode {
    constructor(value, prev = null, next = null) {
      this.value = value;
      this.prev = prev;
      this.next = next;
    }
  }

  export default class DoublyLinkedList {
    constructor() {
      this.head = null;
      this.tail = null;
      this._size = 0;
    }

    createNode(value, prev = null, next = null) {
      if (value === null || value === undefined) {
        throw new Error('Node value cannot be null or undefined');
      }
      return new DoublyLinkedListNode(value, prev, next);
    }

    append(value) {
      const newNode = this.createNode(value, this.tail);
      if (this.tail) this.tail.next = newNode;
      else this.head = newNode;
      this.tail = newNode;
      this._size++;
      return this;
    }

    prepend(value) {
      const newNode = this.createNode(value, null, this.head);
      if (this.head) this.head.prev = newNode;
      else this.tail = newNode;
      this.head = newNode;
      this._size++;
      return this;
    }

    delete(value) {
      if (!this.head) return null;
      let current = this.head;
      while (current) {
        if (current.value === value) {
          if (current.prev) current.prev.next = current.next;
          if (current.next) current.next.prev = current.prev;
          if (current === this.head) this.head = current.next;
          if (current === this.tail) this.tail = current.prev;
          this._size--;
          return current;
        }
        current = current.next;
      }
      return null;
    }

    isEmpty() {
      return this._size === 0;
    }

    toArray() {
      const elements = [];
      let current = this.head;
      while (current) {
        elements.push(current.value);
        current = current.next;
      }
      return elements;
    }

    size() {
      return this._size;
    }
  }
  ```

  ### 🔹 Conclusión (DoublyLinkedList)

  El archivo `DoublyLinkedList.js` presenta una buena estructura, pero puede mejorarse mediante la centralización de la creación de nodos, validación de valores y agregación de métodos utilitarios.  
  Estas mejoras refuerzan los principios de Código Limpio, favoreciendo la reutilización, modularidad y claridad del código.

  ---

  ## ✅ Conclusión general del taller

  Tras analizar ambos archivos, se evidencia que incluso proyectos bien estructurados pueden beneficiarse de aplicar los principios de Código Limpio. En particular:

  - La modularización y nombres descriptivos facilitan la comprensión.  
  - La validación de datos y comentarios breves previenen errores.  
  - La claridad del flujo lógico reduce la deuda técnica y mejora la mantenibilidad.

  Un código limpio no solo funciona bien: se entiende, se extiende y se mantiene con facilidad.
