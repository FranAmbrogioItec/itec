# models/models.py (MODIFICADO)
from app import db
# from flask_login import UserMixin # <--- ELIMINAMOS ESTO
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime


class User(db.Model):
    # Ya no hereda de UserMixin
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    
    # NUEVOS CAMPOS REQUERIDOS
    role = db.Column(db.String(20), default='user', nullable=False) # 'user', 'moderator', 'admin'
    is_active = db.Column(db.Boolean, default=True, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow, nullable=False)
    
    # ELIMINAMOS password_hash de aquí

    # Relaciones
    credentials = db.relationship('UserCredentials', backref='user', uselist=False, cascade="all, delete-orphan")
    posts = db.relationship('Post', backref='author', lazy='dynamic')
    comments = db.relationship('Comment', backref='author', lazy='dynamic')

    # ELIMINAMOS set_password y check_password de aquí

    def __repr__(self):
        return f'<User {self.email} ({self.role})>'

# NUEVO MODELO: UserCredentials
class UserCredentials(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False) 

    # Mantenemos los métodos de seguridad aquí, relacionados con el hash
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


# MODELO Category
class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True, nullable=False)

    posts = db.relationship('Post', backref='category', lazy='dynamic')

    def __repr__(self):
        return f'<Category {self.name}>'


# MODELO Post
class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(128), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    
    # NUEVOS CAMPOS REQUERIDOS
    is_published = db.Column(db.Boolean, default=True, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False) # Se actualiza automáticamente

    # ... (user_id, category_id, comments)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=True)
    comments = db.relationship('Comment', backref='post', lazy='dynamic', cascade="all, delete-orphan") 

    def __repr__(self):
        return f'<Post {self.title}>'

class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # NUEVO CAMPO REQUERIDO
    is_visible = db.Column(db.Boolean, default=True, nullable=False) # Para moderación

    # ... (user_id, post_id)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)

    def __repr__(self):
        return f'<Comment {self.text[:20]}...>'