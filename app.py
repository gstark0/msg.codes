from flask import Flask, render_template, request
import sqlite3

db_name = 'database.db'

app = Flask(__name__)

@app.route('/link', methods=['POST'])
def add_link():
    data = request.get_json()

    return 'ok'

@app.route('/')
def main():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0')