# Miniblog API (Backend)

Este es el backend de la aplicación Miniblog, desarrollado con **Flask** y utilizando **Flask-SQLAlchemy** para la gestión de datos y **Flask-JWT-Extended** para la autenticación basada en tokens web (JWT) con roles.

La API sigue una arquitectura modular (MVC/Service Layer) para la gestión de Posts, Comentarios y Usuarios.

---

## 🚀 1. Instalación y Ejecución

Sigue estos pasos para configurar y ejecutar el proyecto localmente:

### 1.1. Configuración del Entorno

1.  **Clonar el repositorio:**
    ```bash
    git clone [git@github.com:FranAmbrogioItec/itec.git]
    cd pp1_python_flask/efi_primer_semestre
    ```

2.  **Crear y activar un entorno virtual:**
    ```bash
    python3 -m venv venv
    source venv/bin/activate  # En Linux/macOS
    # o: .\venv\Scripts\activate  # En Windows (PowerShell)
    ```

3.  **Instalar dependencias:**
    ```bash
    pip install -r requirements.txt
    ```

### 1.2. Configuración de la Base de Datos

El proyecto utiliza MySQL.

1.  **Crear la base de datos:** Asegúrate de que la base de datos `database_efi` exista y que el usuario `flaskuser` tenga permisos, tal como se configura en `app.py`.

2.  **Ejecutar las Migraciones (Crear Tablas):**
    ```bash
    flask db upgrade
    ```

3.  **Cargar Datos de Prueba:** Ejecuta el script de datos de prueba ('seed_data.sql') que se ubica en la raiz del proyecto.

### 1.3. Ejecutar la API

1.  **Ejecutar el servidor Flask:**
    ```bash
    flask run
    ```
    La API estará disponible en `http://127.0.0.1:5000/api`.

---

## 🔑 2. Credenciales de Prueba

Utiliza estas credenciales para probar los endpoints y la seguridad basada en roles (los roles se definen en el registro, pero puedes insertarlos directamente en la DB con el script de prueba).

| Rol          | Email                 | Contraseña   | Permisos Clave |
| :----------- | :-------------------- | :----------- | :------------- |
| **Admin** | `user@example.com`       | `password123`| Gestión total de Posts, Comentarios, y Usuarios (API `/api/users`). |
| **Moderator**| `user@example2.com`   | `password123`| Gestión de Posts y Comentarios de **otros** usuarios. |
| **User** | `user@example3.com`        | `password123`| Crear/Editar/Eliminar sus propios Posts/Comentarios. |

---

## 📋 3. Documentación de Endpoints (API)

Todos los endpoints usan el prefijo `/api`.

| Método | URL | Descripción | Requisito |
| :----- | :--- | :--- | :--- |
| **POST** | `/api/register` | Registro de nuevo usuario. | Público |
| **POST** | `/api/login` | Iniciar sesión. Devuelve un **`access_token`**. | Público |
| **GET** | `/api/posts` | Listar todos los posts. | Público |
| **POST** | `/api/posts` | Crear un nuevo post. | `user`+ |
| **GET** | `/api/posts/<id>` | Obtener detalles de un post. | Público |
| **PUT** | `/api/posts/<id>` | Actualizar un post. | Autor, `moderator` o `admin` |
| **DELETE**| `/api/posts/<id>` | Eliminar un post. | Autor, `admin` |
| **GET** | `/api/posts/<id>/comments` | Listar comentarios de un post. | Público |
| **POST** | `/api/posts/<id>/comments` | Añadir un comentario. | `user`+ |
| **DELETE**| `/api/comments/<id>` | Eliminar un comentario. | Autor, `moderator` o `admin` |
| **GET**| `/api/categories`| Listar categorías (para el formulario de Posts). | Público |
| **GET**| `/api/users`| Listar todos los usuarios. | `admin` |
| **DELETE**| `/api/users/<id>`| Eliminar un usuario. | `admin` |