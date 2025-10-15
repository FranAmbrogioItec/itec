# services/auth_service.py
from repositories.user_repository import UserRepository

class AuthService:
    
    def __init__(self):
        self.repo = UserRepository()

    def register_user(self, username, email, password):
        """Lógica para registrar un usuario. Verifica si ya existe."""
        if self.repo.get_by_email(email):
            # En una API, es mejor lanzar una excepción de negocio que el controlador atrapará
            raise ValueError("El correo electrónico ya está registrado.")
            
        # Podrías agregar aquí la validación de username duplicado
        
        # La creación y el hashing se delegan al repositorio
        new_user = self.repo.create_user(username, email, password)
        return new_user

    def authenticate_user(self, email, password):
        """Lógica para iniciar sesión."""
        user = self.repo.get_by_email(email)
        
        if not user or not user.is_active:
            return None # Usuario no encontrado o inactivo
        
        # Obtener y verificar la contraseña
        credentials = self.repo.get_user_credentials(user.id)
        if credentials and credentials.check_password(password):
            return user # Autenticación exitosa
        
        return None # Contraseña incorrecta