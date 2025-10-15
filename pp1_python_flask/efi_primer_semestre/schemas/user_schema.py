# schemas/user_schema.py
from marshmallow import Schema, fields, validate

class UserRegisterSchema(Schema):
    """Schema para validar los datos de entrada en el registro."""
    username = fields.Str(required=True, validate=validate.Length(min=3, max=100))
    email = fields.Email(required=True)
    password = fields.Str(required=True, validate=validate.Length(min=6))
    
class UserLoginSchema(Schema):
    """Schema para validar los datos de entrada en el login."""
    email = fields.Email(required=True)
    password = fields.Str(required=True)

class UserOutputSchema(Schema):
    """Schema para serializar los datos de salida del Usuario."""
    id = fields.Int(dump_only=True)
    username = fields.Str(dump_only=True)
    email = fields.Email(dump_only=True)
    role = fields.Str(dump_only=True)
    is_active = fields.Bool(dump_only=True)
    created_at = fields.DateTime(dump_only=True)

# Creamos instancias de los schemas
register_schema = UserRegisterSchema()
login_schema = UserLoginSchema()
user_output_schema = UserOutputSchema()