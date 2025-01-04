from flask import Flask, request, redirect, render_template, jsonify

from models import db, connect_db, Cupcake

#from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = 'i_have_a_secret_6'
app.config['SQLALCHEMY_ECHO'] = False
# debug = DebugToolbarExtension(app)

connect_db(app)


@app.route("/")
def home():
    """Return Empty Template"""
    return render_template("index.html")


@app.route("/api/cupcakes", methods=['GET'])
def get_all_cupcakes():
    """GET cupcake - SELECT cupcakes"""
    return jsonify(cupcakes=[i.serialize_total for i in
                             db.session.query(Cupcake).all()]), 200


@app.route("/api/cupcakes", methods=['POST'])
def new_cupcake():
    """POST cupcake - INSERT new cupcake"""
    flavor = (request.args.get('flavor', False) or
              request.form.get('flavor', False))
    size = (request.args.get('size', False) or
            request.form.get('size', False))
    rating = (request.args.get('rating', False) or
              request.form.get('rating', False))
    image = (request.args.get('image', False) or
             request.form.get('image', False))
    if not (flavor and size and rating):
        return ('Missing Input(s): {' +
                ("flavor " if not flavor else ' ') +
                ("size " if not size else ' ') +
                ("rating" if not rating else '') + "}", 400)
    cupcake = Cupcake(
        flavor=flavor,
        size=size,
        rating=rating)
    if image:
        cupcake.image = image
    db.session.add(cupcake)
    db.session.commit()
    return jsonify(cupcake.serialize), 201


@app.route("/api/cupcakes/<int:cupcake_id>", methods=['PATCH'])
def update_cupcake(cupcake_id):
    """PATCH cupcake - UPDATE based on REQUEST"""
    cupcake = db.get_or_404(Cupcake, cupcake_id)
    flavor = (request.args.get('flavor', False) or
              request.form.get('flavor', False))
    size = (request.args.get('size', False) or
            request.form.get('size', False))
    rating = (request.args.get('rating', False) or
              request.form.get('rating', False))
    image = (request.args.get('image', False) or
             request.form.get('image', False))
    if flavor and cupcake.flavor != flavor:
        cupcake.flavor = flavor
    if size and cupcake.size != size:
        cupcake.size = size
    if rating and cupcake.rating != rating:
        cupcake.rating = rating
    if image and cupcake.image != image:
        cupcake.image = image
    if flavor or size or rating or image:
        db.session.verified = True
        db.session.commit()
    else:
        return jsonify({"Not Found", str(cupcake_id)}), 404
    return jsonify(cupcake.serialize), 200


@app.route("/api/cupcakes/<int:cupcake_id>", methods=['DELETE'])
def delete_cupcake(cupcake_id):
    """DELETE cupcake - DELETE based on ID"""
    db.session.delete(db.get_or_404(Cupcake, cupcake_id))
    db.session.commit()
    return jsonify({"Deleted": str(cupcake_id)}), 200


@app.route("/api/cupcakes/<int:cupcake_id>", methods=['GET'])
def get_cupcake_id(cupcake_id):
    """GET cupcake - SELECT based on ID"""
    return jsonify(db.get_or_404(Cupcake, cupcake_id).serialize), 200
