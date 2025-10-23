from app import db
from models.models import Comment

class CommentRepository:
    
    @staticmethod
    def get_by_post_id(post_id):
        """Devuelve solo los comentarios visibles para un post."""
        return Comment.query.filter_by(post_id=post_id, is_visible=True).order_by(Comment.created_at.asc()).all()

    @staticmethod
    def get_by_id(comment_id):
        """Busca un comentario por su ID."""
        return Comment.query.get(comment_id)
        
    def create_comment(self, post_id, user_id, text):
        """Crea un nuevo comentario."""
        new_comment = Comment(
            post_id=post_id,
            user_id=user_id,
            text=text,
            is_visible=True #x default son visibles
        )
        db.session.add(new_comment)
        db.session.commit()
        return new_comment
    
    @staticmethod
    def delete_comment(comment):
        """Elimina un comentario."""
        db.session.delete(comment)
        db.session.commit()