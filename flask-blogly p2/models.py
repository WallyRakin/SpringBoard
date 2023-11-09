"""Models for Blogly."""

# models.py

from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    image_url = db.Column(
        db.String, default="https://media.istockphoto.com/id/587805156/vector/profile-picture-vector-illustration.jpg?s=612x612&w=0&k=20&c=gkvLDCgsHH-8HeQe7JsjhlOY6vRBJk_sKW9lyaLgmLo=")


class Post(db.Model):
    """Blog post."""

    __tablename__ = "posts"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.Text, nullable=False)
    content = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.now(), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    user = db.relationship('User', backref='posts')

    tags = db.relationship('Tag', secondary='post_tag',
                           backref='posts', lazy=True)


class Tag(db.Model):
    """Blog tag."""

    __tablename__ = "tags"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.Text, nullable=False, unique=True)


class PostTag(db.Model):
    """Blog tag."""

    __tablename__ = "post_tag"

    post_id = db.Column(db.Integer, db.ForeignKey(
        'posts.id'), nullable=False, primary_key=True)
    tag_id = db.Column(db.Integer, db.ForeignKey(
        'tags.id'), nullable=False, primary_key=True)


def connect_db(app):
    """Connect this database to a Flask app."""
    db.app = app
    db.init_app(app)
