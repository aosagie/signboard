from flask import Flask, g, render_template
import sqlite3

app = Flask(__name__)
DATABASE = "static/db/database.db"


@app.before_request
def before_request():
    g.db = sqlite3.connect(DATABASE)


@app.teardown_request
def teardown_request(exception):
    if hasattr(g, 'db'):
        g.db.close()


@app.route("/")
def index():
    return render_template("signboard.html")


if __name__ == "__main__":
    app.run(debug=True)
