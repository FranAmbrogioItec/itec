from flask import request, jsonify
from flask.views import MethodView
from marshmallow import ValidationError
from decorators.auth_decorators import roles_required
from services.category_service import CategoryService
from schemas.category_schema import category_input_schema, categories_output_schema, category_output_schema

class CategoryListAPI(MethodView):
    """
    GET /api/categories - Listar categorías (Público)
    POST /api/categories - Crear una nueva categoría (Moderator+)
    """
    def __init__(self):
        self.category_service = CategoryService()

    # GET /api/categories (Público)
    def get(self):
        """Listar todas las categorías."""
        categories = self.category_service.get_all_categories()
        result = categories_output_schema.dump(categories)
        return jsonify(result), 200

    # POST /api/categories (Solo moderator y admin)
    @roles_required("moderator", "admin")
    def post(self):
        """Crear una nueva categoría."""
        try:
            data = category_input_schema.load(request.json)
        except ValidationError as err:
            return jsonify({"errors": err.messages}), 400

        try:
            new_category = self.category_service.create_new_category(data)
            return jsonify({
                "message": "Categoría creada exitosamente.",
                "category": category_output_schema.dump(new_category)
            }), 201
        except ValueError as e:
            return jsonify({"message": str(e)}), 409
        except Exception as e:
            return jsonify({"message": f"Error al crear la categoría: {str(e)}"}), 500


class CategoryDetailAPI(MethodView):
    """
    PUT /api/categories/<id> - Editar categoría (Moderator+)
    DELETE /api/categories/<id> - Eliminar categoría (Solo Admin)
    """
    def __init__(self):
        self.category_service = CategoryService()

    # PUT /api/categories/<id> (Solo moderator y admin)
    @roles_required("moderator", "admin")
    def put(self, category_id):
        """Editar una categoría existente."""
        try:
            data = category_input_schema.load(request.json)
        except ValidationError as err:
            return jsonify({"errors": err.messages}), 400

        try:
            updated_category = self.category_service.update_existing_category(category_id, data)
            
            return jsonify({
                "message": "Categoría actualizada exitosamente.",
                "category": category_output_schema.dump(updated_category)
            }), 200
            
        except ValueError as e:
            return jsonify({"message": str(e)}), 404
        except Exception as e:
            return jsonify({"message": f"Error al actualizar la categoría: {str(e)}"}), 500

    # DELETE /api/categories/<id> (Solo admin)
    @roles_required("admin")
    def delete(self, category_id):
        """Eliminar una categoría (Solo Admin)."""
        try:
            self.category_service.delete_category_by_id(category_id)
            
            return jsonify({"message": "Categoría eliminada exitosamente."}), 204
            
        except ValueError as e:
            return jsonify({"message": str(e)}), 404
        except Exception as e:
            return jsonify({"message": f"Error al eliminar la categoría: {str(e)}"}), 500