from app import db
from models.models import Post, Category

class PostRepository:
    
    @staticmethod
    def get_all_published():
        """Devuelve todos los posts publicados."""
        return Post.query.filter_by(is_published=True).order_by(Post.created_at.desc()).all()

    @staticmethod
    def get_by_id(post_id):
        """Busca un post por su ID."""
        return Post.query.get(post_id)

    @staticmethod
    def get_category_by_name(name):
        """Busca o crea una categoría por nombre (lógica simple de Category)."""
        category = Category.query.filter_by(name=name).first()
        if not category:
            category = Category(name=name)
            db.session.add(category)
        return category

    def create_post(self, user_id, title, content, category_name, is_published=True):
        """Crea un post y gestiona su categoría."""
        category = self.get_category_by_name(category_name)

        new_post = Post(
            user_id=user_id,
            title=title,
            content=content,
            category=category,
            is_published=is_published
        )
        db.session.add(new_post)
        db.session.commit()
        return new_post
    
    def update_post(self, post, title, content, category_name, is_published):
        """Actualiza un post existente."""
        category = self.get_category_by_name(category_name)
        
        post.title = title
        post.content = content
        post.category = category
        post.is_published = is_published
        # updated_at se actualiza automáticamente en el modelo
        
        db.session.commit()
        return post

    @staticmethod
    def delete_post(post):
        """Elimina un post."""
        db.session.delete(post)
        db.session.commit()