from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from config import Config # Importamos nuestra configuración    
from app import db

# a) Modelo Usuario
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256)) # Almacena el hash de la contraseña

    # Relaciones: Un usuario puede tener muchas entradas (posts) y muchos comentarios
    posts = db.relationship('Post', backref='author', lazy='dynamic')
    comments = db.relationship('Comment', backref='author', lazy='dynamic')

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)

    def __repr__(self):
        return f'<User {self.username}>'

# b) Modelo Categoría
class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(64), unique=True, nullable=False)

    # Relación: Una categoría puede tener muchas entradas (posts)
    posts = db.relationship('Post', backref='category', lazy='dynamic')

    def __repr__(self):
        return f'<Category {self.name}>'

# c) Modelo Entrada o Post
class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(128), nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, index=True, default=datetime.utcnow)

    # Clave foránea al usuario que creó el post
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    # Clave foránea a la categoría del post (puede ser nula si no tiene categoría)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=True)

    # Relación: Un post puede tener muchos comentarios
    comments = db.relationship('Comment', backref='post', lazy='dynamic', cascade="all, delete-orphan") # cascade para eliminar comentarios si se borra el post

    def __repr__(self):
        return f'<Post {self.title}>'

# d) Modelo Comentario
class Comment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Clave foránea al usuario que hizo el comentario
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    # Clave foránea al post al que pertenece el comentario
    post_id = db.Column(db.Integer, db.ForeignKey('post.id'), nullable=False)

    def __repr__(self):
        return f'<Comment {self.text[:20]}...>'