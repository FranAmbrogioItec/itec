from marshmallow import Schema, fields, validate

# --- Schemas de Entrada (Input) ---
class CommentInputSchema(Schema):
    """Schema para validar la entrada al crear un comentario."""
    text = fields.Str(required=True, validate=validate.Length(min=5, max=500))

# --- Schemas de Salida (Output) ---
class CommentAuthorSchema(Schema):
    """Mini-Schema para el autor del comentario."""
    id = fields.Int(dump_only=True)
    username = fields.Str(dump_only=True)
    
class CommentOutputSchema(Schema):
    """Schema para serializar un Comentario."""
    id = fields.Int(dump_only=True)
    text = fields.Str(dump_only=True)
    created_at = fields.DateTime(dump_only=True)
    is_visible = fields.Bool(dump_only=True) # Para moderacion
    
    author = fields.Nested(CommentAuthorSchema, dump_only=True)
    post_id = fields.Int(dump_only=True)

# Instancias
comment_input_schema = CommentInputSchema()
comment_output_schema = CommentOutputSchema()
comments_output_schema = CommentOutputSchema(many=True)