from flask import jsonify
from flask.views import MethodView
from decorators.auth_decorators import roles_required 
from services.analytics_service import AnalyticsService

class AnalyticsSummaryAPI(MethodView):
    """
    GET /api/admin/stats - Obtiene estadísticas clave del sistema.
    """
    def __init__(self):
        self.service = AnalyticsService()

    @roles_required("admin") 
    def get(self):
        """Devuelve un resumen de estadísticas del sistema."""
        try:
            stats = self.service.get_summary_stats()
            
            # Nota: No necesitamos un schema de Marshmallow si el dict es simple
            return jsonify({
                "message": "Estadísticas cargadas exitosamente.",
                "stats": stats
            }), 200
            
        except Exception as e:
            return jsonify({"message": f"Error al cargar estadísticas: {str(e)}"}), 500