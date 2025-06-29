from flask import Flask, flash, render_template, request
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.secret_key = "cualquiercosa"
app.config['SQLALCHEMY_DATABASE_URI'] = (
    "mysql+pymysql://root:@localhost/segundo_unificado"
)

db = SQLAlchemy(app)
migrate = Migrate(app, db)


from models import City, Climate

@app.route('/')
def index ():
    return 'Hola Mundo!'

if __name__ == '__main__':
    app.run(debug=True) 