import { LitElement, html, css } from 'lit';
import "./table";
import "./register";

class Home extends LitElement {
    static get properties() {
        return {
            studentList: { type: Array },
        };
    }

    constructor(){
        super();
        this.studentList = [
            {name: "Diego", lastName: "Pinto", age: 21},
            {name: "María", lastName: "Gómez", age: 20},
            {name: "Juan", lastName: "López", age: 22}
        ];
    }
    addList(event){
        this.studentList = [...this.studentList, event.detail];
    }
    render(){
        return html`
            
            <wc-form-register @personRegister="${this.addList}"></wc-form-register>
            <wc-table .studentList="${this.studentList}"></wc-table>
            

        `;
    }
}


window.customElements.define("wc-home", Home);
