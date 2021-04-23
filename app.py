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

def addProducts():
    product_id1 = ProductModel(productName='Shark NV352')
    product1 = ProductModel(product_id=product_id1.product_id, productName=product_id1.productName, price=1799, productInfoShort='Lift Away Upright Vacuum with Wide Upholstery and Crevice Tools, Lavender', productInfoLong='Lift-Away: Lift Away the detachable pod and easily clean, above-floor areas like stairs and furniture. Anti-Allergen Complete Seal Technology and a HEPA filter trap dust and allergens inside the vacuum. Powerful, lightweight, and versatile at only 14 lbs. Brushroll shutoff allows you to instantly switch from deep carpet cleaning to gentle bare floor cleaning. Swivel Steering for excellent control to maneuver around furniture. Upholstery Tool, and two lengths of Crevice Tool included for versatile cleaning.', productImage='../static/img/SharkNV352.jpg')
    product_id2 = ProductModel(productName='Bissell Featherweight')
    product2 = ProductModel(product_id=product_id2.product_id, productName=product_id2.productName, price=299, productInfoShort='Powerful vacuum with three machines in one', productInfoLong='Lightweight Bagless Vacuum With Crevice Tool, 2033, One Size Fits All, Blue', productImage='../static/img/BissellFeatherweight.jpg')
    product_id3 = ProductModel(productName='BISSELL Cleanview Swivel Pet')
    product3 = ProductModel(product_id=product_id3.product_id, productName=product_id3.productName, price=999, productInfoShort='Upright Bagless Vacuum Cleaner, Green', productInfoLong='Powerful pet hair pick up with triple action brush roll + scatter free technology. Remove pet hair with specialized pet tools including pet hair corner tool and pet tool', productImage='../static/img/BISSELLCleanviewSwivelPet.jpg')
    product_id4 = ProductModel(productName='NEQUARE Cordless Vacuum')
    product4 = ProductModel(product_id=product_id4.product_id, productName=product_id4.productName, price=1499, productInfoShort='10 in 1 Vacuum Cleaner with 280W Powerful Suction', productInfoLong='40mins Self-Standing Stick Vacuum for Car Pet Hair Carpet Hard Floor S25Pro', productImage='../static/img/NEQUARECordlessVacuum.jpg')
    product_id5 = ProductModel(productName='TOPPIN Stick Vacuum Cleaner Cordless')
    product5 = ProductModel(product_id=product_id5.product_id, productName=product_id5.productName, price=999, productInfoShort='Cordless vacuum with detachable battery', productInfoLong='Tangle-Free 6 in 1 Powerful 12Kpa Suction Stick Vacuum, Lightweight and Large Capacity, Up to 35min Runtime, Ideal for Home Hard Floor Carpet Car Pet', productImage='../static/img/TOPPINStickVacuumCleanerCordless.jpg')
    product_id6 = ProductModel(productName='Happy-house Handheld Vacuum')
    product6 = ProductModel(product_id=product_id6.product_id, productName=product_id6.productName, price=220, productInfoShort='Hand Vacuum Cordless with High Power', productInfoLong='Mini Vacuum Cleaner Handheld Rechargeable for Home and Car Cleaning', productImage='../static/img/Happy-houseHandheldVacuum.jpg')
    product_id7 = ProductModel(productName='Dyson V7 Trigger')
    product7 = ProductModel(product_id=product_id7.product_id, productName=product_id7.productName, price=3640, productInfoShort='Cord-Free Handheld Vacuum Cleaner', productInfoLong='Powered by Dyson digital motor V7; The most powerful handheld vacuum; Up to 30 minutes of fade free suction; With fade free lithium ion batteries, suction starts strong and stays strong', productImage='../static/img/DysonV7Trigger.jpg')
    product_id8 = ProductModel(productName='Shark ION Robot Vacuum AV752')
    product8 = ProductModel(product_id=product_id8.product_id, productName=product_id8.productName, price=2099, productInfoShort='Robot vacuum with three brush types', productInfoLong='Wi-Fi Connected, 120min Runtime, Works with Alexa, Multi-Surface Cleaning, White', productImage='../static/img/SharkIONRobotVacuumAV752.jpg')
    product_id9 = ProductModel(productName='GOOVI 1600PA')
    product9 = ProductModel(product_id=product_id9.product_id, productName=product_id9.productName, price=1729, productInfoShort='Robotic Vacuum Cleaner with Self-Charging', productInfoLong='360° Smart Sensor Protectio, Multiple Cleaning Modes Vacuum Best for Pet Hairs, Hard Floor & Medium Carpet', productImage='../static/img/GOOVI1600PA.jpg')
    product_id10 = ProductModel(productName='Coredy R750')
    product10 = ProductModel(product_id=product_id10.product_id, productName=product_id10.productName, price=2999, productInfoShort='Robot Vacuum Cleaner, Compatible with Alexa', productInfoLong='Mopping System, Boost Intellect, Virtual Boundary Supported, 2000Pa Suction, Super-Thin, Upgraded Robotic Vacuums, Cleans Hard Floor to Carpet', productImage='../static/img/CoredyR750.jpg')
    
    db.session.add(product1)
    db.session.add(product2)
    db.session.add(product3)
    db.session.add(product4)
    db.session.add(product5)
    db.session.add(product6)
    db.session.add(product7)
    db.session.add(product8)
    db.session.add(product9)
    db.session.add(product10)
    
    db.session.commit()

db.drop_all()
db.create_all()
addProducts()



@app.route("/fetchProducts", methods=['GET', 'POST'])
@cross_origin(origin='127.0.0.1',headers=['Content-Type','Authorization'])
def index():
    #return render_template('index.html')
    productReturn = ProductModel.query.all()
    return jsonify(productReturn)

@app.route("/", methods=['GET', 'POST'])
def renderIndex():
    return render_template('index.html')

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