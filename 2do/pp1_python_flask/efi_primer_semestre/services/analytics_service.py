from repositories.user_repository import UserRepository
from repositories.post_repository import PostRepository
from repositories.category_repository import CategoryRepository
from repositories.comment_repository import CommentRepository

class AnalyticsService:
    def __init__(self):
        self.user_repo = UserRepository()
        self.post_repo = PostRepository()
        self.category_repo = CategoryRepository()
        self.comment_repo = CommentRepository() 

    def get_summary_stats(self):
        """
        Recopila métricas clave del sistema.
        """
        total_users = self.user_repo.count_all()
        total_posts = self.post_repo.count_all()
        total_categories = self.category_repo.count_all()
        total_comments = self.comment_repo.count_all()
        
        # Contar posts publicados vs. no publicados
        total_published_posts = self.post_repo.count_published()

        return {
            "total_users": total_users,
            "total_posts": total_posts,
            "total_categories": total_categories,
            "published_posts": total_published_posts,
            "total_comments": total_comments
        }
    