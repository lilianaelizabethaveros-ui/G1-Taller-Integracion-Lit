import { LitElement, html, css } from 'lit';

class Register extends LitElement {

  static styles = css`
    :host {
      display: block;
      max-width: 32rem;
      margin: 2rem auto;
      font-family: Arial, sans-serif;
    }

    fieldset {
      display: grid;
      gap: 1rem;
      padding: 1.5rem;
      border: 1px solid #cbd5e1;
      border-radius: 0.75rem;
      background: #fff;
      box-shadow: 0 4px 14px rgb(15 23 42 / 8%);
    }

    legend {
      padding: 0 0.5rem;
      color: #1e293b;
      font-size: 1.25rem;
      font-weight: 700;
    }

    .field {
      display: grid;
      gap: 0.4rem;
    }

    label {
      color: #334155;
      font-weight: 600;
    }

    input {
      box-sizing: border-box;
      width: 100%;
      padding: 0.7rem 0.8rem;
      border: 1px solid #cbd5e1;
      border-radius: 0.4rem;
      font: inherit;
    }

    input:focus {
      border-color: #2563eb;
      outline: 3px solid rgb(37 99 235 / 18%);
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: 0.75rem;
    }

    button {
      padding: 0.7rem 1rem;
      border: 0;
      border-radius: 0.4rem;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
    }

    .submit {
      color: #fff;
      background: #2563eb;
    }

    .submit:hover {
      background: #1d4ed8;
    }

    .clear {
      color: #334155;
      background: #e2e8f0;
    }

    .clear:hover {
      background: #cbd5e1;
    }
  `;

  static get properties() {
    return {
        name: { type: String },
        lastName: { type: String },
        age: { type: String },
    };
  }
    constructor() {
        super();
        this.name = '';
        this.lastName = '';
        this.age = '';
    }
    //name = name
    //value  = Luis
    //this.name = Luis
    handler(name){
        return (event) => {
            this[name] = event.target.value;
        };
    }
    register(event){
        event.preventDefault();
        let data ={
            name: this.name,
            lastName: this.lastName,
            age: Number(this.age)
        };
        let options = {
            detail: data,
            bubbles: true,
            composed: true
        };
        this.dispatchEvent(new CustomEvent('personRegister', options));
        this.clearFields();
    }
    clearFields(){
        this.name = '';
        this.lastName = '';
        this.age = '';
    }
    render () {
    return html`
      <form @submit="${this.register}">
      <fieldset>
            <legend>Registro de usuario</legend>
 
        <div class="field">
            <label for="nombre">Nombre:</label>
            <input @input="${this.handler('name')}" 
            .value="${this.name}" 
            type="text" id="nombre" name="nombre" autocomplete="given-name" required />
        </div>
 
        <div class="field">
            <label for="apellido">Apellido:</label>
            <input @input="${this.handler('lastName')}" 
            .value="${this.lastName}" 
            type="text" id="apellido" name="apellido" autocomplete="family-name" required />
        </div>
 
        <div class="field">
            <label for="edad">Edad:</label>
            <input @input="${this.handler('age')}" 
            .value="${this.age}" 
            type="number" id="edad" name="edad" min="0" required />
        </div>
 
        <div class="actions">
          <button class="submit" type="submit">Registrar</button>
          <button class="clear" type="button" @click="${this.clearFields}">Limpiar campos</button>
        </div>
      </fieldset>
    </form>
    `;
  }

  }


window.customElements.define('wc-form-register', Register);