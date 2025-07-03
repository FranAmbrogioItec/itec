from flask import Flask, flash, render_template, request
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, UserMixin, login_user, login_required, logout_user, current_user
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

app.secret_key = "cualquiercosa"
app.config['SQLALCHEMY_DATABASE_URI'] = (
    "mysql+pymysql://flask_user:una_contraseña_segura@localhost/database_efi"
)

db = SQLAlchemy(app)
migrate = Migrate(app, db)

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

from models import City, Climate, User

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
def index():
    return render_template(
        'index.html'
    )


@app.route('/login', methods=['POST', 'GET'])
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]

        user = User.query.filter_by(username=username).first()
        if user and check_password_hash(user.password_hash, password):
            login_user(user)
            return redirect(url_for('index'))
        else:
            flash("Invalid username or password", "danger")
            return redirect(url_for('login'))
    return render_template('auth/login.html')

@app.route('/logout')
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route('/register', methods=['POST', 'GET'])
def register():
    if request.method == "POST":
        username = request.form["username"]
        email = request.form["email"]
        password = request.form["password"]

        new_user = User(
            username=username,
            email=email,
            password_hash=generate_password_hash(password)
        )
        db.session.add(new_user)
        db.session.commit()
        flash("User registered succefully", "success")
        return redirect(url_for('login'))
    return render_template('auth/register.html')

""" @app.route('/register', methods=['POST', 'GET'])
@login_required
def register():
    return render_template('auth/register.html')
 """


@app.route('/city', methods=['POST', 'GET'])
def city():
    if request.method == "POST":
        name = request.form["name"]
        latitude = request.form["lat"]
        longitude = request.form["long"]

        new_city = City(name=name, lat=latitude, long=longitude)
        db.session.add(new_city)
        db.session.commit()
        flash("City added succefully", "success")


    cities_list = City.query.all()
    return render_template(
        'city.html',
        cities=cities_list # nombre en html = nombre en back
    )


@app.route('/city/<int:city_id>')
def city_detail(city_id):
    city = City.query.get_or_404(city_id)
    return render_template(
        'city_detail.html', 
        city=city, 
    )

@app.route('/city/<int:city_id>/get_current_climate')
def get_current_climate(city_id):
    city = City.query.get_or_404(city_id)
    url = f"https://api.open-meteo.com/v1/forecast?latitude={city.lat}&longitude={city.long}&timezone=auto&current_weather=true"
    data = requests.get(url=url).json()
    clima_actual = Climate(
        ciudad_id=city_id,
        date=datetime.now(),
        temperature=data['current_weather']['temperature'],
        windspeed=data['current_weather']['windspeed'],
        winddirection=data['current_weather']['winddirection'],
    )
    db.session.add(clima_actual)
    db.session.commit()

    return redirect(
        url_for(
            'city_detail',
            city_id=city_id
        )
    )




if __name__ == '__main__':
    app.run(debug=True)