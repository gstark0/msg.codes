from flask import Flask, render_template, request
import sqlite3
import random
import string
import json

db_name = 'database.db'

app = Flask(__name__)

# Generate 6-digit ID
def generate_id():
    return ''.join([random.choice(string.ascii_letters + string.digits) for n in range(6)])

@app.route('/link', methods=['POST'])
def add_link():
    data = request.get_json()
    
    # Insert new data into database
    with sqlite3.connect(db_name) as conn:
        cur = conn.cursor()
        link_id = generate_id()
        cur.execute('INSERT into links (link_id, name, email) VALUES (?, ?, ?)', (link_id, data['name'], data['email']))
        conn.commit()
        return json.dumps({'link_id': link_id})

@app.route('/')
def main():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0')