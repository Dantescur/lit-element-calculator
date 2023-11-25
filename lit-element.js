// Importamos las clases y funciones de Lit
import {
  LitElement,
  html,
  css,
} from "https://cdn.jsdelivr.net/gh/lit/dist@3/core/lit-core.min.js";

// Definimos el nombre del elemento personalizado
customElements.define(
  "calc-element",
  class extends LitElement {
    // Definimos los estilos del componente
    static get styles() {
      return css`
        .container {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          grid-template-rows: minmax(120px, auto) repeat(5, 100px);
          gap: 10px;
          padding: 10px;
          background: #333;
          border-radius: 10px;
          max-width: 400px;
          margin: 0 auto;
        }

        .output {
          grid-column: 1 / -1;
          background: white;
          display: flex;
          align-items: flex-end;
          justify-content: space-around;
          flex-direction: column;
          padding: 10px;
          word-wrap: break-word;
          word-break: break-all;
        }

        .previous {
          color: rgba(0, 0, 0, 0.5);
          font-size: 1.5rem;
        }

        .current {
          color: black;
          font-size: 2.5rem;
        }

        button {
          cursor: pointer;
          font-size: 2rem;
          border: 1px solid black;
          outline: none;
          background: rgba(255, 255, 255, 0.75);
        }

        button:hover {
          background: rgba(255, 255, 255, 0.9);
        }

        .span-two {
          grid-column: span 2;
        }

        .operator {
          background: lightblue;
        }

        .operator:hover {
          background: cyan;
        }

        .clear {
          background: pink;
        }

        .clear:hover {
          background: lightcoral;
        }

        .equal {
          background: lightgreen;
        }

        .equal:hover {
          background: lime;
        }
      `;
    }

    // Definimos las propiedades del componente
    static get properties() {
      return {
        currentOperand: { type: String },
        previousOperand: { type: String },
        operation: { type: String },
      };
    }

    // Inicializamos las propiedades en el constructor
    constructor() {
      super();
      this.currentOperand = "";
      this.previousOperand = "";
      this.operation = null;
    }

    // Definimos la función que se encarga de añadir un número al operando actual
    appendNumber(number) {
      if (number === "." && this.currentOperand.includes(".")) return;
      this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    // Definimos la función que se encarga de elegir una operación
    chooseOperation(operation) {
      if (this.currentOperand === "") return;
      if (this.previousOperand !== "") {
        this.compute();
      }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = "";
    }

    // Definimos la función que se encarga de realizar el cálculo
    compute() {
      let result;
      const prev = parseFloat(this.previousOperand);
      const curr = parseFloat(this.currentOperand);
      if (isNaN(prev) || isNaN(curr)) return;
      switch (this.operation) {
        case "+":
          result = prev + curr;
          break;
        case "-":
          result = prev - curr;
          break;
        case "*":
          result = prev * curr;
          break;
        case "÷":
          result = prev / curr;
          break;
        default:
          return;
      }
      this.currentOperand = result;
      this.operation = null;
      this.previousOperand = "";
    }

    // Definimos la función que se encarga de borrar el último dígito del operando actual
    delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    // Definimos la función que se encarga de limpiar los operandos y la operación
    clear() {
      this.currentOperand = "";
      this.previousOperand = "";
      this.operation = null;
    }

    // Definimos la función que se encarga de mostrar el resultado en el componente
    render() {
      return html`
        <div class="container">
          <div class="output">
            <div class="previous">
              ${this.previousOperand} ${this.operation}
            </div>
            <div class="current">${this.currentOperand}</div>
          </div>
          <button @click="${() => this.clear()}" class="span-two clear">
            AC
          </button>
          <button @click="${() => this.delete()}" class="delete">DEL</button>
          <button @click="${() => this.chooseOperation("÷")}" class="operator">
            ÷
          </button>
          <button @click="${() => this.appendNumber(1)}" class="number">
            1
          </button>
          <button @click="${() => this.appendNumber(2)}" class="number">
            2
          </button>
          <button @click="${() => this.appendNumber(3)}" class="number">
            3
          </button>
          <button @click="${() => this.chooseOperation("*")}" class="operator">
            *
          </button>
          <button @click="${() => this.appendNumber(4)}" class="number">
            4
          </button>
          <button @click="${() => this.appendNumber(5)}" class="number">
            5
          </button>
          <button @click="${() => this.appendNumber(6)}" class="number">
            6
          </button>
          <button @click="${() => this.chooseOperation("-")}" class="operator">
            -
          </button>
          <button @click="${() => this.appendNumber(7)}" class="number">
            7
          </button>
          <button @click="${() => this.appendNumber(8)}" class="number">
            8
          </button>
          <button @click="${() => this.appendNumber(9)}" class="number">
            9
          </button>
          <button @click="${() => this.chooseOperation("+")}" class="operator">
            +
          </button>
          <button @click="${() => this.appendNumber(".")}">.</button>
          <button @click="${() => this.appendNumber(0)}" class="number">
            0
          </button>
          <button @click="${() => this.compute()}" class="span-two equal">
            =
          </button>
        </div>
      `;
    }
  },
);
