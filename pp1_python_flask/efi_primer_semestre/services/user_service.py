# services/user_service.py (Nuevo Archivo)
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

    def change_user_role(self, target_user_id, new_role):
        """Cambia el rol de un usuario (solo para admin)."""
        # Aseguramos que el rol sea válido
        if new_role not in ['user', 'moderator', 'admin']:
            raise ValueError("Rol inválido.")
            
        user = self.repo.get_by_id(target_user_id)
        if not user:
            raise ValueError("Usuario no encontrado.")
            
        # Opcional: Impedir que un admin cambie su propio rol si es el único admin.

        return self.repo.update_user_role(user, new_role)
        
    def deactivate_user(self, target_user_id):
        """Desactiva un usuario (solo para admin)."""
        user = self.repo.get_by_id(target_user_id)
        if not user:
            raise ValueError("Usuario no encontrado.")
            
        return self.repo.deactivate_user(user)