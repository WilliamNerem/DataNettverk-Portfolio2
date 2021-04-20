from flask import Flask, render_template, jsonify
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
import json
from dataclasses import dataclass
from flask_cors import CORS, cross_origin

app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['CORS_HEADERS'] = 'Content-Type'
db = SQLAlchemy(app)
cors = CORS(app, resources={r"/": {"origins": "http://127.0.0.1:5000/"}})

@dataclass
class ProductModel(db.Model):
    product_id: int
    productName: str
    price: int
    productInfoShort: str
    productInfoLong: str
    productImage: str

    product_id = db.Column(db.Integer, primary_key=True)
    productName = db.Column(db.String(30), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    productInfoShort = db.Column(db.String(100), nullable=False)
    productInfoLong = db.Column(db.String(1000), nullable=False)
    productImage = db.Column(db.String(100), nullable=False)

    '''
    def __repr__(self):
        return f"Product(productName = {productName}),
                 price = {price}, productInfoShort = {productInfoShort},
                 productInfoLong = {productInfoLong}, productImage = {productImage})"
                 '''

db.drop_all()
db.create_all()
product_id = ProductModel(productName='ps5')
product = ProductModel(product_id=product_id.product_id, productName='ps5', price=4999, productInfoShort='Lættis bro', productInfoLong='Laaaaaang lættis bro', productImage='DataNettverk-Portfolio2\static\img\sony-ps5.jpg')
db.session.add(product)
db.session.commit()

@app.route("/", methods=['GET', 'POST'])
@cross_origin(origin='127.0.0.1',headers=['Content-Type','Authorization'])
def index():
    #return render_template('index.html')
    productReturn = ProductModel.query.all()
    return jsonify(productReturn)

@app.route("/product/productid", methods=['GET', 'POST'])
def productDescription():
    return render_template('index.html')

@app.route("/shoppingcart", methods=['GET', 'POST'])
def shoppingcart():
    return render_template('index.html')

@app.route("/shoppingcart/checkout", methods=['GET', 'POST'])
def checkout():
    return render_template('index.html')

@app.route("/addproducts", methods=['GET', 'POST'])
def addProducts():
    return render_template('index.html')

if __name__ == "__main__":
    app.run(debug=True)