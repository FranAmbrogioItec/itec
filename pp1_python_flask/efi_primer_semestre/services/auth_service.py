from repositories.user_repository import UserRepository

class AuthService:
    
    def __init__(self):
        self.repo = UserRepository()

    def register_user(self, username, email, password):
        """Lógica para registrar un usuario. Verifica si ya existe."""
        if self.repo.get_by_email(email):
            raise ValueError("El correo electrónico ya está registrado.")
                    
        # la creacion y el hash se delegan al repositorio
        new_user = self.repo.create_user(username, email, password)
        return new_user

    def authenticate_user(self, email, password):
        """Lógica para iniciar sesión."""
        user = self.repo.get_by_email(email)
        
        if not user or not user.is_active:
            return None # usuario no encontrado o inactivo
        
        # obtener y verificar la contraseña
        credentials = self.repo.get_user_credentials(user.id)
        if credentials and credentials.check_password(password):
            return user # autenticación exitosa
        
        return None # contraseña incorrecta