from app import db
from models.models import Post, Comment, User
from datetime import datetime, timedelta
from sqlalchemy import func

class StatsRepository:
    
    @staticmethod
    def get_total_posts():
        return Post.query.count()

    @staticmethod
    def get_total_comments():
        return Comment.query.count()

    @staticmethod
    def get_total_users():
        return User.query.count()

    @staticmethod
    def get_posts_last_week():
        """Cuenta los posts creados en los últimos 7 días."""
        last_week = datetime.utcnow() - timedelta(days=7)
        return Post.query.filter(Post.created_at >= last_week).count()
    