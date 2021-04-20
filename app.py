from flask import Flask, render_template
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
db = SQLAlchemy(app)

class ProductModel(db.Model):
    product_id = db.Column(db.Integer, primary_key=True)
    productName = db.Column(db.String(30), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    productInfoShort = db.Column(db.String(100), nullable=False)
    productInfoLong = db.Column(db.String(1000), nullable=False)
    productImage = db.Column(db.String(100), nullable=False)

@app.route("/", methods=['GET', 'POST'])
def index():
    return render_template('index.html')