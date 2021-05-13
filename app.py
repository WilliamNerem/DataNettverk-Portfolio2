from flask import Flask, request, flash, send_from_directory, redirect, url_for, render_template, jsonify
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
import json
import os
from dataclasses import dataclass
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
import mysql.connector

mysql_user = 'neremzky'
mysql_pwd = 'passordNeremzky'
mysql_host = 'datanettverk-portfolio2_database_1'
mysql_db = 'everything'

mydb = mysql.connector.connect(user = mysql_user, password = mysql_pwd, host = mysql_host, database = mysql_db, autocommit=True)

mycursor = mydb.cursor(buffered=True)
mycursor.execute("SELECT * FROM products")

row_headers=[x[0] for x in mycursor.description]
myresult = mycursor.fetchall()

app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'     #/var/run/mysqld/mysqld.sock
app.config['CORS_HEADERS'] = 'Content-Type'
db = SQLAlchemy(app)
cors = CORS(app, resources={r"/": {"origins": "http://127.0.0.1:5000/"}})
UPLOAD_FOLDER = 'home/static/img'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
SQLALCHEMY_TRACK_MODIFICATIONS = False
global admin

@dataclass
class ProductModel(db.Model):
    __tablename__='products'

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

@dataclass
class ShoppingcartModel(db.Model):
    __tablename__='cartItems'

    shoppingcart_id: int
    product_id: int
    productName: str
    price: int
    productInfoShort: str
    productInfoLong: str
    productImage: str

    shoppingcart_id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, nullable=False)
    productName = db.Column(db.String(30), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    productInfoShort = db.Column(db.String(100), nullable=False)
    productInfoLong = db.Column(db.String(1000), nullable=False)
    productImage = db.Column(db.String(100), nullable=False)

@dataclass
class UserModel(db.Model):
    __tablename__='users'

    user_id: int
    username: str
    firstname: str
    lastname: str
    email: str
    phone: str
    password: str

    user_id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), nullable=False)
    firstname = db.Column(db.String(30), nullable=False)
    lastname = db.Column(db.String(30), nullable=False)
    email = db.Column(db.String(100), nullable=False)
    phone = db.Column(db.String(10), nullable=False)
    password = db.Column(db.String(30), nullable=False)

def addAdmin():
    user_id1 = UserModel(username='Admin')
    adminUser = UserModel(user_id=user_id1.user_id, username=user_id1.username, firstname='Admin', lastname='Admin', email='admin@admin.com', phone='12345678', password='Admin')

    db.session.add(adminUser)
    db.session.commit()
    

def addProducts():
    product_id1 = ProductModel(productName='Shark NV352')
    product1 = ProductModel(product_id=product_id1.product_id, productName=product_id1.productName, price=1799, productInfoShort='Lift Away Upright Vacuum with Wide Upholstery and Crevice Tools, Lavender', productInfoLong='Lift-Away: Lift Away the detachable pod and easily clean, above-floor areas like stairs and furniture. Anti-Allergen Complete Seal Technology and a HEPA filter trap dust and allergens inside the vacuum. Powerful, lightweight, and versatile at only 14 lbs. Brushroll shutoff allows you to instantly switch from deep carpet cleaning to gentle bare floor cleaning. Swivel Steering for excellent control to maneuver around furniture. Upholstery Tool, and two lengths of Crevice Tool included for versatile cleaning.', productImage='static/img/SharkNV352.jpg')
    product_id2 = ProductModel(productName='Bissell Featherweight')
    product2 = ProductModel(product_id=product_id2.product_id, productName=product_id2.productName, price=299, productInfoShort='Powerful vacuum with three machines in one', productInfoLong='Lightweight Bagless Vacuum With Crevice Tool, 2033, One Size Fits All, Blue', productImage='static/img/BissellFeatherweight.jpg')
    product_id3 = ProductModel(productName='BISSELL Cleanview Swivel Pet')
    product3 = ProductModel(product_id=product_id3.product_id, productName=product_id3.productName, price=999, productInfoShort='Upright Bagless Vacuum Cleaner, Green', productInfoLong='Powerful pet hair pick up with triple action brush roll + scatter free technology. Remove pet hair with specialized pet tools including pet hair corner tool and pet tool', productImage='static/img/BISSELLCleanviewSwivelPet.jpg')
    product_id4 = ProductModel(productName='NEQUARE Cordless Vacuum')
    product4 = ProductModel(product_id=product_id4.product_id, productName=product_id4.productName, price=1499, productInfoShort='10 in 1 Vacuum Cleaner with 280W Powerful Suction', productInfoLong='40mins Self-Standing Stick Vacuum for Car Pet Hair Carpet Hard Floor S25Pro', productImage='static/img/NEQUARECordlessVacuum.jpg')
    product_id5 = ProductModel(productName='TOPPIN Stick Vacuum Cleaner Cordless')
    product5 = ProductModel(product_id=product_id5.product_id, productName=product_id5.productName, price=999, productInfoShort='Cordless vacuum with detachable battery', productInfoLong='Tangle-Free 6 in 1 Powerful 12Kpa Suction Stick Vacuum, Lightweight and Large Capacity, Up to 35min Runtime, Ideal for Home Hard Floor Carpet Car Pet', productImage='static/img/TOPPINStickVacuumCleanerCordless.jpg')
    product_id6 = ProductModel(productName='Happy-house Handheld Vacuum')
    product6 = ProductModel(product_id=product_id6.product_id, productName=product_id6.productName, price=220, productInfoShort='Hand Vacuum Cordless with High Power', productInfoLong='Mini Vacuum Cleaner Handheld Rechargeable for Home and Car Cleaning', productImage='static/img/Happy-houseHandheldVacuum.jpg')
    product_id7 = ProductModel(productName='Dyson V7 Trigger')
    product7 = ProductModel(product_id=product_id7.product_id, productName=product_id7.productName, price=3640, productInfoShort='Cord-Free Handheld Vacuum Cleaner', productInfoLong='Powered by Dyson digital motor V7; The most powerful handheld vacuum; Up to 30 minutes of fade free suction; With fade free lithium ion batteries, suction starts strong and stays strong', productImage='static/img/DysonV7Trigger.jpg')
    product_id8 = ProductModel(productName='Shark ION Robot Vacuum AV752')
    product8 = ProductModel(product_id=product_id8.product_id, productName=product_id8.productName, price=2099, productInfoShort='Robot vacuum with three brush types', productInfoLong='Wi-Fi Connected, 120min Runtime, Works with Alexa, Multi-Surface Cleaning, White', productImage='static/img/SharkIONRobotVacuumAV752.jpg')
    product_id9 = ProductModel(productName='GOOVI 1600PA')
    product9 = ProductModel(product_id=product_id9.product_id, productName=product_id9.productName, price=1729, productInfoShort='Robotic Vacuum Cleaner with Self-Charging', productInfoLong='360° Smart Sensor Protectio, Multiple Cleaning Modes Vacuum Best for Pet Hairs, Hard Floor & Medium Carpet', productImage='static/img/GOOVI1600PA.jpg')
    product_id10 = ProductModel(productName='Coredy R750')
    product10 = ProductModel(product_id=product_id10.product_id, productName=product_id10.productName, price=2999, productInfoShort='Robot Vacuum Cleaner, Compatible with Alexa', productInfoLong='Mopping System, Boost Intellect, Virtual Boundary Supported, 2000Pa Suction, Super-Thin, Upgraded Robotic Vacuums, Cleans Hard Floor to Carpet', productImage='static/img/CoredyR750.jpg')
    
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
#addProducts()
addAdmin()

currentProduct = {}
currentUser = {}
currentUserId = 0
json_data = []
currentProductId = 0


@app.route("/", methods=['GET', 'POST'])
def renderIndex():
    return render_template('index.html', currentUser = currentUser)

@app.route("/login", methods=['GET', 'POST'])
@cross_origin(origin='127.0.0.1',headers=['Content-Type','Authorization'])
def login():
    global currentUser
    global json_data
    correctLogin = False
    mycursor = mydb.cursor(buffered=True)
    mycursor.execute("SELECT * FROM users")
    mydb.commit()
    row_headers=[x[0] for x in mycursor.description]
    myresult = mycursor.fetchall()
    mycursor.close()
    json_data=[]
    for result in myresult:
        json_data.append(dict(zip(row_headers,result)))

    if request.method == 'POST':
        reqdata = request.get_json()
        username = reqdata['username']
        password = reqdata['password']

        for user in json_data:
            if user['username'] == username:
                if user['password'] == password:
                    correctLogin = True
                    currentUser = user
                    break
                else: 
                    correctLogin = False
            else:
                correctLogin = False

        if(correctLogin):
            if username == 'Admin' and password == 'Admin':
                currentUserId = 0
                db.session.commit()
                admin = True
                mysql_user = username
                mysql_pwd = password
                mysql_host = 'datanettverk-portfolio2_database_1'
                mysql_db = 'everything'
                # mydb = mysql.connector.connect(user = mysql_user, password = mysql_pwd, host = mysql_host, database = mysql_db, autocommit=True)
                return jsonify(currentUser)
            else: 
                mysql_user = username
                mysql_pwd = password
                mysql_host = 'datanettverk-portfolio2_database_1'
                mysql_db = 'everything'
                # mydb = mysql.connector.connect(user = mysql_user, password = mysql_pwd, host = mysql_host, database = mysql_db, autocommit=True)
                return jsonify(currentUser)
        return render_template('login.html', currentUser = currentUser)

    else:
        return render_template('login.html', currentUser = currentUser)

@app.route("/logout", methods=['GET', 'POST'])
@cross_origin(origin='127.0.0.1',headers=['Content-Type','Authorization'])
def logout():
    global currentUser
    currentUser = {}
    return render_template('index.html', currentUser = currentUser)

@app.route("/register", methods=['GET', 'POST'])
@cross_origin(origin='127.0.0.1',headers=['Content-Type','Authorization'])
def register():
    if request.method == 'POST':
        reqdata = request.get_json()
        username = reqdata['username']
        firstname = reqdata['firstname']
        lastname = reqdata['lastname']
        email = reqdata['email']
        phone = reqdata['phone']
        password = reqdata['password']
        sql = """INSERT INTO users (username, firstname, lastname, email, phone, password) VALUES (%s, %s, %s, %s, %s, %s)"""
        val = (username, firstname, lastname, email, phone, password)
        mycursor.execute(sql, val)
        mydb.commit()
        return render_template('register.html', currentUser = currentUser)

    else:
        return render_template('register.html', currentUser = currentUser)

@app.route("/fetchUsers", methods=['GET', 'POST'])
@cross_origin(origin='127.0.0.1',headers=['Content-Type','Authorization'])
def fetchUsers():
    global json_data
    mycursor = mydb.cursor(buffered=True)
    mycursor.execute("SELECT * FROM users")
    mydb.commit()
    row_headers=[x[0] for x in mycursor.description]
    myresult = mycursor.fetchall()
    mycursor.close()
    json_data=[]
    for result in myresult:
        json_data.append(dict(zip(row_headers,result)))
    return jsonify(json_data)

@app.route("/profile", methods=['GET', 'POST'])
def profile():
    return render_template('profile.html', currentUser = currentUser)

@app.route("/fetchProducts", methods=['GET', 'POST'])
@cross_origin(origin='127.0.0.1',headers=['Content-Type','Authorization'])
def fetchProducts():
    global json_data
    mycursor = mydb.cursor(buffered=True)
    mycursor.execute("SELECT * FROM products")
    mydb.commit()
    row_headers=[x[0] for x in mycursor.description]
    myresult = mycursor.fetchall()
    mycursor.close()
    json_data=[]
    for result in myresult:
        json_data.append(dict(zip(row_headers,result)))
    #productReturn = ProductModel.query.all()
    return jsonify(json_data)

@app.route("/fetchCurrent", methods=['GET', 'POST'])
@cross_origin(origin='127.0.0.1',headers=['Content-Type','Authorization'])
def fetchCurrent():
    return jsonify(currentProduct)

@app.route("/fetchCurrentImage", methods=['GET', 'POST'])
@cross_origin(origin='127.0.0.1',headers=['Content-Type','Authorization'])
def fetchCurrentImage():
    global currentProductId
    json_data=[]
    mycursor = mydb.cursor(buffered=True)
    mycursor.execute("""SELECT productImage FROM productImages WHERE product_id="""+str(currentProductId))
    row_headers=[x[0] for x in mycursor.description]
    myresult = mycursor.fetchall()
    mycursor.close()
    for result in myresult:
        json_data.append(dict(zip(row_headers,result)))
    return jsonify(json_data)  


@app.route("/product/<int:product_id>", methods=['GET', 'POST'])
@cross_origin(origin='127.0.0.1',headers=['Content-Type','Authorization'])
def productDescription(product_id):
    global currentProduct
    global json_data
    global currentProductId
    try:
        json_data=[]
        mycursor.execute("SELECT * FROM products")
        myresult = mycursor.fetchall()
        for result in myresult:
            json_data.append(dict(zip(row_headers,result)))
        #productReturn = ProductModel.query.all()
        currentProduct = json_data[product_id-1]
        currentProductId = product_id
        product_exists = "true"
        return render_template('product.html', product_exists = product_exists, currentUser = currentUser)
    except:
        product_exists = "false"
        return render_template('product.html', product_exists = product_exists, currentUser = currentUser)

@app.route("/shoppingcart", methods=['GET', 'POST'])
def shoppingcart():
    return render_template('shoppingcart.html', currentUser = currentUser)

@app.route("/shoppingcart/<int:product_id>", methods=['GET', 'POST'])
@cross_origin(origin='127.0.0.1',headers=['Content-Type','Authorization'])
def addToShoppingcart(product_id):
    global json_data
    for result in myresult:
        json_data.append(dict(zip(row_headers,result)))

    mycursor.execute("SELECT * FROM cartItems where product_id="+str(product_id))

    cartrow_headers=[x[0] for x in mycursor.description]
    cartresult = mycursor.fetchall()

    items = json_data[product_id-1]
    itemValues = list(items.values())
    print(itemValues)

    cart_data=[]
    for result in cartresult:
        json_data.append(dict(zip(row_headers,result)))

    #cartItemId = ShoppingcartModel(product_id = product_id)
    #products = ProductModel.query.all()

    sql = """INSERT INTO cartItems (product_id, productName, price, productInfoShort, productInfoLong, productImage) VALUES (%s, %s, %s, %s, %s, %s)"""
    val = (itemValues[0], itemValues[1], itemValues[2], itemValues[3], itemValues[4], itemValues[5])
    mycursor.execute(sql, val)
    mydb.commit()

    #cartItem = json_data[product_id-1]
    # addCartItem = ShoppingcartModel(shoppingcart_id = cartItemId.shoppingcart_id, product_id = cartItem.product_id, productName=cartItem.productName, price=cartItem.price, productInfoShort = cartItem.productInfoShort, productInfoLong = cartItem.productInfoLong, productImage = cartItem.productImage)
    # db.session.add(addCartItem)
    # db.session.commit()
    return render_template('shoppingcart.html', countCart = len(json_data), currentUser = currentUser)

@app.route("/shoppingcart/checkout", methods=['GET', 'POST'])
def checkout():
    return render_template('shoppingcart.html', currentUser = currentUser)

@app.route("/shoppingcart/countItems", methods=['GET', 'POST'])
@cross_origin(origin='127.0.0.1',headers=['Content-Type','Authorization'])
def checkNumberOfItems():    
    cartJson_data = []
    mycursor = mydb.cursor(buffered=True)
    mycursor.execute("SELECT * FROM cartItems")
    
    cartrow_headers=[x[0] for x in mycursor.description]
    cartitems = mycursor.fetchall()

    for result in cartitems:
        cartJson_data.append(dict(zip(cartrow_headers,result)))

    return jsonify(cartJson_data)

    # returnArray = ShoppingcartModel.query.all()
    # return jsonify(returnArray)

@app.route("/shoppingcart/checkout/items", methods=['GET', 'POST'])
@cross_origin(origin='127.0.0.1',headers=['Content-Type','Authorization'])
def checkoutItems():
    cartJson_data = []
    mycursor = mydb.cursor(buffered=True)
    mycursor.execute("SELECT * FROM cartItems")

    cartrow_headers=[x[0] for x in mycursor.description]
    cartitems = mycursor.fetchall()

    for result in cartitems:
        cartJson_data.append(dict(zip(cartrow_headers,result)))
    return jsonify(cartJson_data)

    # returnArray = ShoppingcartModel.query.all()
    # return jsonify(returnArray)

@app.route("/shoppingcart/remove/<int:shoppingcart_id>", methods=['GET', 'POST'])
@cross_origin(origin='127.0.0.1',headers=['Content-Type','Authorization'])
def removeCheckoutItems(shoppingcart_id):
    sql = """DELETE FROM cartItems where shoppingcart_id="""+str(shoppingcart_id)
    mycursor = mydb.cursor(buffered=True)
    mycursor.execute(sql)
    mycursor.close()
    mydb.commit()
    cartJson_data = []
    mycursor = mydb.cursor(buffered=True)
    mycursor.execute("SELECT * FROM cartItems")

    cartrow_headers=[x[0] for x in mycursor.description]
    cartitems = mycursor.fetchall()

    for result in cartitems:
        cartJson_data.append(dict(zip(cartrow_headers,result)))
    return jsonify(cartJson_data)

    # ShoppingcartModel.query.filter_by(shoppingcart_id = shoppingcart_id).delete()
    # db.session.commit()
    # cartReturn = ShoppingcartModel.query.all()
    # return jsonify(cartReturn)

@app.route("/payment/complete/<string:paymentSuccessful>", methods=['GET', 'POST'])
@cross_origin(origin='127.0.0.1',headers=['Content-Type','Authorization'])
def completePayment(paymentSuccessful):
    global currentUserId
    if paymentSuccessful == 'true':
        args = [currentUserId]
        mycursor = mydb.cursor(buffered=True)
        mycursor.callproc('addToOrderHistory', args)
        mycursor.close()
        mydb.commit()
        # ShoppingcartModel.query.delete()
        # db.session.commit()
    return paymentSuccessful

@app.route("/orderHistory/<int:user_id>", methods=['GET', 'POST'])
def orderHistory(user_id):
    # global currentUser
    # return render_template('orderHistory.html', currentUser = currentUser)

    Json_data = []
    mycursor = mydb.cursor(buffered=True)
    mycursor.execute("SELECT * FROM orderHistory WHERE user_id="+str(user_id))

    row_headers=[x[0] for x in mycursor.description]
    cartitems = mycursor.fetchall()

    for result in cartitems:
        Json_data.append(dict(zip(row_headers,result)))
    return jsonify(Json_data)

@app.route("/orderHistory", methods=['GET', 'POST'])
def renderOrderHistory():
    global currentUser
    global currentUserId
    return render_template('orderHistory.html', currentUser = currentUser, currentUserId = currentUserId)

@app.route("/addproducts", methods=['GET', 'POST'])
def addproductsyup():
    return render_template('addproducts.html', currentUser = currentUser)

@app.route('/form')
def form():
    return render_template('form.html', currentUser = currentUser)
 
@app.route('/upload', methods = ['POST', 'GET'])
def upload():
    if request.method == 'POST':
        f = request.files['file']
        print(f)
        filename = secure_filename(f.filename)
        f.save(os.path.join(app.config['UPLOAD_FOLDER'],filename))
        return os.path.join(app.config['UPLOAD_FOLDER'],filename)

@app.route("/addproductsReal", methods=['GET', 'POST'])
@cross_origin(origin='127.0.0.1',headers=['Content-Type','Authorization'])
def addProductsReal():
    if request.method == 'POST':
        pname = request.form['pname']
        price = request.form['price']
        pinfos = request.form['pinfos']
        pinfol = request.form['pinfol']
        files = request.files.getlist('files[]')
        filenames = []
        fullpaths = []
        #for i in range(len(files)):
        filename = secure_filename(files[0].filename)
        filenames.append(filename)
        print(filename)
        #file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
        filepath = 'static/img/'+filename
        file_fullPath = os.path.join(app.config['UPLOAD_FOLDER'],filename)
        if (file_fullPath == 'home/static/img/' ):
            sql = """INSERT INTO products (productName, price, productInfoShort, productInfoLong, productImage) VALUES (%s, %s, %s, %s, %s)"""
            val = (pname, price, pinfos, pinfol, 'static/img/defaultVacuum.jpg')
            mycursor.execute(sql, val)
            mydb.commit()
        else:
            files[0].save(file_fullPath)
            sql = """INSERT INTO products (productName, price, productInfoShort, productInfoLong, productImage) VALUES (%s, %s, %s, %s, %s)"""
            val = (pname, price, pinfos, pinfol, filepath)
            mycursor.execute(sql, val)
            mydb.commit()
            sql = """SELECT product_id FROM products ORDER BY product_id DESC LIMIT 1;"""
            mycursor.execute(sql)
            prodid = mycursor.fetchone()
            #for row in prodid:
            #    lol = row[0]
            for i in range(len(files)):
                filename = secure_filename(files[i].filename)
                filepath = 'static/img/'+filename
                fullpaths.append(filepath)
                sql = """INSERT INTO productImages (product_id, productImage) VALUES (%s, %s)"""
                val = (prodid[0], filepath)
                mycursor.execute(sql, val)
        return render_template('addproducts.html', currentUser = currentUser)
    else:
        return render_template('addproducts.html', currentUser = currentUser)


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
    mydb.close()