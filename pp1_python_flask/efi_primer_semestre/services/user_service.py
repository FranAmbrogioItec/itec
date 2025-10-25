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
            
        return self.repo.update_user_role(user, new_role)
        
    def deactivate_user(self, target_user_id):
        """Desactiva un usuario (solo para admin)."""
        user = self.repo.get_by_id(target_user_id)
        if not user:
            raise ValueError("Usuario no encontrado.")
            
        return self.repo.deactivate_user(user)
    
    def update_user_role(self, user_id, new_role):
        """Actualiza el rol de un usuario específico."""
        user = self.repo.get_by_id(user_id)
        if not user:
            raise ValueError("Usuario no encontrado.")
        
        # Lógica de seguridad: Un administrador no debería degradar su propio rol
        # Esto se puede hacer con get_jwt(), pero lo dejamos simple por ahora.
        
        # Simplemente actualizamos el rol. Asume que el repositorio tiene este método:
        # Repositorio: self.repo.update_role(user, new_role) 
        
        # --- Lógica de Repositorio (Placeholder) ---
        # Si usas SQLAlchemy, la lógica del repositorio sería algo así:
        # user.role = new_role
        # db.session.commit()
        
        # Retorna el usuario actualizado
        return self.repo.update_role(user, new_role)