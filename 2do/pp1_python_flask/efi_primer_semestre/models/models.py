from app import db
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from sqlalchemy.orm import relationship


# 1. Modelo User 
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    
    # nuevos campos para jwt/roles
    role = db.Column(db.String(50), default='user') 
    is_active = db.Column(db.Boolean, default=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # relacion a las credenciales (hash de contraseña)
    credentials = relationship('UserCredentials', backref='user', uselist=False, cascade="all, delete-orphan") 
    
    posts = db.relationship('Post', backref='author', lazy='dynamic')
    comments = db.relationship('Comment', backref='author', lazy='dynamic')

    def __repr__(self):
        return f'<User {self.username}>'

# 2. Modelo para el Hash de la Contraseña
class UserCredentials(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    password_hash = db.Column(db.String(256), nullable=False)
    
    # clave foranea al usuario (uno a uno)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id', ondelete='CASCADE'), unique=True, nullable=False)
    
    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

# Modelo Category
class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True, nullable=False)

    posts = db.relationship('Post', backref='category', lazy='dynamic')

    def __repr__(self):
        return f'<Category {self.name}>'


# Modelo Post
class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(128), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, index=True, default=datetime.utcnow)
    
    # campos nuevos
    is_published = db.Column(db.Boolean, default=True, nullable=False)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False) 

    # ... (user_id, category_id, comments)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=True)
    comments = db.relationship('Comment', backref='post', lazy='dynamic', cascade="all, delete-orphan") 

    def __repr__(self):
        return f'<Post {self.title}>'

# Modelo Comment
class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # campo nuevo
    is_visible = db.Column(db.Boolean, default=True, nullable=False) # para moderacion

    # ... (user_id, post_id)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)

    def __repr__(self):
        return f'<Comment {self.text[:20]}...>'