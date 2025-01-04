"""Models for WTForms-Adoption Agency."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)


class Cupcake(db.Model):
    """Cupcake"""

    __tablename__ = "cupcakes"

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)

    flavor = db.Column(db.String(32),
                       nullable=False)

    size = db.Column(db.String(32),
                     nullable=False)

    rating = db.Column(db.Float(),
                       nullable=False)

    image = db.Column(db.String(256),
                      nullable=False,
                      default="https://tinyurl.com/demo-cupcake")

    @property
    def serialize(self):
        return {"cupcake":{
            "id": self.id,
            "flavor": self.flavor,
            "size": self.size,
            "rating": self.rating,
            "image": self.image
        }}

    @property
    def serialize_total(self):
        return {
            "id": self.id,
            "flavor": self.flavor,
            "size": self.size,
            "rating": self.rating,
            "image": self.image
        }

    def __repr__(self):
        """Show info about cupcake."""

        return (f"<Cupcake id={str(self.id)} "
                f"flavor={self.flavor} "
                f"size={self.size} " +
                (f"rating={str(self.rating)}") +
                (f"image={self.image[:24]}>" if self.image and
                len(self.image) > 0 else '>'))

