import { LitElement, html, css } from 'lit';
import "../home/register.js";
import "../home/table.js";
import "../../externos/equipo-shairr/tarjeta-producto.js";

// Componente padre de integracion
class Integracion extends LitElement {
  // Declaracion de propiedades reactivas
  static get properties() {
    return {
      lista: { type: Array }
    };
  }

  // Constructor con lista inicializada
  constructor() {
    super();
    this.lista = [];
  }

  // Metodo base para recibir el evento del formulario
  agregar(event) {
    this.lista = [...this.lista, event.detail];
  }

  // Estilos simples para la vista
  static styles = css`
    :host {
      display: block;
      font-family: Arial, sans-serif;
      padding: 20px;
    }
    .bloque {
      margin-bottom: 30px;
    }
  `;

  // Renderizado de los componentes
  render() {
    return html`
      <h1>Taller Colaborativo - Integracion Lit Grupo 1</h1>

      <div class="bloque">
        <!-- Formulario propio emisor de eventos -->
        <wc-form-register @personRegister="${this.agregar}"></wc-form-register>
      </div>

      <div class="bloque">
        <!-- Tabla propia receptora de datos -->
        <wc-table .studentList="${this.lista}"></wc-table>
      </div>
    `;
  }
}

// Registro del elemento personalizado
window.customElements.define("wc-integracion", Integracion);
