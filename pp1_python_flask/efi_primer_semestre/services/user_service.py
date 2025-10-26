from repositories.user_repository import UserRepository

class UserService:
    
    def __init__(self):
        self.repo = UserRepository()

    def get_all_users(self):
        """Obtiene la lista de todos los usuarios (solo para admin)."""
        return self.repo.get_all_users()

    def get_user_profile(self, target_user_id, current_user_id, current_user_role):
        """Obtiene un usuario. Permite al usuario verse a sí mismo o al admin ver a cualquiera."""
        user = self.repo.get_by_id(target_user_id)
        
        if not user:
            raise ValueError("Usuario no encontrado.")

        # Requisito: Usuario mismo o admin
        if target_user_id == current_user_id or current_user_role == 'admin':
            return user
            
        raise PermissionError("Acceso denegado. Solo puedes ver tu perfil o un administrador puede ver este.")

    # El método 'change_user_role' (anteriormente duplicado) fue eliminado para simplificar.

    def deactivate_user(self, target_user_id):
        """Desactiva un usuario (solo para admin)."""
        user = self.repo.get_by_id(target_user_id)
        if not user:
            raise ValueError("Usuario no encontrado.")
            
        return self.repo.deactivate_user(user)
        
    def update_user_role(self, user_id, new_role):
        """Busca el usuario y actualiza su rol a través del repositorio."""
        
        # 1. Validación del Rol 
        if new_role not in ['user', 'moderator', 'admin']:
            raise ValueError("Rol inválido.") 
            
        # 2. Búsqueda
        user = self.repo.get_by_id(user_id)
        
        if not user:
            raise ValueError(f"Usuario con ID {user_id} no encontrado.")
            
        if user.role == new_role:
            # No hay cambio, devuelve el usuario actual
            return user
            
        # 3. Llamada correcta al repositorio
        return self.repo.update_role(user, new_role)