# schemas/category_schema.py
from marshmallow import Schema, fields, validate

# --- Schemas de Entrada (Input) ---
class CategoryInputSchema(Schema):
    """Schema para validar la entrada de creación/edición de categorías."""
    name = fields.Str(required=True, validate=validate.Length(min=3, max=64))
    
# --- Schemas de Salida (Output) ---
class CategoryOutputSchema(Schema):
    """Schema para serializar una Categoría."""
    id = fields.Int(dump_only=True)
    name = fields.Str(dump_only=True)
    posts_count = fields.Method("get_posts_count", dump_only=True)

    def get_posts_count(self, obj):
        return obj.posts.count()

# Instancias
category_input_schema = CategoryInputSchema()
category_output_schema = CategoryOutputSchema()
categories_output_schema = CategoryOutputSchema(many=True)