# ⚛️ Miniblog - Frontend (React.js + Material-UI)

## 📌 1. Información del Desarrollador

| **Francisco Ambrogio** | **[(https://github.com/FranAmbrogioItec)]** |

---

## 🔗 2. Enlace al Backend (API Flask)

El frontend de este proyecto consume una API RESTful desarrollada con **Python (Flask)**.

* **URL Base de la API:** `[http://127.0.0.1:5000]`
---

## 🛠️ 3. Guía de Instalación y Ejecución del Proyecto

Sigue estos pasos para configurar y ejecutar el proyecto de React en tu entorno local.

### 3.1. Prerrequisitos

Asegúrate de tener instalado:

* **Node.js** (versión recomendada: 18.x o superior)
* **npm** o **Yarn**
* **API de Backend (Flask)**: La API debe estar corriendo y accesible en la URL especificada (http://127.0.0.1:5000).

### 3.2. Instalación de Dependencias

1.  **Clona el repositorio:**

    ```bash
    git clone (git@github.com:FranAmbrogioItec/itec.git)
    cd pp1_js
    cd efi-react
    ```

2.  **Instala las dependencias del proyecto** (React, Material-UI, Axios, etc.):

    ```bash
    npm install
    # o si usas yarn:
    # yarn install
    ```

### 3.3. Configuración de Variables de Entorno

El proyecto utiliza variables de entorno para configurar la URL del backend.

1.  Crea un archivo llamado **`.env`** en la raíz del proyecto.
2.  Añade la siguiente variable, reemplazando el valor por la URL base de tu API Flask:

    ```env
    # .env
    # IMPORTANTE: Asegúrate de que esta URL sea la misma donde está corriendo tu backend de Flask
    REACT_APP_API_BASE_URL=http://127.0.0.1:5000/api 
    ```

### 3.4. Ejecución del Proyecto

Una vez que el backend (Flask) esté corriendo y las dependencias estén instaladas, puedes iniciar la aplicación de React:

```bash
npm start
# o si usas yarn:
# yarn start