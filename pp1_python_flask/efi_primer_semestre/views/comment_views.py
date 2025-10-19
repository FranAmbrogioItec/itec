# views/comment_views.py
from flask import request, jsonify
from flask.views import MethodView
from flask_jwt_extended import jwt_required, get_jwt
from marshmallow import ValidationError
from decorators.auth_decorators import roles_required
from services.comment_service import CommentService
from schemas.comment_schema import comment_input_schema, comments_output_schema, comment_output_schema

class CommentListAPI(MethodView):
    """
    GET /api/posts/<id>/comments - Listar comentarios
    POST /api/posts/<id>/comments - Crear un nuevo comentario
    """
    def __init__(self):
        self.comment_service = CommentService()

    # GET /api/posts/<id>/comments (Público)
    def get(self, post_id):
        """Listar todos los comentarios visibles de un post."""
        comments = self.comment_service.get_post_comments(post_id)
        result = comments_output_schema.dump(comments)
        return jsonify(result), 200

    # POST /api/posts/<id>/comments (Requiere autenticación: user+)
    @roles_required("user", "moderator", "admin")
    def post(self, post_id):
        """Crear un nuevo comentario."""
        claims = get_jwt()
        current_user_id = claims.get("user_id")

        try:
            data = comment_input_schema.load(request.json)
        except ValidationError as err:
            return jsonify({"errors": err.messages}), 400


        try:
            new_comment = self.comment_service.create_new_comment(post_id, current_user_id, data)
            return jsonify({
                "message": "Comentario creado exitosamente.",
                "comment": comment_output_schema.dump(new_comment)
            }), 201
        
        # 🛑 SOLUCIÓN 1: Capturamos el ValueError del servicio y devolvemos 404
        except ValueError as e: 
            return jsonify({"message": str(e)}), 404 
            
        # 🛑 SOLUCIÓN 2: Dejamos el catch genérico, pero ahora solo atrapará errores reales de lógica/DB
        except Exception as e:
            # Consejo: revisa la consola del servidor para ver el error real si llega aquí.
            return jsonify({"message": f"Error interno del servidor al crear comentario: {str(e)}"}), 500



class CommentDetailAPI(MethodView):
    """
    DELETE /api/comments/<id> - Eliminar comentario (Autor, moderador o admin)
    """
    def __init__(self):
        self.comment_service = CommentService()
        
    # DELETE /api/comments/<id> (Autor, moderator o admin)
    @jwt_required() # El chequeo de rol/propiedad se hace en el servicio
    def delete(self, comment_id):
        """Eliminar un comentario existente."""
        try:
            self.comment_service.delete_comment_by_id(comment_id)
            
            return jsonify({"message": "Comentario eliminado exitosamente."}), 204
            
        except ValueError as e:
            return jsonify({"message": str(e)}), 404
        except PermissionError as e:
            return jsonify({"message": str(e)}), 403
        except Exception as e:
            return jsonify({"message": f"Error al eliminar el comentario: {str(e)}"}), 500