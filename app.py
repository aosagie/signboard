#!/usr/bin/env python

from flask import Flask, g, render_template, jsonify
# Creating a simple de-normalized, json-based database on top of a RDBMS
import sqlite3
import json


app = Flask(__name__)
DATABASE = 'db/database.sqlite'
sqlite3.register_converter("json", json.loads)


@app.route('/')
def index():
    return render_template('signboard.html')


@app.route('/boards/<int:id>', methods=['GET'])
def boards(id):
    return jsonify({'id': id})


@app.before_request
def before_request():
    g.db = connect_db()


@app.teardown_request
def teardown_request(exception):
    if hasattr(g, 'db'):
        g.db.close()


def connect_db():
    return sqlite3.connect(DATABASE, detect_types=sqlite3.PARSE_DECLTYPES, row_factory=sqlite3.Row)


def init_db():
    from contextlib import closing

    with closing(sqlite3.connect(DATABASE)) as db:
        with app.open_resource('db/schema.sql') as schema:
            db.executescript(schema.read())
            with open('db/signboard.json') as data:
                db.execute('INSERT INTO boards(data) VALUES (?)', (data.read(),))
        db.commit()


if __name__ == '__main__':
    app.run(debug=True)
