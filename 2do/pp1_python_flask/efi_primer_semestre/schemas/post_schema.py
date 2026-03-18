from marshmallow import Schema, fields, validate

# --- Schemas de Entrada (Input) ---
class PostInputSchema(Schema):
    """Schema para validar la entrada de creación/edición de Posts."""
    title = fields.Str(required=True, validate=validate.Length(min=5, max=128))
    content = fields.Str(required=True, validate=validate.Length(min=10))
    category_name = fields.Str(required=True, data_key="category", # mapea 'category' de JSON a 'category_name'
                               validate=validate.Length(min=3, max=64))
    is_published = fields.Bool(load_default=True)

# --- Schemas de Salida (Output) ---
class PostAuthorSchema(Schema):
    """Mini-Schema para el autor del post."""
    id = fields.Int(dump_only=True)
    username = fields.Str(dump_only=True)
    email = fields.Email(dump_only=True)

class PostOutputSchema(Schema):
    """Schema para serializar un Post con información completa."""
    id = fields.Int(dump_only=True)
    title = fields.Str(dump_only=True)
    content = fields.Str(dump_only=True)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)
    is_published = fields.Bool(dump_only=True)
    
    # Serialización de relaciones
    author = fields.Nested(PostAuthorSchema, dump_only=True)
    category_name = fields.Str(attribute="category.name", dump_only=True) # obtiene el nombre de la categoría 
    comments_count = fields.Method("get_comments_count", dump_only=True)
    
    def get_comments_count(self, obj):
        return obj.comments.count()

# Instancias
post_input_schema = PostInputSchema()
post_output_schema = PostOutputSchema()
posts_output_schema = PostOutputSchema(many=True) # para listar multiples posts