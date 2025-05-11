from flask import Flask, render_template

app = Flask(__name__) #__main__ tmb deberia ser lo mismo, es para inicializar la app del enviroment 

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/about')
def acerca():
    return render_template('acerca_de.html')
