# Taller Colaborativo – Conecta tu aplicación Lit con el componente de otro equipo
## Grupo G1 — Programación Integrativa de Componentes Web

* **Institución:** Universidad de las Fuerzas Armadas ESPE
* **Equipo:** Grupo G1
* **Integrantes:**
  - Liliana Elizabeth Averos (Coordinadora / Líder de Repositorio)
  - Camila Micaela Perrazo (Desarrolladora / Implementación Técnica)
  - Rashell Estefania Pinos (Auditora Técnica / Documentación)
* **Repositorio Oficial:** [https://github.com/lilianaelizabethaveros-ui/G1-Taller-Integracion-Lit](https://github.com/lilianaelizabethaveros-ui/G1-Taller-Integracion-Lit)
* **Rama Principal de Entrega:** `develop`

---

## 1. Objetivo del Proyecto

El objetivo principal de este taller colaborativo consiste en construir y articular una arquitectura modular basada en el estándar oficial de **Web Components**, integrando componentes reactivos desarrollados con la librería **Lit** junto con un componente externo desarrollado en **JavaScript Vanilla** (Custom Elements v1) por otro equipo de trabajo (Equipo Shairr).

Se implementa un componente padre orquestador (`<wc-integracion>`) capaz de:
1. Coordinar la comunicación desacoplada basada en eventos personalizados (`CustomEvent`).
2. Adaptar y normalizar estructuras de datos mediante conversión de tipos.
3. Actualizar el estado de manera inmutable para asegurar la reactividad.
4. Distribuir la información hacia componentes hijos mediante enlace de propiedades (*property binding*).
5. Renderizar e interoperar con componentes externos encapsulados en Shadow DOM nativo haciendo uso de atributos observados y ranuras de contenido (*slots*).

---

## 2. Tecnologías Utilizadas

El proyecto utiliza exclusivamente las tecnologías estándar y dependencias autorizadas para el taller:

* **JavaScript (ES2022+ / ES Modules):** Lógica del cliente, manejo de eventos, desestructuración y programación orientada a objetos.
* **Lit (v3.3.3 / LitElement):** Librería ligera para Web Components reactivos, renderizado declarativo mediante `html` y tagged template literals, estilos encapsulados con `css` y gestión del ciclo de vida.
* **Web Components Standards (W3C):**
  - *Custom Elements v1:* Creación de etiquetas HTML personalizadas (`window.customElements.define`).
  - *Shadow DOM:* Encapsulamiento de estilos y estructura interna (modo `open`).
  - *HTML Templates & Slots:* Distribución declarativa de contenido hacia ranuras con nombre (`slot="nombre"`) y por defecto.
* **HTML5:** Marcado semántico y páginas de entrada.
* **CSS3:** Estilos de presentación y diseño adaptable.
* **Vite (v8.3.4):** Servidor de desarrollo ultrarrápido y empaquetador para producción.

---

## 3. Estructura del Proyecto

La estructura de carpetas y archivos del repositorio se organiza de la siguiente manera:

```text
G1-Taller-Integracion-Lit/
├── index.html                           # Página principal del proyecto (navegación y router base)
├── integracion.html                     # Página de entrada independiente para la vista de integración G1
├── package.json                         # Configuración de dependencias y scripts de ejecución
├── package-lock.json                    # Registro exacto de versiones del árbol de dependencias
├── README.md                            # Guía de instalación, descripción y documentación del proyecto
├── Taller_Equipo_G1.png                 # Evidencia gráfica del funcionamiento conjunto del equipo G1
└── src/
    ├── externos/
    │   └── equipo-shairr/
    │       └── tarjeta-producto.js      # Web Component externo asignado (Vanilla JS / Shairr)
    └── views/
        ├── home/
        │   ├── register.js              # Formulario de registro propio (LitElement, emite personRegister)
        │   └── table.js                 # Tabla de visualización propia (LitElement, recibe studentList)
        └── integracion/
            ├── integracion.js           # Componente padre orquestador <wc-integracion> (LitElement)
            └── integracion.md           # Documentación técnica exhaustiva y auditoría técnica
```

---

## 4. Funcionamiento de la Aplicación

El proyecto dispone de dos puntos de acceso claramente diferenciados para la evaluación del docente:

### A. Página Principal (`http://localhost:5173/`)
* **Archivo:** `index.html`
* **Descripción:** Contiene la interfaz base del proyecto educativo con la barra de navegación (`<wc-navbar>`) y el enrutador de vistas (`<wc-viewport>`), permitiendo acceder a los ejemplos iniciales de clase (`/home`, `page2`, `page3`).

### B. Página de Integración G1 (`http://localhost:5173/integracion.html`)
* **Archivo:** `integracion.html`
* **Descripción:** Es el punto de entrega central del taller. Monta directamente el componente orquestador `<wc-integracion>` donde coexisten:
  1. **Formulario de registro (`<wc-form-register>`):** Permite ingresar Nombre, Apellido y Edad. Al presionar el botón de envío, empaqueta los valores y dispara el evento `personRegister` con `bubbles: true` y `composed: true`.
  2. **Adaptador reactivo de datos:** El componente padre `<wc-integracion>` captura el evento, desestructura `{ name, lastName, age }`, transforma la edad a tipo numérico estricto mediante `Number(age)` y agrega el registro al arreglo reactivo de forma inmutable (`this.lista = [...this.lista, nuevoRegistro]`).
  3. **Tabla reactiva (`<wc-table>`):** Recibe la propiedad `.studentList="${this.lista}"` y renderiza inmediatamente las filas con los estudiantes agregados.
  4. **Componente externo (`<tarjeta-producto>`):** Renderiza la tarjeta de producto asignada con atributos `precio="15.50"`, `destacado`, ranura con nombre `<h3 slot="nombre">Café Especial de la Casa</h3>` y ranura por defecto para la descripción del producto.

---

## 5. Instalación y Ejecución

Para clonar y poner en funcionamiento el proyecto en un entorno local, siga los siguientes pasos:

### Paso 1: Clonar el repositorio
```bash
git clone https://github.com/lilianaelizabethaveros-ui/G1-Taller-Integracion-Lit.git
cd G1-Taller-Integracion-Lit
```

### Paso 2: Instalar las dependencias
```bash
npm install
```

### Paso 3: Iniciar el servidor de desarrollo
```bash
npm run dev
```

### Paso 4: Visualizar en el navegador
Una vez iniciado el servidor local de Vite, mantenga la terminal activa y acceda a las siguientes rutas:
* **Integración del Grupo G1:** [http://localhost:5173/integracion.html](http://localhost:5173/integracion.html)
* **Página principal y router:** [http://localhost:5173/](http://localhost:5173/)

### Paso 5: Compilación para producción (Opcional)
Para validar que el empaquetado de producción compile sin errores:
```bash
npm run build
```

---

## 6. Pruebas Realizadas y Verificadas

Se llevaron a cabo las siguientes pruebas funcionales y técnicas sobre el entorno integrado:

1. **Prueba de comunicación por eventos (Emisor $\rightarrow$ Orquestador):**  
   Se comprobó que el formulario emite correctamente el evento desacoplado `personRegister` transportando los datos en `event.detail`.
2. **Prueba del adaptador de datos y conversión de tipos:**  
   Se verificó que el campo `age` (recibido inicialmente como `string` desde el input HTML) es transformado efectivamente a tipo primitivo `number` mediante `Number(age)` antes de almacenarse en el estado.
3. **Prueba de actualización inmutable de estado:**  
   Se confirmó que `this.lista` se actualiza generando una nueva referencia en memoria (`[...this.lista, nuevoRegistro]`), garantizando que el ciclo reactivo de Lit detecte el cambio y solicite el re-renderizado (`requestUpdate`).
4. **Prueba de enlace de propiedades (Orquestador $\rightarrow$ Receptor):**  
   Se constató que `<wc-table>` recibe `.studentList` y dibuja las filas de manera reactiva en el cuerpo de la tabla (`<tbody>`).
5. **Prueba de interoperabilidad con componente externo Vanilla:**  
   Se comprobó que `<tarjeta-producto>` interpreta correctamente los atributos `precio="15.50"` (formateando a `$15.50`), activa la insignia con el atributo booleano `destacado`, proyecta el título en `slot="nombre"` y muestra el texto descriptivo en el slot por defecto.
6. **Prueba de compilación limpia:**  
   Se ejecutó `npm run build` confirmando salida exitosa (código 0) sin conflictos ni dependencias rotas.

---

## 7. Evidencias del Proyecto

El repositorio incluye dos recursos clave para la verificación del trabajo realizado:

* **Captura de pantalla de evidencia:** [Taller_Equipo_G1.png](./Taller_Equipo_G1.png) ubicada en la raíz del repositorio, demostrando la ejecución integrada en navegador con registros en la tabla y la tarjeta externa renderizada.
* **Documentación técnica detallada y auditoría:** [src/views/integracion/integracion.md](./src/views/integracion/integracion.md), que contiene el diagrama de flujo y arquitectura Mermaid, el análisis del ciclo de vida y la auditoría técnica exhaustiva del componente externo.

---

## 8. Integrantes y Contribuciones

El desarrollo del proyecto se ejecutó siguiendo el flujo de trabajo colaborativo **GitFlow**:

| Integrante | Rol / Responsabilidad | Aporte Técnico en el Repositorio | Pull Request |
| :--- | :--- | :--- | :---: |
| **Liliana Elizabeth Averos** | Líder de equipo y Coordinadora | Creación del repositorio oficial, configuración de ramas, arquitectura base del componente padre `<wc-integracion>`, vinculación inicial de formulario y tabla, creación de la vista independiente `integracion.html` y gestión de PRs. | [PR #1](https://github.com/lilianaelizabethaveros-ui/G1-Taller-Integracion-Lit/pull/1) |
| **Camila Micaela Perrazo** | Desarrolladora Técnica | Implementación del método adaptador `agregar(event)`, conversión numérica `Number(age)`, actualización inmutable del arreglo de datos, integración visual de `<tarjeta-producto precio="15.50" destacado>` con sus slots, y generación de la captura de evidencia `Taller_Equipo_G1.png`. | [PR #3](https://github.com/lilianaelizabethaveros-ui/G1-Taller-Integracion-Lit/pull/3) |
| **Rashell Estefania Pinos** | Auditora Técnica y Documentalista | Elaboración de la memoria técnica en `integracion.md`, construcción del diagrama de arquitectura Mermaid, análisis de interoperabilidad Lit vs Vanilla Web Components y auditoría técnica detallada sobre la tarjeta externa. | [PR #2](https://github.com/lilianaelizabethaveros-ui/G1-Taller-Integracion-Lit/pull/2) |
