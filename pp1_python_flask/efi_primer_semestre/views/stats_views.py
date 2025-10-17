# views/stats_views.py (Nuevo Archivo)
from flask import jsonify
from flask.views import MethodView
from flask_jwt_extended import get_jwt
from decorators.auth_decorators import roles_required
from services.stats_service import StatsService

class StatsAPI(MethodView):
    """
    GET /api/stats - Ver estadísticas (Moderator y admin)
    """
    def __init__(self):
        self.stats_service = StatsService()

    # GET /api/stats (Moderator y admin)
    @roles_required("moderator", "admin")
    def get(self):
        """Devuelve las estadísticas del sistema."""
        claims = get_jwt()
        current_user_role = claims.get("role")
        
        stats = self.stats_service.get_stats(current_user_role)
        
        return jsonify(stats), 200