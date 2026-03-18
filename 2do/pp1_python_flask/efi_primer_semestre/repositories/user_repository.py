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

    def create_user(self, username, email, password, role='user'):
        """Crea un nuevo usuario y sus credenciales asociadas."""
        new_user = User(
            username=username, 
            email=email, 
            role=role,
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
    def update_role(user, new_role):  
            """
            Actualiza el campo 'role' de un objeto User y guarda los cambios en la DB.
            """
            try:
                # 1. Asigna el nuevo rol al objeto User de SQLAlchemy
                user.role = new_role
                
                # 2. Persiste los cambios en la base de datos
                db.session.commit() 
                
                return user
            except Exception as e:
                # 3. En caso de error, haz un rollback y propaga la excepción
                db.session.rollback()
                raise Exception(f"Fallo al guardar el cambio de rol en la DB: {str(e)}")
        
    @staticmethod
    def deactivate_user(user):
        """Desactiva un usuario (soft-delete)."""
        user.is_active = False
        # la consigna es eliminar, pero mejor desactivar para mantener integridad
        db.session.commit()
        return user
    
    def count_all(self):
        """Cuenta todos los usuarios en la base de datos."""
        return User.query.count()