from app import app, db
from models import User, Post
import os
import unittest


os.environ['DATABASE_URL'] = 'postgresql://test:pass@localhost/blogly-test'
app.config['TESTING'] = True


class TestFlask(unittest.TestCase):

    def setUp(self):
        # Push an application context before doing anything else
        self.ctx = app.app_context()
        self.ctx.push()
        db.create_all()
        self.app = app.test_client()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        # Pop the context after the test
        self.ctx.pop()

    def test_index(self):
        response = self.app.get('/', follow_redirects=True)
        self.assertEqual(response.status_code, 200)

    def test_user_routes(self):

        user = User(first_name='first_name',
                    last_name='last_name',
                    image_url=None)
        db.session.add(user)
        db.session.commit()

        response = self.app.get('/users')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"<h1>All Users</h1>", response.data)

        response = self.app.get('/users/new')
        self.assertEqual(response.status_code, 200)
        self.assertIn(b"<h1>Add User</h1>", response.data)

        response = self.app.get(f'/users/{user.id}/edit')

        self.assertEqual(response.status_code, 200)
        self.assertIn(
            f"<h1>Edit { user.first_name } { user.last_name }</h1>".encode(), response.data)

        response = self.app.get(f'/users/{user.id}')

        self.assertEqual(response.status_code, 200)
        self.assertIn(
            f"<h1>{ user.first_name } { user.last_name }</h1>".encode(), response.data)

        response = self.app.get(f'/users/{user.id}/posts/new')

        self.assertEqual(response.status_code, 200)
        self.assertIn(
            f"<h2>New Post</h2>".encode(), response.data)

    def test_post_routes(self):

        user = User(first_name='first_name',
                    last_name='last_name',
                    image_url=None)
        db.session.add(user)
        db.session.commit()
        post = Post(title='test', content='hello world', user_id=user.id)
        db.session.add(post)
        db.session.commit()

        response = self.app.get(f'/posts/{post.id}')

        self.assertEqual(response.status_code, 200)
        self.assertIn(
            f"<h2>{ post.title }</h2>".encode(), response.data)

        response = self.app.get(f'/posts/{post.id}/edit')

        self.assertEqual(response.status_code, 200)
        self.assertIn(
            f"<h2>Edit Post</h2>".encode(), response.data)


if __name__ == '__main__':
    unittest.main()
