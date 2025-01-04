from models import db, Cupcake
from app import app
import sqlalchemy as db2
from sqlalchemy_utils import database_exists, create_database

engine = db2.create_engine('postgresql:///cupcakes')
if not database_exists(engine.url):
    create_database(engine.url, encoding='SQL_ASCII')
with app.app_context():
    db.drop_all()
    db.create_all()
    cupcake1 = Cupcake(
        flavor="Vanilla",
        size=2,
        rating=0,
        image="https://via.placeholder.com/75"
    )
    cupcake2 = Cupcake(
        flavor="Chocolate",
        size=1,
        rating=0,
        image="https://tinyurl.com/demo-cupcake"
    )
    cupcake3 = Cupcake(
        flavor="Strawberry",
        size=5,
        rating=0,
        image="https://via.placeholder.com/150"
    )
    cupcake4 = Cupcake(
        flavor="Orange",
        size=2,
        rating=0,
    )
    cupcake5 = Cupcake(
        flavor="Lemon",
        size=0,
        rating=0,
        image="https://tinyurl.com/demo-cupcake"
    )
    cupcake6 = Cupcake(
        flavor="Mint",
        size=3,
        rating=0,
        image="https://via.placeholder.com/150"
    )
    try:
        db.session.add_all([cupcake1, cupcake2, cupcake3, cupcake4, cupcake5,
                               cupcake6])
        db.session.commit()
        print("Database seeded successfully!")
    except Exception as e:
        print(f"Error committing data: {e}")
