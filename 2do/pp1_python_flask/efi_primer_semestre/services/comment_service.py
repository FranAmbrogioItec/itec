from repositories.comment_repository import CommentRepository
from flask_jwt_extended import get_jwt
from models.models import Post

class CommentService:
    
    def __init__(self):
        self.repo = CommentRepository()

    def get_post_comments(self, post_id):
        """Obtiene la lista de comentarios de un post."""
        return self.repo.get_by_post_id(post_id)

    def create_new_comment(self, post_id, user_id, data):
        """Crea un nuevo comentario para un post."""
        
        # verifica si el post ya existe (usando el modelo)
        post_exists = Post.query.get(post_id) 
        if post_exists is None:
            # si no existe, lanza un error
            raise ValueError(f"Post con ID {post_id} no encontrado.") 

        # si todo esta bien, crea el comentario
        return self.repo.create_comment(
            post_id,
            user_id,
            data['text']
        )
    
    def delete_comment_by_id(self, comment_id):
        """
        Elimina un comentario. Permite al autor, moderador o administrador eliminarlo.
        """
        comment = self.repo.get_by_id(comment_id)
        if not comment:
            raise ValueError("Comentario no encontrado.")
            
        claims = get_jwt()
        current_user_id = claims.get("user_id")
        current_user_role = claims.get("role")
        
        # Lógica de permisos para eliminar:
        # 1. Autor (user+)
        # 2. Moderador (moderator+)
        # 3. Administrador (admin)
        
        is_owner = current_user_id == comment.user_id
        is_privileged = current_user_role in ['moderator', 'admin']
        
        if not is_owner and not is_privileged:
            # Los moderadores solo pueden eliminar comentarios, no posts.
            raise PermissionError("Acceso denegado. Solo el autor, moderador o administrador pueden eliminar este comentario.")

        self.repo.delete_comment(comment)