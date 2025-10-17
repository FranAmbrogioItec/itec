# services/post_service.py
from repositories.post_repository import PostRepository

class PostService:
    
    def __init__(self):
        self.repo = PostRepository()

    def get_public_posts(self):
        """Obtiene la lista de posts públicos."""
        return self.repo.get_all_published()

    def get_post_detail(self, post_id):
        """Obtiene un post específico. Podrías agregar aquí lógica si el post no está publicado."""
        post = self.repo.get_by_id(post_id)
        if post and post.is_published:
            return post
        # Opcional: Si es admin o moderador, podría verlo aunque no esté publicado.
        # Por ahora, solo devolvemos los publicados para público.
        return None 

    def create_new_post(self, user_id, data):
        """Crea un nuevo post."""
        # La validación ya se hizo con Marshmallow en la vista
        return self.repo.create_post(
            user_id,
            data['title'],
            data['content'],
            data['category_name'],
            data['is_published']
        )
    
    def update_existing_post(self, post_id, current_user_id, data, check_ownership_func):
        """
        Actualiza un post, chequeando el permiso de propiedad o admin.
        
        :param check_ownership_func: Función de decorador para la verificación de permisos.
        """
        post = self.repo.get_by_id(post_id)
        if not post:
            raise ValueError("Post no encontrado.")
            
        # Verificar la propiedad usando la función del decorador
        if not check_ownership_func(post.user_id):
            raise PermissionError("Acceso denegado. No eres el autor ni un administrador.")

        # Lógica de actualización delegada al repositorio
        return self.repo.update_post(
            post,
            data['title'],
            data['content'],
            data['category_name'],
            data['is_published']
        )

    def delete_post_by_id(self, post_id, check_ownership_func):
        """Elimina un post, chequeando el permiso de propiedad o admin."""
        post = self.repo.get_by_id(post_id)
        if not post:
            raise ValueError("Post no encontrado.")

        # Verificar la propiedad
        if not check_ownership_func(post.user_id):
            # El requerimiento dice: "Solo el autor o admin". Los moderadores no pueden borrar posts.
            raise PermissionError("Acceso denegado. Solo el autor o el administrador pueden eliminar este post.")
        
        self.repo.delete_post(post)