from flask import Flask, jsonify, Blueprint
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager, create_access_token, get_jwt_identity, set_access_cookies
from datetime import timedelta
from flask_cors import CORS
import os # para las variables de entorno o configuracion

# Inicializar la app Flask
app = Flask(__name__) 

CORS(app)  # Habilitar CORS para todas las rutas, permite q el frontend acceda a la API

# --- Configuración de la Aplicación ---
app.config['SECRET_KEY'] = "CLAVE_UNICA_PARA_TEST_12345"
app.config['SQLALCHEMY_DATABASE_URI'] = (
    "mysql+pymysql://flaskuser:0044295023@localhost/database_efi"
    )
# Configuración de JWT
app.config["JWT_SECRET_KEY"] = "CLAVE_UNICA_PARA_TEST_12345" 
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=24) #expira en 24 horas

# Inicialización de Extensiones
db = SQLAlchemy(app)    
migrate = Migrate(app, db)
jwt = JWTManager(app)

# Importaciones de Modelos, Servicios y Vistas
from models.models import User, Category, Post, Comment 

from services.auth_service import AuthService
from views.auth_views import AuthRegisterAPI, AuthLoginAPI
from views.post_views import PostListAPI, PostDetailAPI

from views.comment_views import CommentListAPI, CommentDetailAPI
from views.category_views import CategoryListAPI, CategoryDetailAPI
from views.user_views import UserListAPI, UserDetailAPI
from views.stats_views import StatsAPI
from views.analytics_views import AnalyticsSummaryAPI

admin_bp = Blueprint('admin', __name__, url_prefix='/api/admin')

admin_bp.add_url_rule('/stats', view_func=AnalyticsSummaryAPI.as_view('analytics_summary_api'))
app.register_blueprint(admin_bp)

# --- Configuración de Claims JWT  ---
@jwt.additional_claims_loader
def add_claims_to_access_token(identity):
    """
    Función que añade claims (datos) extra al token.
    Recibe la identidad (que es el ID de usuario - int)
    """
    # 1. Obtenemos el objeto User usando la identidad (el ID)
    user = User.query.get(identity)
    
    # 2. Verificamos que el usuario exista y devolvemos los claims.
    if user:
        # Ahora 'user' es el objeto User, y podemos acceder a sus atributos
        return {
            "user_id": user.id,
            "email": user.email,
            "role": user.role
        }
    # Si la búsqueda falla (user es None), devuelve claims vacíos.
    return {}

# --- Manejo de Errores JWT ---
@jwt.unauthorized_loader
def unauthorized_callback(callback):
    return jsonify(msg="Token de autenticación faltante o inválido."), 401

@jwt.expired_token_loader
def expired_token_callback(_jwt_header, _jwt_data):
    return jsonify(msg="El token ha expirado."), 401


# --- Registro de Vistas Basadas en Clases (API) ---

# Autenticación
app.add_url_rule(
    '/api/register', 
    view_func=AuthRegisterAPI.as_view('auth_register_api'), 
    methods=['POST']
)

app.add_url_rule(
    '/api/login', 
    view_func=AuthLoginAPI.as_view('auth_login_api'), 
    methods=['POST']
)

# Posts
app.add_url_rule(
    '/api/posts', 
    view_func=PostListAPI.as_view('post_list_api'), 
    methods=['GET', 'POST']
)
app.add_url_rule(
    '/api/posts/<int:post_id>', 
    view_func=PostDetailAPI.as_view('post_detail_api'), 
    methods=['GET', 'PUT', 'DELETE']
)

# Endpoints de Comentarios
app.add_url_rule(
    '/api/posts/<int:post_id>/comments', 
    view_func=CommentListAPI.as_view('comment_list_api'), 
    methods=['GET', 'POST']
)
app.add_url_rule(
    '/api/comments/<int:comment_id>', 
    view_func=CommentDetailAPI.as_view('comment_detail_api'), 
    methods=['DELETE'] 
)


# Endpoints de Categorías
app.add_url_rule(
    '/api/categories', 
    view_func=CategoryListAPI.as_view('category_list_api'), 
    methods=['GET', 'POST']
)
app.add_url_rule(
    '/api/categories/<int:category_id>', 
    view_func=CategoryDetailAPI.as_view('category_detail_api'), 
    methods=['PUT', 'DELETE']
)

# Endpoints de Usuarios (Admin)
app.add_url_rule(
    '/api/users', 
    view_func=UserListAPI.as_view('user_list_api'), 
    methods=['GET']
)
app.add_url_rule(
    '/api/users/<int:user_id>', 
    view_func=UserDetailAPI.as_view('user_detail_api'), 
    methods=['GET', 'DELETE']
)
app.add_url_rule(
    '/api/users/<int:user_id>/role', # patch para cambiar el rol
    view_func=UserDetailAPI.as_view('user_role_api'), 
    methods=['PATCH']
)

# Endpoint de Estadísticas
app.add_url_rule(
    '/api/stats', 
    view_func=StatsAPI.as_view('stats_api'), 
    methods=['GET']
)

if __name__ == '__main__':
    app.run(debug=True)