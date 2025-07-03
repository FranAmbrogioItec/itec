import os

class Config:
    # Clave secreta para proteger las sesiones de usuario
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'una_cadena_secreta_muy_dificil_de_adivinar'

    # Configuración de la base de datos MySQL
    # ¡IMPORTANTE! Reemplaza 'tu_usuario_mysql', 'tu_contraseña_mysql',
    # 'tu_host_mysql' y 'nombre_de_tu_db' con tus propios datos de MySQL.
    # Si usas Docker para MySQL, 'tu_host_mysql' podría ser el nombre del servicio Docker.
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
        "mysql+pymysql://flaskuser:flaskpass@localhost/database_efi"
    SQLALCHEMY_TRACK_MODIFICATIONS = False # Desactiva el seguimiento de modificaciones de objetos de SQLAlchemy (consume recursos)