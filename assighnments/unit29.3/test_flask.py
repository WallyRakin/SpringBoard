from unittest import TestCase

from app import app
from models import db, Cupcake
from flask import json, jsonify

app.config['WTF_CSRF_ENABLED'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///sqla_intro_test5'
app.config['SQLALCHEMY_ECHO'] = False


with app.app_context():
    db.drop_all()
    db.create_all()


class CupcakesTestCase(TestCase):
    """Tests for views for Cupcakes."""
    def setUp(self):
        """Clean up any existing Cupcake."""
        with app.app_context():
            with app.test_client() as client:
                db.drop_all()
                db.create_all()
                db.session.commit()
                self.client = app.test_client()
                db.session.add_all([Cupcake(flavor="Vanilla", size=2, rating=0,
                                            image="https://via.placeholder.com/75"),
                                    Cupcake(flavor="Chocolate", size=1,
                                               rating=0,
                                               image="https://tinyurl.com/demo-cupcake"),
                                    Cupcake(flavor="Strawberry", size=5,
                                               rating=0,
                                               image="https://via.placeholder.com/150"),
                                    Cupcake(flavor="Orange", size=2,
                                            rating=0),
                                    Cupcake(flavor="Lemon", size=0, rating=0,
                                            image="https://tinyurl.com/demo-cupcake"),
                                    Cupcake(flavor="Mint", size=3, rating=0,
                                            image="https://via.placeholder.com/150")])
                db.session.commit()

    def tearDown(self):
        """Clean up any fouled transaction."""
        with app.app_context():
            with app.test_client() as client:
                db.session.rollback()

    def test_get(self):
        """Check for valid Cupcake"""
        with app.app_context():
            with app.test_client() as client:
                resp = client.get("/api/cupcakes")
                html = resp.get_data(as_text=True)
                self.assertEqual(resp.status_code, 200)
                self.assertIn('''Lemon''', html)

    def test_cupcake_page(self):
        """Check that index does not populate cupcake page initially"""
        with app.app_context():
            with app.test_client() as client:
                resp = client.get("/")
                html = resp.get_data(as_text=True)
                self.assertEqual(resp.status_code, 200)
                self.assertNotIn("data-id", html)

    def test_cupcake_add(self):
        """Check cupcake can be added then queried"""
        with app.app_context():
            with app.test_client() as client:
                resp = client.post("/api/cupcakes", data=dict({
                    "flavor": "NewFlavor",
                    "size": "2",
                    "image": "https://via.placeholder.com/150",
                    "rating": 10
                }), follow_redirects=True)
                self.assertEqual(resp.status_code, 201)
                resp = client.get("/api/cupcakes/7")
                html = resp.get_data(as_text=True)
                self.assertEqual(resp.status_code, 200)
                self.assertIn('''"id": 7''', html)

    def test_cupcake_delete(self):
        """Check cupcake can be deleted successfully"""
        with app.app_context():
            with app.test_client() as client:
                resp = client.post("/api/cupcakes", data=dict({
                    "flavor": "NewFlavor",
                    "size": "2",
                    "image": "https://via.placeholder.com/150",
                    "rating": 10
                }), follow_redirects=True)
                self.assertEqual(resp.status_code, 201)
                resp = client.delete("/api/cupcakes/7")
                html = resp.get_data(as_text=True)
                self.assertEqual(resp.status_code, 200)
                self.assertIn('''"Deleted": "7"''', html)
                resp = client.get("/api/cupcakes/7")
                html = resp.get_data(as_text=True)
                self.assertEqual(resp.status_code, 404)

    def test_cupcake_notfound(self):
        """Check cupcake cannot be found"""
        with app.app_context():
            with app.test_client() as client:
                resp = client.get("/api/cupcakes/7")
                html = resp.get_data(as_text=True)
                self.assertEqual(resp.status_code, 404)

    def test_cupcake_edit(self):
        """Check cupcake can be edited"""
        with app.app_context():
            with app.test_client() as client:
                resp = client.patch("/api/cupcakes/6", data=dict({
                    "flavor": "NewFlavor",
                    "size": "XXL",
                    "image": "https://via.placeholder.com/150",
                    "rating": 10
                }), follow_redirects=True)
                self.assertEqual(resp.status_code, 200)
                resp = client.get("/api/cupcakes/6")
                html = resp.get_data(as_text=True)
                self.assertEqual(resp.status_code, 200)
                self.assertIn('''"size": "XXL"''', html)
                self.assertIn('''id": 6''', html)

                resp = client.get("/api/cupcakes/1")
                html = resp.get_data(as_text=True)
                self.assertEqual(resp.status_code, 200)
