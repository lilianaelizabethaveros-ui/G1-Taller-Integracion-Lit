const template = document.createElement("template");
template.innerHTML = `
  <div class="foto-wrapper">
    <slot name="foto">
      <div class="foto-fallback" aria-hidden="true">Producto sin foto</div>
    </slot>
  </div>

  <span class="insignia-destacado" aria-label="Producto destacado">⭐ Destacado</span>

  <div class="cuerpo">
    <slot name="nombre">
      <h3 class="nombre-fallback">Producto sin nombre</h3>
    </slot>

    <div class="descripcion">
      <slot>Sin descripción disponible.</slot>
    </div>

    <div class="precio-wrapper">
      <span class="etiqueta-precio">Precio</span>
      <span class="precio-display" id="precio-display">—</span>
    </div>

    <button class="btn-agregar" type="button" aria-label="Agregar al carrito">
      Agregar al carrito
    </button>
  </div>

  <style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700;800&display=swap');

    :host {
      display: block;
      position: relative;
      border-radius: 18px;
      overflow: hidden;
      background: #ffffff;
      box-shadow:
        0 2px 8px rgba(111, 78, 55, 0.08),
        0 6px 24px rgba(111, 78, 55, 0.12),
        inset 0 0 0 2px rgba(111, 78, 55, 0.15);
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      font-family: 'Outfit', 'Segoe UI', system-ui, sans-serif;
      color: var(--color-texto, #2c1a0e);
    }

    :host([destacado]) {
      box-shadow:
        0 4px 12px rgba(111, 78, 55, 0.15),
        0 12px 36px rgba(111, 78, 55, 0.28),
        0 0 0 3px var(--color-marca, #6f4e37);
    }

    :host([destacado]) .insignia-destacado {
      display: inline-flex;
    }

    :host(:hover) {
      transform: translateY(-6px);
      box-shadow:
        0 8px 20px rgba(111, 78, 55, 0.18),
        0 18px 48px rgba(111, 78, 55, 0.25),
        inset 0 0 0 2px var(--color-marca, #6f4e37);
    }

    .foto-wrapper {
      width: 100%;
      aspect-ratio: 4 / 3;
      overflow: hidden;
      background: linear-gradient(135deg, #f5ede6 0%, #e8d5c4 100%);
      position: relative;
    }

    ::slotted([slot="foto"]) {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transition: transform 0.4s ease;
    }

    :host(:hover) ::slotted([slot="foto"]) {
      transform: scale(1.07);
    }

    .foto-fallback {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 4.5rem;
      opacity: 0.35;
    }

    .insignia-destacado {
      display: none;
      position: absolute;
      top: 0.75rem;
      right: 0.75rem;
      background: var(--color-marca, #6f4e37);
      color: #fff;
      font-size: 0.7rem;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      padding: 0.28rem 0.65rem;
      border-radius: 20px;
      align-items: center;
      gap: 0.25rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.22);
      z-index: 1;
    }

    .cuerpo {
      padding: 1.1rem 1.3rem 1.5rem;
      display: flex;
      flex-direction: column;
      gap: 0.45rem;
    }

    ::slotted([slot="nombre"]) {
      margin: 0;
      color: var(--color-marca, #6f4e37);
      font-size: 1.18rem;
      font-weight: 700;
      letter-spacing: 0.01em;
    }

    .nombre-fallback {
      margin: 0;
      color: var(--color-marca, #6f4e37);
      font-size: 1.1rem;
      font-weight: 700;
    }

    .descripcion {
      color: #6b5044;
      font-size: 0.91rem;
      line-height: 1.6;
    }

    .precio-wrapper {
      display: flex;
      align-items: baseline;
      gap: 0.45rem;
      margin-top: 0.3rem;
      padding-top: 0.7rem;
      border-top: 1px solid rgba(111, 78, 55, 0.12);
    }

    .etiqueta-precio {
      font-size: 0.68rem;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      color: #a08070;
    }

    #precio-display {
      font-size: 1.45rem;
      font-weight: 800;
      color: var(--color-marca, #6f4e37);
      line-height: 1;
      transition: color 0.2s ease;
    }

    .btn-agregar {
      margin-top: 0.5rem;
      padding: 0.65rem 1.2rem;
      background: var(--color-marca, #6f4e37);
      color: #fff;
      border: none;
      border-radius: 10px;
      font-size: 0.88rem;
      font-weight: 600;
      font-family: inherit;
      letter-spacing: 0.03em;
      cursor: pointer;
      transition: background 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease;
      width: 100%;
    }

    .btn-agregar:hover {
      background: #5a3d2b;
      transform: translateY(-1px);
      box-shadow: 0 4px 14px rgba(111, 78, 55, 0.35);
    }

    .btn-agregar:active {
      transform: translateY(0);
      box-shadow: none;
    }
  </style>
`;

export class TarjetaProducto extends HTMLElement {
  static get observedAttributes() {
    return ["precio", "destacado"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    if (this.hasAttribute("precio")) {
      this._actualizarPrecio(this.getAttribute("precio"));
    }
  }

  attributeChangedCallback(nombre, _valorAnterior, valorNuevo) {
    if (nombre === "precio") {
      this._actualizarPrecio(valorNuevo);
    }
  }

  _actualizarPrecio(valor) {
    const display = this.shadowRoot?.getElementById("precio-display");
    if (!display) return;
    const num = parseFloat(valor);
    display.textContent = isNaN(num) || valor === null
      ? "—"
      : `$${num.toFixed(2)}`;
  }

  get precio() {
    return parseFloat(this.getAttribute("precio")) || 0;
  }

  set precio(valor) {
    this.setAttribute("precio", valor);
  }

  get destacado() {
    return this.hasAttribute("destacado");
  }

  set destacado(valor) {
    if (valor) {
      this.setAttribute("destacado", "");
    } else {
      this.removeAttribute("destacado");
    }
  }
}

customElements.define("tarjeta-producto", TarjetaProducto);
