import { LitElement, html } from 'lit';
import "../../externos/equipo-shairr/tarjeta-producto.js";
import "../home/table.js";

class Integracion extends LitElement {
  static get properties() {
    return {
      lista: { type: Array },
    };
  }

  constructor() {
    super();
    this.lista = [];
  }

  // Metodo adaptador: procesara los datos y actualizara el estado inmutable
  agregar(event) {
    // Pendiente de confirmacion de la firma exacta del evento
  }

  render() {
    return html`
      <!-- Estructura base para el taller colaborativo -->
      <h1>Taller Colaborativo - Integracion Lit</h1>
      <wc-table .studentList="${this.lista}"></wc-table>
    `;
  }
}

window.customElements.define("wc-integracion", Integracion);
