# app.py

from sqlalchemy.exc import IntegrityError
from flask import Flask, request, render_template, redirect
# from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, User, Post, Tag, PostTag

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://test:pass@localhost/blogly'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "oh-so-secret"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False

# toolbar = DebugToolbarExtension(app)

connect_db(app)

# ... (your other imports and configurations)

if __name__ == '__main__':
    with app.app_context():
        # db.drop_all()
        db.create_all()


# Routes


@app.route('/')
def home():
    return redirect('/users')


@app.route('/users')
def list_users():
    users = User.query.all()
    return render_template('users.html', users=users)


@app.route('/users/new', methods=['GET', 'POST'])
def create_user():
    if request.method == 'POST':
        first_name = request.form['first_name']
        last_name = request.form['last_name']
        image_url = request.form['image_url'] or None

        new_user = User(first_name=first_name,
                        last_name=last_name, image_url=image_url)
        db.session.add(new_user)
        db.session.commit()

        return redirect('/users')

    return render_template('new.html')


@app.route('/users/<int:user_id>')
def show_user(user_id):
    user = User.query.get_or_404(user_id)
    return render_template('detail.html', user=user)


@app.route('/users/<int:user_id>/edit', methods=['GET', 'POST'])
def edit_user(user_id):
    user = User.query.get_or_404(user_id)

    if request.method == 'POST':
        user.first_name = request.form['first_name']
        user.last_name = request.form['last_name']
        user.image_url = request.form['image_url'] or None

        db.session.commit()

        return redirect(f'/users/{user_id}')

    return render_template('edit.html', user=user)


# ... (other imports and configurations)

@app.route('/users/<int:user_id>/posts/new', methods=['GET', 'POST'])
def new_post(user_id):
    """Add a new post for the user."""
    if request.method == 'POST':
        title = request.form['title']
        content = request.form['content']
        post = Post(title=title, content=content, user_id=user_id)
        # Get list of selected tag IDs
        selected_tags = request.form.getlist('tags')

        # Add tags to the post
        for tag_id in selected_tags:
            tag = Tag.query.get(tag_id)
            if tag:
                post.tags.append(tag)

        db.session.add(post)
        db.session.commit()
        return redirect(f"/users/{user_id}")

    tags = Tag.query.all()

    return render_template('new_post.html', user_id=user_id, tags=tags)


@app.route('/posts/<int:post_id>')
def post_detail(post_id):
    """Show post detail."""
    post = Post.query.get_or_404(post_id)
    return render_template('post_detail.html', post=post)


@app.route('/posts/<int:post_id>/edit', methods=['GET', 'POST'])
def edit_post(post_id):
    """Edit a post."""
    post = Post.query.get_or_404(post_id)
    if request.method == 'POST':
        post.title = request.form['title']
        post.content = request.form['content']

        # Get list of selected tag IDs
        selected_tags = request.form.getlist('tags')

        # Add tags to the post
        post.tags = []
        for tag_id in selected_tags:
            tag = Tag.query.get(tag_id)
            if tag:
                post.tags.append(tag)

        db.session.commit()
        return redirect(f"/posts/{post_id}")

    tags = Tag.query.all()

    return render_template('edit_post.html', post=post, tags=tags)


@app.route('/posts/<int:post_id>/delete', methods=['GET'])
def delete_post(post_id):
    """Delete a post."""
    post = Post.query.get_or_404(post_id)
    db.session.delete(post)
    db.session.commit()
    return redirect(f"/users/{post.user_id}")


@app.route('/tags')
def list_tags():
    tags = Tag.query.all()
    return render_template('tags.html', tags=tags)


@app.route('/tags/new', methods=['GET', 'POST'])
def create_tag():
    if request.method == 'POST':
        name = request.form['name']

        new_tag = Tag(name=name)
        db.session.add(new_tag)
        try:
            db.session.commit()
        except IntegrityError:
            db.session.rollback()
            # Should flash a message but too lazy lol

        return redirect('/tags')

    return render_template('new_tag.html')


@app.route('/tags/<int:tag_id>')
def tag_detail(tag_id):
    """Show tag detail."""
    tag = Tag.query.get_or_404(tag_id)
    return render_template('tag_detail.html', tag=tag)


@app.route('/tags/<int:tag_id>/edit', methods=['GET', 'POST'])
def edit_tag(tag_id):
    """Edit a tag."""
    tag = Tag.query.get_or_404(tag_id)
    if request.method == 'POST':
        tag.name = request.form['name']
        db.session.commit()
        return redirect(f"/tags/{tag_id}")

    return render_template('edit_tag.html', tag=tag)


@app.route('/tags/<int:tag_id>/delete', methods=['GET'])
def delete_tag(tag_id):
    """Delete a tag."""
    tag = Tag.query.get_or_404(tag_id)
    db.session.delete(tag)
    db.session.commit()
    return redirect(f"/tags")


if __name__ == '__main__':
    app.run(debug=True)
