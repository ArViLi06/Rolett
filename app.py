from flask import Flask, render_template, redirect, url_for
from routes.spin import spin_bp

app = Flask(__name__)

app.register_blueprint(spin_bp)

@app.route('/')
def home():
    return redirect(url_for('spin.spin'))

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8001, debug=True)