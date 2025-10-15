# repositories/user_repository.py
from app import db
from models.models import User, UserCredentials

class UserRepository:
    
    @staticmethod
    def get_by_email(email):
        """Busca un usuario por su correo electrónico."""
        return User.query.filter_by(email=email).first()

    @staticmethod
    def get_user_credentials(user_id):
        """Obtiene las credenciales (password_hash) de un usuario por su ID."""
        return UserCredentials.query.filter_by(user_id=user_id).one_or_none()

    def create_user(self, username, email, password):
        """Crea un nuevo usuario y sus credenciales asociadas."""
        new_user = User(
            username=username, 
            email=email, 
            role='user', # Rol por defecto
            is_active=True
        )
        
        # Guardamos la sesión para obtener el ID del usuario antes de commit
        db.session.add(new_user)
        db.session.flush() 

        # Creamos las credenciales
        new_credentials = UserCredentials(user_id=new_user.id)
        new_credentials.set_password(password) # Cifra la contraseña
        
        db.session.add(new_credentials)
        db.session.commit()
        
        return new_user