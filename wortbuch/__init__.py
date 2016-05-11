from flask import Flask
from flask_login import LoginManager
from flask_wtf.csrf import CsrfProtect
from flask.ext.sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_object('config')

lm = LoginManager()
lm.init_app(app)
lm.login_view = 'login'

CsrfProtect(app)

db = SQLAlchemy(app)

from wortbuch import views
