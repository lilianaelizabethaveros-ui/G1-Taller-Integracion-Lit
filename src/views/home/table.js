import { LitElement, html, css } from 'lit';

class Table extends LitElement {
    static get properties() {
        return {
            studentList: { type: Array },
        }
    }
    constructor(){
        super();
        this.studentList = [];
    }
    render(){
        return html`
        <h1>Listado de Estudiante</h1>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Edad</th>
                </tr>
            </thead>
            <tbody>
                ${this.studentList.map((student) => {
                return html `
                    <tr>
                        <td>${student.name}</td>
                        <td>${student.lastName}</td>
                        <td>${student.age}</td>
                    </tr>
                `})}
            </tbody>
        </table>
        `;
    }
}


window.customElements.define("wc-table", Table);
