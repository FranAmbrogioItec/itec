from repositories.post_repository import PostRepository

class PostService:
    
    def __init__(self):
        self.repo = PostRepository()

    def get_public_posts(self):
        """Obtiene la lista de posts públicos."""
        return self.repo.get_all_published()

    def get_post_detail(self, post_id):
        """Obtiene un post específico."""
        post = self.repo.get_by_id(post_id)
        if post and post.is_published:
            return post
        # si no es público o no existe, retorna None
        return None 

    def create_new_post(self, user_id, data):
        """Crea un nuevo post."""
        # validacion previa con marshmallow ya realizada en la vista
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

        # logica de actualizacion
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
            # solo el autor y el admin pueden eliminar el post
            raise PermissionError("Acceso denegado. Solo el autor o el administrador pueden eliminar este post.")
        
        self.repo.delete_post(post)