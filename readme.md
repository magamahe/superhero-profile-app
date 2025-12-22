
<p align="center">
  <img src="https://i.postimg.cc/85y4X6tC/readme-titulo.png" alt="Hero Header" width="100%" style="border-radius:20px; border:2px solid #dc2626; box-shadow:0 0 20px rgba(220,38,38,0.4);">
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Data%20Source-Akabab%20API-blue?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
</p>

Una aplicación web interactiva diseñada para fanáticos de los cómics que permite explorar información detallada de cientos de personajes, combinando estética clásica de cómic con una experiencia moderna, fluida y responsive.

🚀 **Link del Proyecto:** [https://superhero-profile-app.vercel.app/](https://superhero-profile-app.vercel.app/)

---

## 📑 Índice
- [📑 Índice](#-índice)
- [🔍 Descripción](#-descripción)
- [🛠️ Tecnologías Utilizadas](#️-tecnologías-utilizadas)
- [🚀 Características](#-características)
  - [📸 Galería del Sistema](#-galería-del-sistema)
- [📂 Estructura del Proyecto](#-estructura-del-proyecto)
- [📡 API y Endpoints](#-api-y-endpoints)
  - [Mapeo de Datos (Endpoints de Información)](#mapeo-de-datos-endpoints-de-información)
  - [Lógica de Implementación (api.js)](#lógica-de-implementación-apijs)
- [📥 Cómo ejecutar el proyecto](#-cómo-ejecutar-el-proyecto)
- [🤝 Contribuir](#-contribuir)
- [⚖️ Licencia](#️-licencia)
- [👥 Autor](#-autor)

---

## 🔍 Descripción
**SuperHero Profile App** es una central de consulta visual inspirada en los sistemas de inteligencia de los universos de cómics. Presenta información compleja de forma clara, atractiva y accesible, con un diseño oscuro y acentos rojos que refuerzan la identidad visual del proyecto.

<p align="right">
  <a href="#-índice">Volver al índice ▲</a>
</p>

---

## 🛠️ Tecnologías Utilizadas
- **HTML5 & CSS3** — Estructura semántica y animaciones personalizadas.
- **Tailwind CSS** — Framework principal para diseño responsive y utilidades visuales.
- **JavaScript (Vanilla)** — Consumo de API, lógica de paginación y manipulación dinámica del DOM.

<p align="right">
  <a href="#-índice">Volver al índice ▲</a>
</p>

---

## 🚀 Características
- 🔌 **Consumo de API Externa:** Integración con la [Akabab Superhero API](https://akabab.github.io/superhero-api/api/).
- 🧾 **Ficha Técnica Detallada:** Modal tipo “Archivo Confidencial” con biometría y estadísticas.
- 📱 **Diseño Responsive:** Optimización para móviles, tablets y desktops.
- 🌓 **Selector de Temas (Dark/Light):** Aunque el diseño fue concebido originalmente para una experiencia **Dark**, se ha integrado un selector de modo claro por requerimientos técnicos del proyecto.
- 🧪 **Entorno de Pruebas:** Se incluye un archivo especial para testear la adaptabilidad del diseño en diferentes resoluciones. (**preview_c.html**)


<p align="right">
  <a href="#-índice">Volver al índice ▲</a>
</p>

--- 

### 📸 Galería del Sistema

<p align="center">
  <figure>
    <img src="https://i.postimg.cc/HnDRL889/buscador.png" alt="Buscador Principal" width="100%">
    <figcaption align="center"><i>Vista principal del sistema de búsqueda táctica con filtros activos.</i></figcaption>
  </figure>
</p>

<br>

<p align="center">
  <figure>
    <img src="https://i.postimg.cc/FFkhs08J/BUSCADOR-CARDS.png" alt="Tarjetas de Héroes" width="100%">
    <figcaption align="center"><i>Visualización de registros en formato de tarjetas de inteligencia.</i></figcaption>
  </figure>
</p>

<br>

<p align="center">
  <figure>
    <img src="https://i.postimg.cc/XYLbDLBF/MODAL.png" alt="Expediente Modal" width="100%">
    <figcaption align="center"><i>Expediente detallado: Biometría y Powerstats del objetivo.</i></figcaption>
  </figure>
</p>

<p align="right">
  <a href="#-índice">Volver al índice ▲</a>
</p>

---

## 📂 Estructura del Proyecto

```text
📂superhero-profile-app/
├── 📂css/
│   └── styles.css
├── 📂js/
│   ├── api.js
│   ├── config.js
│   ├── frases.js
│   ├── modal.js
│   ├── pagination.js
│   ├── state.js
│   └── ui.js
├── index.html        <-- Main Entry
├── preview_c.html    <-- Testing Responsivo
└── README.md
```

<p align="right">
  <a href="#-índice">Volver al índice ▲</a>
</p>

----


## 📡 API y Endpoints
El proyecto consume la **Akabab Superhero API**, optimiza el rendimiento mediante una estrategia de Cache Global. En lugar de realizar peticiones repetitivas al servidor, los datos se descargan una sola vez y se gestionan localmente en allHeroesCache.

### Mapeo de Datos (Endpoints de Información)

**`GET /all.json`**  
Devuelve la lista completa de héroes con estadísticas, biografía, apariencia y recursos visuales.

De cada objeto retornado por la API, la aplicación extrae y renderiza dinámicamente:

- **images/**: Se utilizan las versiones .sm o .md para las tarjetas y el modal de perfil.

- **powerstats/**: Atributos numéricos (Intelligence, Strength, Speed, Durability, Power, Combat) para generar las barras de nivel.

- **appearance/**: Datos físicos como gender, race y height/weight.

- **biography/**: Información de trasfondo como fullName, placeOfBirth y publisher.

### Lógica de Implementación (api.js)
Se utilizan funciones asíncronas para garantizar una experiencia de usuario fluida:

**getAllHeroes()**: Centraliza la descarga inicial y almacena los datos en un caché local (allHeroesCache).

**searchHeroes(query)**: Realiza un filtrado dinámico sobre los datos cacheados para una búsqueda instantánea.

**getHeroById(id)**: Recupera la información específica de un héroe para alimentar el modal de detalles.


```text
// Fragmento de la lógica de caché implementada
async function getAllHeroes() {
  if (allHeroesCache.length > 0) return allHeroesCache;

  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error("Error al cargar la base de datos");
    allHeroesCache = await response.json();
    return allHeroesCache;
  } catch (error) {
    console.error("Error en la API:", error);
    return [];
  }
}
```
<p align="right">
  <a href="#-índice">Volver al índice ▲</a>
</p>

---

## 📥 Cómo ejecutar el proyecto
1. Clonar el repositorio:
   
```bash
git clone https://github.com/magamahe/superhero-profile-app.git
```

2. Ingresar al proyecto:

```bash
cd superhero-profile-app
```

3. Abrir el archivo:

```text
index.html
```
(No requiere servidor ni instalación adicional)

<p align="right">
  <a href="#-índice">Volver al índice ▲</a>
</p>

---

## 🤝 Contribuir
Proyecto académico. Si deseas colaborar:
1. Forkear el repositorio.
2. Crear una rama nueva:
```bash
git checkout -b feature/nueva-funcionalidad
```
3. Realizar cambios y commit.
4. Push y Pull Request.

<p align="right">
  <a href="#-índice">Volver al índice ▲</a>
</p>

---
<p align="center">
  <img src="https://i.postimg.cc/zX95g3ZH/FRASE.png" alt="Hero Header" width="100%";">
</p>

---

## ⚖️ Licencia
Este proyecto se distribuye bajo la **Licencia MIT**.

<p align="right">
  <a href="#-índice">Volver al índice ▲</a>
</p>

---

## 👥 Autor

**Martínez Herrero, María Gabriela**

<p>
  <a href="https://github.com/magamahe" target="_blank">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" width="32"/>
  </a>
  &nbsp;
  <a href="https://linkedin.com/in/magamahe" target="_blank">
    <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg" width="32"/>
  </a>
  &nbsp;
  <a href="mailto:magamahe@gmail.com">
    <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" width="32"/>
  </a>
</p>
