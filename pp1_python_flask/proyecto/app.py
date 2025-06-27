from flask import Flask

app = Flask(__name__)

@app.route('/')
def index ():
    return 'Hello World! Welcome to my Flask app'

if __name__ == '__main__':
    app.run(debug=True) 