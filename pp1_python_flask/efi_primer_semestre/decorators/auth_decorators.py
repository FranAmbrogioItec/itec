# decorators/auth_decorators.py
from functools import wraps
from flask import jsonify
from flask_jwt_extended import get_jwt, jwt_required

def roles_required(*roles):
    """
    Decora un endpoint para requerir que el usuario autenticado tenga
    uno de los roles especificados en los claims de su JWT.
    """
    def wrapper(fn):
        @wraps(fn)
        @jwt_required() # Asegura que el token sea válido antes de verificar el rol
        def decorator(*args, **kwargs):
            claims = get_jwt()
            user_role = claims.get("role")
            
            if user_role not in roles:
                # Acceso denegado (Forbidden)
                return jsonify(msg=f"Acceso denegado. Rol requerido: {', '.join(roles)}"), 403
            return fn(*args, **kwargs)
        return decorator
    return wrapper

def check_ownership_or_admin(resource_owner_id):
    """
    Verifica si el usuario es dueño del recurso o si tiene el rol 'admin'.
    """
    claims = get_jwt()
    current_user_id = claims.get("user_id")
    current_user_role = claims.get("role")
    
    # 1. Es Administrador?
    if current_user_role == 'admin':
        return True
    
    # 2. Es el dueño del recurso? (Asume que está siendo llamado desde una ruta protegida)
    if current_user_id == resource_owner_id:
        return True
        
    return False