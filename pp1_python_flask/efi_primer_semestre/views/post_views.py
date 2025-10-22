from flask import request, jsonify
from flask.views import MethodView
from flask_jwt_extended import jwt_required, get_jwt
from marshmallow import ValidationError

# Import decoradores y claims
from decorators.auth_decorators import roles_required, check_ownership_or_admin
from services.post_service import PostService
from schemas.post_schema import post_input_schema, post_output_schema, posts_output_schema

class PostListAPI(MethodView):
    """
    GET /api/posts - Listar posts públicos
    POST /api/posts - Crear un nuevo post
    """
    def __init__(self):
        self.post_service = PostService()

    # GET /api/posts (Público)
    def get(self):
        """Listar todos los posts publicados."""
        posts = self.post_service.get_public_posts()
        # Serializamos la lista de objetos Post a JSON
        result = posts_output_schema.dump(posts)
        return jsonify(result), 200

    # POST /api/posts (Requiere autenticación: user+)
    @roles_required("user", "moderator", "admin")
    def post(self):
        """Crear un nuevo post."""
        # 1. Obtener ID del usuario del token
        claims = get_jwt()
        current_user_id = claims.get("user_id")

        # 2. Validación de Datos de Entrada
        try:
            data = post_input_schema.load(request.json)
        except ValidationError as err:
            return jsonify({"errors": err.messages}), 400

        # 3. Lógica de negocio (Creación)
        try:
            new_post = self.post_service.create_new_post(current_user_id, data)
            # 4. Respuesta (Serialización del post creado)
            return jsonify({
                "message": "Post creado exitosamente.",
                "post": post_output_schema.dump(new_post)
            }), 201
        except Exception as e:
            return jsonify({"message": f"Error al crear el post: {str(e)}"}), 500


class PostDetailAPI(MethodView):
    """
    GET /api/posts/<id> - Ver detalle del post
    PUT /api/posts/<id> - Editar post (autor o admin)
    DELETE /api/posts/<id> - Eliminar post (autor o admin)
    """
    def __init__(self):
        self.post_service = PostService()

    # GET /api/posts/<id> (Público)
    def get(self, post_id):
        """Ver detalle de un post."""
        post = self.post_service.get_post_detail(post_id) # Solo trae posts publicados

        if not post:
            return jsonify({"message": "Post no encontrado o no publicado."}), 404
            
        result = post_output_schema.dump(post)
        return jsonify(result), 200

    # PUT /api/posts/<id> (Solo el autor o admin)
    @jwt_required()
    def put(self, post_id):
        """Editar un post existente (requiere ser autor o admin)."""
        # 1. Validación de Datos de Entrada
        try:
            data = post_input_schema.load(request.json)
        except ValidationError as err:
            return jsonify({"errors": err.messages}), 400

        # Función lambda para pasar el chequeo de propiedad al servicio
        def check_auth_ownership(resource_owner_id):
            return check_ownership_or_admin(resource_owner_id)

        # 2. Lógica de negocio (Actualización con chequeo de permisos)
        try:
            updated_post = self.post_service.update_existing_post(post_id, get_jwt().get("user_id"), data, check_auth_ownership)
            
            # 3. Respuesta
            return jsonify({
                "message": "Post actualizado exitosamente.",
                "post": post_output_schema.dump(updated_post)
            }), 200
            
        except ValueError as e:
            return jsonify({"message": str(e)}), 404
        except PermissionError as e:
            return jsonify({"message": str(e)}), 403
        except Exception as e:
            return jsonify({"message": f"Error al actualizar el post: {str(e)}"}), 500

    # DELETE /api/posts/<id> (Solo el autor o admin)
    @jwt_required()
    def delete(self, post_id):
        """Eliminar un post existente (requiere ser autor o admin)."""
        
        # Función lambda para pasar el chequeo de propiedad al servicio
        def check_auth_ownership(resource_owner_id):
            return check_ownership_or_admin(resource_owner_id)
            
        # 1. Lógica de negocio (Eliminación con chequeo de permisos)
        try:
            self.post_service.delete_post_by_id(post_id, check_auth_ownership)
            
            # 2. Respuesta
            return jsonify({"message": "Post eliminado exitosamente."}), 204 # no content
            
        except ValueError as e:
            return jsonify({"message": str(e)}), 404
        except PermissionError as e:
            return jsonify({"message": str(e)}), 403
        except Exception as e:
            return jsonify({"message": f"Error al eliminar el post: {str(e)}"}), 500