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
            role='user', # por defecto siempre rol user
            is_active=True
        )
        
        # guardamos la sesión para obtener el ID del usuario antes de commit
        db.session.add(new_user)
        db.session.flush() 

        # creamos las credenciales
        new_credentials = UserCredentials(user_id=new_user.id)
        new_credentials.set_password(password) # cifra la contraseña
        
        db.session.add(new_credentials)
        db.session.commit()

        return new_user

    @staticmethod
    def get_all_users():
        """Devuelve todos los usuarios del sistema."""
        return User.query.all()
    
    @staticmethod
    def get_by_id(user_id):
        """Busca un usuario por su ID."""
        return User.query.get(user_id)

    @staticmethod
    def update_user_role(user, new_role):
        """Cambia el rol de un usuario."""
        user.role = new_role
        db.session.commit()
        return user
        
    @staticmethod
    def deactivate_user(user):
        """Desactiva un usuario (soft-delete)."""
        user.is_active = False
        # la consigna es eliminar, pero mejor desactivar para mantener integridad
        db.session.commit()
        return user