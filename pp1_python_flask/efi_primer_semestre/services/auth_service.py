# services/auth_service.py

from repositories.user_repository import UserRepository

class AuthService:
    
    def __init__(self):
        self.repo = UserRepository()

    def register_user(self, username, email, password, role): 
        """
        Registra un nuevo usuario verificando que el email no esté duplicado.
        """

        if self.repo.get_by_email(email):
            raise ValueError("El email ya está registrado.")

        # 1. Validación de Roles permitidos (Aunque Marshmallow lo hace, es una buena capa de seguridad)
        if role not in ['user', 'moderator', 'admin']:
             # Si el rol viene mal del frontend, lo asignamos por defecto a 'user'
             # Opcional: Podrías lanzar un error 
             role = 'user' 
        
        # 2. Llama al repositorio, pasando el nuevo argumento 'role'
        return self.repo.create_user(username, email, password, role)

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