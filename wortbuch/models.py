from datetime import datetime
from wortbuch import db, bcrypt
from flask.ext.login import UserMixin
from sqlalchemy.ext.hybrid import hybrid_property

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(64), unique=True)
    _password = db.Column(db.String(128))
    posts = db.relationship('Post', backref='author', lazy='dynamic')

    @hybrid_property
    def password(self):
        return self._password

    @password.setter
    def _set_password(self, plaintext):
        self._password = bcrypt.generate_password_hash(plaintext)

    def is_correct_password(self, plaintext):
        return bcrypt.check_password_hash(self._password, plaintext)


class Wordbook(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120), index=True, unique=True)

    def __init__(self, title):
        self.title = title


class Word(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    german = db.Column(db.String(120), index=True, unique=True)
    english = db.Column(db.String(120), index=True, unique=True)

    def __init__(self, german, english):
        self.german, self.english = german, english
