from flask import Flask, render_template
from models import(
    db,
    User,
)

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://BD2021:BD2021itec@143.198.156.171:3306/movies_pp1'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db.init_app(app)


@app.route('/users')
def Users():
    users = User.query.all()
    return [
        {
            "user": user.name,
            "email": user.email,
        }for user in users
    ]


if __name__ == '__main__':
    app.run(debug=True,
    port=3000)