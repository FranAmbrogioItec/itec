from flask import request, jsonify
from flask.views import MethodView
from flask_jwt_extended import create_access_token

from services.auth_service import AuthService
from schemas.user_schema import register_schema, login_schema
from marshmallow import ValidationError

class AuthRegisterAPI(MethodView):
    """
    POST /api/register
    Maneja el registro de nuevos usuarios.
    """
    def __init__(self):
        self.auth_service = AuthService()

    def post(self):
        # 1. Validación de Datos de Entrada (Marshmallow)
        try:
            data = register_schema.load(request.json)
        except ValidationError as err:
            return jsonify({"errors": err.messages}), 400

        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        role = data.get('role') 

        # 2. Lógica de Negocio
        try:
            new_user = self.auth_service.register_user(username, email, password, role) 
            
            # 3. Respuesta API
            return jsonify({
                "message": "Usuario creado exitosamente.",
                "user_id": new_user.id
            }), 201

        except ValueError as e:
            # Captura errores de negocio (ej: email duplicado)
            return jsonify({"message": str(e)}), 409
        except Exception as e:
            return jsonify({"message": "Error interno del servidor al registrar."}), 500


class AuthLoginAPI(MethodView):
    """
    POST /api/login
    Maneja la autenticación y devuelve un JWT.
    """
    def __init__(self):
        self.auth_service = AuthService()

    def post(self):
        # 1. Validación de Datos de Entrada
        try:
            data = login_schema.load(request.json)
        except ValidationError as err:
            return jsonify({"errors": err.messages}), 400
        
        email = data.get('email')
        password = data.get('password')

        # 2. Lógica de Autenticación
        user = self.auth_service.authenticate_user(email, password)

        if user:
            # 3. Creación del Token JWT
            # El objeto 'user' se pasa al @additional_claims_loader en app.py
            """ access_token = create_access_token(identity=user.id) # <-- ¡SOLUCIÓN!  """
            access_token = create_access_token(identity=str(user.id))

            # 4. Respuesta API
            return jsonify({
                "access_token": access_token
            }), 200
        else:
            return jsonify({"message": "Credenciales inválidas o usuario inactivo."}), 401