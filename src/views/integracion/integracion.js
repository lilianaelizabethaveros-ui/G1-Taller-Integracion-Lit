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

  // Metodo adaptador: procesa los datos y actualiza el estado inmutable
  agregar(event) {
    const { name, lastName, age } = event.detail;
    const nuevoRegistro = {
      name,
      lastName,
      age: Number(age)
    };
    this.lista = [...this.lista, nuevoRegistro];
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
    .seccion-externa {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 2px dashed #cbd5e1;
    }
    .contenedor-tarjeta {
      max-width: 320px;
      margin-top: 15px;
    }
    h1, h2 {
      color: #1e293b;
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

      <div class="bloque seccion-externa">
        <!-- Componente externo integrado con slots y atributos reales -->
        <h2>Componente externo - Tarjeta de producto</h2>
        <div class="contenedor-tarjeta">
          <tarjeta-producto precio="15.50" destacado>
            <h3 slot="nombre">Café Especial de la Casa</h3>
            <p>Bebida artesanal preparada con granos seleccionados de altura y notas tostadas.</p>
          </tarjeta-producto>
        </div>
      </div>
    `;
  }
}

// Registro del elemento personalizado
window.customElements.define("wc-integracion", Integracion);
