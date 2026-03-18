from flask import request, jsonify
from flask.views import MethodView
from flask_jwt_extended import jwt_required, get_jwt
from marshmallow import ValidationError
from decorators.auth_decorators import roles_required
from services.user_service import UserService
from schemas.user_schema import user_output_schema, UserOutputSchema, user_role_update_schema

# Instancia many=True para listar usuarios
users_output_schema = UserOutputSchema(many=True)

# --- Endpoint para Listar Todos los Usuarios (Solo Admin) ---
class UserListAPI(MethodView):
    """
    GET /api/users - Listar todos los usuarios (Solo Admin)
    """
    def __init__(self):
        self.user_service = UserService()

    @roles_required("admin") # <--- Protege la ruta: solo admin puede acceder
    def get(self):
        """Lista todos los usuarios para la gestión administrativa."""
        try:
            users = self.user_service.get_all_users()
            # Asume que users_output_schema serializa una lista de usuarios
            result = users_output_schema.dump(users) 
            return jsonify(result), 200
        
        except Exception as e:
            # En un entorno real, logging.error(e)
            return jsonify({"message": f"Error al listar usuarios: {str(e)}"}), 500

class UserDetailAPI(MethodView):
    """
    GET /api/users/<id> - Ver perfil (Usuario mismo o admin)
    PATCH /api/users/<id>/role - Cambiar rol (Solo admin)
    DELETE /api/users/<id> - Desactivar usuario (Solo admin)
    """
    def __init__(self):
        self.user_service = UserService()

    # GET /api/users/<id> (Usuario mismo o admin)
    @jwt_required()
    def get(self, user_id):
        """Ver perfil de un usuario."""
        claims = get_jwt()
        current_user_id = claims.get("user_id")
        current_user_role = claims.get("role")
        
        try:
            user = self.user_service.get_user_profile(user_id, current_user_id, current_user_role)
            result = user_output_schema.dump(user)
            return jsonify(result), 200
        except ValueError as e:
            return jsonify({"message": str(e)}), 404
        except PermissionError as e:
            return jsonify({"message": str(e)}), 403

    # PATCH /api/users/<id>/role (Solo admin)
    @roles_required("admin")
    def patch(self, user_id):
        """Cambiar el rol de un usuario."""
        # 1. Validación de Datos
        try:
            data = user_role_update_schema.load(request.json)
        except ValidationError as err:
            return jsonify({"errors": err.messages}), 400

        # 2. Lógica de Negocio
        try:
            updated_user = self.user_service.change_user_role(user_id, data['role'])
            return jsonify({
                "message": f"Rol de {updated_user.email} cambiado a '{updated_user.role}'.",
                "user": user_output_schema.dump(updated_user)
            }), 200
        except ValueError as e:
            return jsonify({"message": str(e)}), 404
        except Exception as e:
            return jsonify({"message": f"Error al cambiar el rol: {str(e)}"}), 500

    # DELETE /api/users/<id> (Solo admin)
    @roles_required("admin")
    def delete(self, user_id):
        """Desactivar un usuario (soft delete)."""
        try:
            deactivated_user = self.user_service.deactivate_user(user_id)
            return jsonify({
                "message": f"Usuario {deactivated_user.email} desactivado exitosamente.",
                "is_active": deactivated_user.is_active
            }), 200 

        except ValueError as e:
            return jsonify({"message": str(e)}), 404
        except Exception as e:
            return jsonify({"message": f"Error al desactivar el usuario: {str(e)}"}), 500
        

class UserManagementAPI(MethodView):
    """
    GET /api/admin/users: Lista todos los usuarios.
    """
    def __init__(self):
        self.user_service = UserService()

    @roles_required("admin")
    def get(self):
        """Devuelve la lista completa de usuarios."""
        try:
            users = self.user_service.get_all_users()
            # 1. Serialización de la LISTA de objetos
            result = users_output_schema.dump(users) 
            
            # 2. Responde con el array de usuarios directamente (para el frontend)
            return jsonify(result), 200 
            
        except Exception as e:
            return jsonify({"message": f"Error al listar usuarios: {str(e)}"}), 500


class UserRoleUpdateAPI(MethodView):
    """
    PUT /api/admin/users/<int:user_id>/role: Actualiza el rol de un usuario.
    """
    def __init__(self):
        # Asegúrate de importar UserService si es necesario
        from services.user_service import UserService 
        self.user_service = UserService()

    @roles_required("admin")
    def put(self, user_id): 
        """Actualiza el rol de un usuario por su ID."""
        # 1. Validación del Rol entrante
        try:
            # Asegúrate de importar user_role_update_schema
            from schemas.user_schema import user_role_update_schema 
            data = user_role_update_schema.load(request.json)
        except ValidationError as err:
            return jsonify({"errors": err.messages}), 400
        
        try:
            # 2. Lógica de negocio
            updated_user = self.user_service.update_user_role(user_id, data['role'])
            
            # 3. Serialización y Respuesta
            from schemas.user_schema import user_output_schema 
            return jsonify({
                "message": "Rol actualizado exitosamente.",
                "user": user_output_schema.dump(updated_user)
            }), 200

        except ValueError as e:
            # Maneja errores de negocio, como usuario no encontrado (404)
            return jsonify({"message": str(e)}), 404
        except Exception as e:
            return jsonify({"message": f"Error interno al actualizar el rol: {str(e)}"}), 500