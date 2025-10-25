# schemas/user_schema.py

from marshmallow import Schema, fields, validate

ALLOWED_ROLES = ["user", "moderator", "admin"]

class UserRoleUpdateSchema(Schema):
    """Schema para validar la entrada de actualización de rol."""
    # El campo role es requerido y debe ser uno de los roles permitidos
    role = fields.Str(
        required=True,
        validate=[
            validate.OneOf(ALLOWED_ROLES, error="Rol inválido. Los roles permitidos son: {choices}."),
            # La longitud mínima es 'user' (4) y máxima es 'moderator' (9)
            validate.Length(min=4, max=10) 
        ]
    )

# Exportar la instancia
user_role_update_schema = UserRoleUpdateSchema()

class UserRegisterSchema(Schema):
    """Schema para validar los datos de entrada en el registro."""
    username = fields.Str(required=True, validate=validate.Length(min=3, max=100))
    email = fields.Email(required=True)
    password = fields.Str(required=True, validate=validate.Length(min=6))
    
    # *** 💥 CORRECCIÓN CRÍTICA: AÑADIR EL CAMPO ROLE 💥 ***
    # Se añade el campo role con un valor por defecto.
    role = fields.Str(
        required=False,
        validate=validate.OneOf(ALLOWED_ROLES, error="Rol de registro inválido."),
        load_default='user' # Si el JSON no lo envía (o envía None), se establece en 'user'
    )
    
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

class UserRoleUpdateSchema(Schema):
    """Schema para validar el cambio de rol."""
    # Lista de valores permitidos
    role = fields.Str(required=True, validate=validate.OneOf(["user", "moderator", "admin"]))

# Instancias
user_role_update_schema = UserRoleUpdateSchema()
register_schema = UserRegisterSchema()
login_schema = UserLoginSchema()
user_output_schema = UserOutputSchema()
users_output_schema = UserOutputSchema(many=True) # Para listar usuarios