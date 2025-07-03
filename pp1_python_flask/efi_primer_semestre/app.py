from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime
from config import Config # Importamos nuestra configuración    
# Inicialización de la aplicación Flask
app = Flask(__name__) 
app.config.from_object(Config) # Cargamos la configuración desde config.py

# Inicialización de extensiones
db = SQLAlchemy(app)    
migrate = Migrate(app, db)
login_manager = LoginManager(app)
login_manager.login_view = 'login' # La vista a la que redirigir si el usuario no está logueado

# --- Modelos de la Base de Datos ---

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

# --- Flask-Login User Loader ---
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# --- Context Processor ---
# Proporciona la lista de categorías a todas las plantillas
@app.context_processor
def inject_categories():
    return dict(all_categories=Category.query.all())

# --- Rutas / Vistas ---

@app.route('/')
@app.route('/index')
def index():
    # Obtener un parámetro de consulta 'category' para filtrar
    category_name = request.args.get('category')
    
    if category_name:
        category = Category.query.filter_by(name=category_name).first()
        if category:
            posts = Post.query.filter_by(category_id=category.id).order_by(Post.created_at.desc()).all()
            flash(f'Mostrando publicaciones de la categoría: {category.name}', 'info')
        else:
            posts = []
            flash(f'La categoría "{category_name}" no existe.', 'warning')
    else:
        # Consulta todos los posts, ordenados por fecha de creación descendente
        posts = Post.query.order_by(Post.created_at.desc()).all()
    
    return render_template('index.html', title='Inicio', posts=posts)

@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')

        user = User.query.filter_by(username=username).first()
        if user:
            flash('El nombre de usuario ya existe. Por favor, elige otro.', 'danger')
            return redirect(url_for('register'))

        user = User.query.filter_by(email=email).first()
        if user:
            flash('El correo electrónico ya está registrado.', 'danger')
            return redirect(url_for('register'))

        new_user = User(username=username, email=email)
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
        flash('¡Registro exitoso! Ya puedes iniciar sesión.', 'success')
        return redirect(url_for('login'))
    return render_template('register.html', title='Registro')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('index'))
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        user = User.query.filter_by(username=username).first()
        if user is None or not user.check_password(password):
            flash('Usuario o contraseña incorrectos.', 'danger')
            return redirect(url_for('login'))
        login_user(user)
        flash('¡Sesión iniciada correctamente!', 'success')
        return redirect(url_for('index'))
    return render_template('login.html', title='Iniciar Sesión')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Has cerrado sesión.', 'info')
    return redirect(url_for('index'))

@app.route('/create_post', methods=['GET', 'POST'])
@login_required # Solo usuarios logueados pueden crear posts
def create_post():
    # Asegurarse de que haya al menos una categoría para poder crear un post
    if not Category.query.first():
        flash('No hay categorías disponibles. Por favor, crea una categoría primero (ej. a través de la consola de Flask).', 'warning')
        # Puedes redirigir a una página de administración o instrucciones si tuvieras una.
        # Por ahora, redirigimos al inicio.
        return redirect(url_for('index'))

    if request.method == 'POST':
        title = request.form.get('title')
        content = request.form.get('content')
        category_name = request.form.get('category')

        if not title or not content or not category_name:
            flash('Título, contenido y categoría son obligatorios.', 'danger')
            return redirect(url_for('create_post'))

        # Obtener o crear la categoría
        category = Category.query.filter_by(name=category_name).first()
        if not category:
            # Si la categoría no existe, la creamos. Podrías querer un control más estricto.
            category = Category(name=category_name)
            db.session.add(category)
            db.session.commit() # Commitear para que la nueva categoría tenga ID
            flash(f'Nueva categoría "{category_name}" creada.', 'info')

        new_post = Post(title=title, content=content, author=current_user, category=category)
        db.session.add(new_post)
        db.session.commit()
        flash('¡Post creado exitosamente!', 'success')
        return redirect(url_for('index'))
    
    # Pasamos las categorías existentes al template para el select
    categories = Category.query.all()
    return render_template('create_post.html', title='Crear Nuevo Post', categories=categories)

@app.route('/post/<int:post_id>', methods=['GET', 'POST'])
def post_detail(post_id):
    post = Post.query.get_or_404(post_id)
    
    # Lógica para agregar un comentario
    if request.method == 'POST':
        if not current_user.is_authenticated:
            flash('Debes iniciar sesión para comentar.', 'warning')
            return redirect(url_for('login')) # O redirigir a la misma página y mostrar mensaje
        
        comment_text = request.form.get('comment_text')
        if not comment_text:
            flash('El comentario no puede estar vacío.', 'danger')
            return redirect(url_for('post_detail', post_id=post.id))
        
        new_comment = Comment(text=comment_text, author=current_user, post=post)
        db.session.add(new_comment)
        db.session.commit()
        flash('Comentario agregado exitosamente.', 'success')
        return redirect(url_for('post_detail', post_id=post.id)) # Redirigir para evitar resubmit
        
    return render_template('post_detail.html', title=post.title, post=post)

# --- Rutas de Edición y Eliminación (PLUS) ---
@app.route('/edit_post/<int:post_id>', methods=['GET', 'POST'])
@login_required
def edit_post(post_id):
    post = Post.query.get_or_404(post_id)
    # Asegúrate de que solo el autor del post pueda editarlo
    if post.author != current_user:
        flash('No tienes permiso para editar este post.', 'danger')
        return redirect(url_for('post_detail', post_id=post.id))

    if request.method == 'POST':
        post.title = request.form.get('title')
        post.content = request.form.get('content')
        category_name = request.form.get('category')

        if not post.title or not post.content or not category_name:
            flash('Título, contenido y categoría son obligatorios.', 'danger')
            return redirect(url_for('edit_post', post_id=post.id))

        # Obtener o crear la categoría (igual que en create_post)
        category = Category.query.filter_by(name=category_name).first()
        if not category:
            category = Category(name=category_name)
            db.session.add(category)
            db.session.commit()
            flash(f'Nueva categoría "{category_name}" creada.', 'info')
        
        post.category = category # Asigna la categoría al post

        db.session.commit()
        flash('¡Post actualizado exitosamente!', 'success')
        return redirect(url_for('post_detail', post_id=post.id))
    
    categories = Category.query.all()
    return render_template('create_post.html', title='Editar Post', post=post, categories=categories) # Reusamos el template de creación

@app.route('/delete_post/<int:post_id>', methods=['POST'])
@login_required
def delete_post(post_id):
    post = Post.query.get_or_404(post_id)
    if post.author != current_user:
        flash('No tienes permiso para eliminar este post.', 'danger')
        return redirect(url_for('post_detail', post_id=post.id))
    
    db.session.delete(post)
    db.session.commit()
    flash('Post eliminado exitosamente.', 'success')
    return redirect(url_for('index'))

@app.route('/delete_comment/<int:comment_id>', methods=['POST'])
@login_required
def delete_comment(comment_id):
    comment = Comment.query.get_or_404(comment_id)
    post_id = comment.post.id # Guardamos el ID del post para redirigir
    
    if comment.author != current_user and comment.post.author != current_user:
        flash('No tienes permiso para eliminar este comentario.', 'danger')
        return redirect(url_for('post_detail', post_id=post_id))
    
    db.session.delete(comment)
    db.session.commit()
    flash('Comentario eliminado exitosamente.', 'success')
    return redirect(url_for('post_detail', post_id=post_id))


# Para ejecutar la aplicación directamente
if __name__ == '__main__':
    # Esto es solo para desarrollo. En producción, usar Gunicorn o similar.
    # Puedes configurar un puerto diferente si el 5000 está ocupado: app.run(port=5001)
    app.run(debug=True)