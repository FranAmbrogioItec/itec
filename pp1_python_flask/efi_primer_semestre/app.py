from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime

#inicializo la app flask
app = Flask(__name__) 

app.secret_key = "0044295023"
app.config['SQLALCHEMY_DATABASE_URI'] = (
    "mysql+pymysql://flaskuser:0044295023@localhost/database_efi"
    )

db = SQLAlchemy(app)    
migrate = Migrate(app, db)
login_manager = LoginManager(app)
login_manager.init_app(app)
login_manager.login_view = 'login' #vista para redirigir si no esta logueado

from models import User, Category, Post, Comment

# --- Flask-Login User Loader ---
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# --- Context Processor ---
# Proporciona la lista de categorías a todas las plantillas
@app.context_processor
def inject_categories():
    return dict(all_categories=Category.query.all())



# --------------------------------------- Rutas / Vistas ---------------------------------------
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


# --------------------------------------- Ruta Registro ---------------------------------------
@app.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated: #si el usuario esta logueado
        return redirect(url_for('index'))
    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')

        user = User.query.filter_by(username=username).first() #busca si el usuario ya existe en la base de datos y valida para que no se repita
        if user:
            flash('El nombre de usuario ya existe. Por favor, elige otro.', 'danger')
            return redirect(url_for('register'))

        user = User.query.filter_by(email=email).first() #si el correo ya esta registrado
        if user:
            flash('El correo electrónico ya está registrado.', 'danger')
            return redirect(url_for('register'))

        new_user = User(username=username, email=email) #crea el nuevo usuario
        new_user.set_password(password)
        db.session.add(new_user)
        db.session.commit()
        flash('¡Registro exitoso! Ya puedes iniciar sesión.', 'success')
        return redirect(url_for('login'))
    return render_template('auth/register.html', title='Registro')


# --------------------------------------- Ruta Login ---------------------------------------
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
    return render_template('auth/login.html', title='Iniciar Sesión')


# --------------------------------------- Ruta Logout ---------------------------------------
@app.route('/logout')
@login_required
def logout():
    logout_user()
    flash('Has cerrado sesión.', 'info')
    return redirect(url_for('index'))


# --------------------------------------- Ruta Crear Post ---------------------------------------
@app.route('/create_post', methods=['GET', 'POST'])
@login_required #solo usuarios logueados pueden crear posts
def create_post():
    if request.method == 'POST':
        title = request.form.get('title').strip()
        content = request.form.get('content').strip()
        category_name = request.form.get('category').strip()

        if not title or not content or not category_name:
            flash('Título, contenido y categoría son obligatorios.', 'danger')
            return redirect(url_for('create_post'))

        # Buscar categoría (ignorando mayúsculas/minúsculas, opcional)
        category = Category.query.filter(db.func.lower(Category.name) == category_name.lower()).first()

        if not category:
            # Crear nueva categoría
            category = Category(name=category_name)
            db.session.add(category)
            db.session.commit()
            flash(f'Nueva categoría "{category_name}" creada.', 'info')

        # Crear el post
        new_post = Post(
            title=title,
            content=content,
            author=current_user,
            category=category
        )
        db.session.add(new_post)
        db.session.commit()

        flash('¡Post creado exitosamente!', 'success')
        return redirect(url_for('index'))

    # Obtener categorías existentes para sugerencias
    categories = Category.query.order_by(Category.name).all()
    return render_template('create_post.html', title='Crear Nuevo Post', categories=categories)



# --------------------------------------- Ruta Detalle Post ---------------------------------------
@app.route('/post/<int:post_id>', methods=['GET', 'POST'])
def post_detail(post_id):
    post = Post.query.get_or_404(post_id)
    
    if request.method == 'POST':
        if not current_user.is_authenticated:
            flash('Debes iniciar sesión para comentar.', 'warning')
            return redirect(url_for('login'))
        
        comment_text = request.form.get('comment_text')
        if not comment_text:
            flash('El comentario no puede estar vacío.', 'danger')
            return redirect(url_for('post_detail', post_id=post.id))
        
        new_comment = Comment(text=comment_text, author=current_user, post=post)
        db.session.add(new_comment)
        db.session.commit()
        flash('Comentario agregado exitosamente.', 'success')
        return redirect(url_for('post_detail', post_id=post.id))
    
    comments = post.comments.order_by(Comment.created_at.asc()).all()

    return render_template('post_detail.html', title=post.title, post=post, comments=comments)


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


# --- Rutas de Edición y Eliminación (PLUS) ---
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


# --- Rutas de Edición y Eliminación (PLUS) ---
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


# Para ejecutar la aplicación
if __name__ == '__main__':
    app.run(debug=True)