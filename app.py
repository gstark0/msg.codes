from flask import Flask, render_template, request, redirect, abort
import sqlite3
import random
import string
import json
import requests

db_name = 'database.db'

app = Flask(__name__)

g_secret = '6Ld44cMUAAAAAOjyxpHLSPseZhPnTht-DXZKQOj_'

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

@app.route('/<link_id>/send', methods=['POST'])
def send_message(link_id):
    data = request.get_json()
    r = requests.post('https://www.google.com/recaptcha/api/siteverify', data={'secret': g_secret, 'response': data['captcha']})
    g_response = r.json()
    if g_response['score'] < 0.6:
        return abort(500)
    return json.dumps('sent')

@app.route('/<link_id>')
def contact(link_id):
    # Get link_id from the url
    # Get db record by link_url
    # Render contact page with contact data
    print(link_id)
    with sqlite3.connect(db_name) as conn:
        cur = conn.cursor()
        cur.execute('SELECT name, email FROM links WHERE link_id=?', (link_id,))
        contact_data = cur.fetchall()
        if len(contact_data) > 0:
            return render_template('contact.html', name=contact_data[0][0], link_id=link_id)
    return redirect('/')

# This is to ensure that GET /favicon.ico won't call contact function
@app.route('/favicon.ico')
def icon_route():
    return redirect('/static/favicon.ico')

@app.route('/')
def main():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0')