# services/stats_service.py (Nuevo Archivo)
from repositories.stats_repository import StatsRepository

class StatsService:
    
    def __init__(self):
        self.repo = StatsRepository()

    def get_stats(self, current_user_role):
        """Genera el diccionario de estadísticas según el rol."""
        stats = {
            "total_posts": self.repo.get_total_posts(),
            "total_comments": self.repo.get_total_comments(),
            "total_users": self.repo.get_total_users()
        }
        
        # El requisito de 'posts_last_week' es solo para el administrador
        if current_user_role == 'admin':
            stats["posts_last_week"] = self.repo.get_posts_last_week()
            
        return stats