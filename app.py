from flask import Flask, request, render_template, jsonify
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy
import json
import os
from flask_cors import CORS, cross_origin
from werkzeug.utils import secure_filename
import mysql.connector
from google.oauth2 import id_token as goog_token
from google.auth.transport import requests as goog_req

mysql_user = 'default'
mysql_pwd = 'fdsKG39F!ldk0dsLdM3@'
mysql_host = 'datanettverk-portfolio2_database_1'
mysql_db = 'everything'
oauth_id = '327986808053-k9gr4qboqvo28psnnrqnqjem9qdehkn2.apps.googleusercontent.com'

mydb = mysql.connector.connect(user = mysql_user, password = mysql_pwd, host = mysql_host, database = mysql_db, autocommit=True)

mycursor = mydb.cursor(buffered=True)
mycursor.execute("SELECT * FROM products")

row_headers=[x[0] for x in mycursor.description]
myresult = mycursor.fetchall()

app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'     
app.config['CORS_HEADERS'] = 'Content-Type'
db = SQLAlchemy(app)
cors = CORS(app, resources={r"/": {"origins": "http://localhost:5000/"}})
UPLOAD_FOLDER = 'home/static/img'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg'}
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
SQLALCHEMY_TRACK_MODIFICATIONS = False
global admin

currentProduct = {}
currentUser = {}
currentUserId = None
json_data = []
currentProductId = None


@app.route("/", methods=['GET', 'POST'])
def renderIndex():
    return render_template('index.html', currentUser = currentUser)

@app.route("/login", methods=['GET', 'POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def login():
    global currentUser
    global currentUserId
    global json_data
    global mydb
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
                    currentUserId = user['user_id']
                    break
                else: 
                    correctLogin = False
            else:
                correctLogin = False

        if(correctLogin):
            mysql_user = username
            mysql_pwd = password
            mysql_host = 'datanettverk-portfolio2_database_1'
            mysql_db = 'everything'
            mydb = mysql.connector.connect(user = mysql_user, password = mysql_pwd, host = mysql_host, database = mysql_db, autocommit=True)
            return jsonify(currentUser)
        return render_template('login.html', currentUser = currentUser)

    else:
        return render_template('login.html', currentUser = currentUser)



@app.route("/logout", methods=['GET', 'POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def logout():
    global currentUser
    global mydb
    currentUser = {}
    currentUserId = None
    mysql_user = 'default'
    mysql_pwd = 'fdsKG39F!ldk0dsLdM3@'
    mysql_host = 'datanettverk-portfolio2_database_1'
    mysql_db = 'everything'
    mydb = mysql.connector.connect(user = mysql_user, password = mysql_pwd, host = mysql_host, database = mysql_db, autocommit=True)
    return render_template('index.html', currentUser = currentUser)

@app.route("/register", methods=['GET', 'POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
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
        mycursor = mydb.cursor(buffered=True)
        mycursor.execute(sql, val)
        mydb.commit()
        return render_template('register.html', currentUser = currentUser)

    else:
        return render_template('register.html', currentUser = currentUser)

@app.route("/fetchUsers", methods=['GET', 'POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
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
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
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
    return jsonify(json_data)

@app.route("/fetchCurrent", methods=['GET', 'POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def fetchCurrent():
    return jsonify(currentProduct)

@app.route("/fetchCurrentImage", methods=['GET', 'POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
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
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def productDescription(product_id):
    global currentProduct
    global json_data
    global currentProductId
    try:
        json_data=[]
        mycursor = mydb.cursor(buffered=True)
        mycursor.execute("SELECT * FROM products")
        myresult = mycursor.fetchall()
        for result in myresult:
            json_data.append(dict(zip(row_headers,result)))
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
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def addToShoppingcart(product_id):
    global json_data
    for result in myresult:
        json_data.append(dict(zip(row_headers,result)))
    mycursor = mydb.cursor(buffered=True)
    mycursor.execute("SELECT * FROM cartItems where product_id="+str(product_id))
    cartrow_headers=[x[0] for x in mycursor.description]
    cartresult = mycursor.fetchall()

    items = json_data[product_id-1]
    itemValues = list(items.values())
    cart_data=[]
    for result in cartresult:
        json_data.append(dict(zip(row_headers,result)))

    sql = """INSERT INTO cartItems (product_id, productName, price, productInfoShort, productInfoLong, productImage) VALUES (%s, %s, %s, %s, %s, %s)"""
    val = (itemValues[0], itemValues[1], itemValues[2], itemValues[3], itemValues[4], itemValues[5])
    mycursor = mydb.cursor(buffered=True)
    mycursor.execute(sql, val)
    mydb.commit()
    return render_template('shoppingcart.html', countCart = len(json_data), currentUser = currentUser)

@app.route("/shoppingcart/checkout", methods=['GET', 'POST'])
def checkout():
    return render_template('shoppingcart.html', currentUser = currentUser)

@app.route("/shoppingcart/countItems", methods=['GET', 'POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def checkNumberOfItems():    
    cartJson_data = []
    mycursor = mydb.cursor(buffered=True)
    mycursor.execute("SELECT * FROM cartItems")
    
    cartrow_headers=[x[0] for x in mycursor.description]
    cartitems = mycursor.fetchall()
    for result in cartitems:
        cartJson_data.append(dict(zip(cartrow_headers,result)))
    return jsonify(cartJson_data)

@app.route("/shoppingcart/checkout/items", methods=['GET', 'POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def checkoutItems():
    cartJson_data = []
    mycursor = mydb.cursor(buffered=True)
    mycursor.execute("SELECT * FROM cartItems")

    cartrow_headers=[x[0] for x in mycursor.description]
    cartitems = mycursor.fetchall()
    for result in cartitems:
        cartJson_data.append(dict(zip(cartrow_headers,result)))
    return jsonify(cartJson_data)

@app.route("/shoppingcart/remove/<int:shoppingcart_id>", methods=['GET', 'POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
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

@app.route("/payment/complete/<string:paymentSuccessful>", methods=['GET', 'POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def completePayment(paymentSuccessful):
    print(currentUserId)
    if paymentSuccessful == 'true':
        if currentUser == {}:
            mycursor = mydb.cursor(buffered=True)
            mycursor.execute("DELETE FROM cartItems")
            return paymentSuccessful
        args = [currentUserId]
        mycursor = mydb.cursor(buffered=True)
        mycursor.callproc('addToOrderHistory', args)
        mycursor.close()
        mydb.commit()
    return paymentSuccessful

@app.route("/orderHistory/<int:user_id>", methods=['GET', 'POST'])
def orderHistory(user_id):
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

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/addproductsReal", methods=['GET', 'POST'])
@cross_origin(origin='localhost',headers=['Content-Type','Authorization'])
def addProductsReal():
    if request.method == 'POST':
        pname = request.form['pname']
        price = request.form['price']
        pinfos = request.form['pinfos']
        pinfol = request.form['pinfol']
        files = request.files.getlist('files[]')
        filenames = []
        fullpaths = []
        filename = secure_filename(files[0].filename)
        filenames.append(filename)
        filepath = 'static/img/'+filename
        file_fullPath = os.path.join(app.config['UPLOAD_FOLDER'],filename)
        if (allowed_file(filename) or filename == ''):
            if (file_fullPath == 'home/static/img/' ):
                sql = """INSERT INTO products (productName, price, productInfoShort, productInfoLong, productImage) VALUES (%s, %s, %s, %s, %s)"""
                val = (pname, price, pinfos, pinfol, 'static/img/defaultVacuum.jpg')
                mycursor = mydb.cursor(buffered=True)
                mycursor.execute(sql, val)
                mydb.commit()
                return render_template('addproducts.html', currentUser = currentUser, success = 'Product added!')
            else:
                files[0].save(file_fullPath)
                sql = """INSERT INTO products (productName, price, productInfoShort, productInfoLong, productImage) VALUES (%s, %s, %s, %s, %s)"""
                val = (pname, price, pinfos, pinfol, filepath)
                mycursor = mydb.cursor(buffered=True)
                mycursor.execute(sql, val)
                mydb.commit()
                sql = """SELECT product_id FROM products ORDER BY product_id DESC LIMIT 1;"""
                mycursor = mydb.cursor(buffered=True)
                mycursor.execute(sql)
                prodid = mycursor.fetchone()
                for i in range(len(files)):
                    filename = secure_filename(files[i].filename)
                    if (allowed_file(filename)):
                        filepath = 'static/img/'+filename
                        file_fullPath = os.path.join(app.config['UPLOAD_FOLDER'],filename)
                        files[i].save(file_fullPath)
                        fullpaths.append(filepath)
                        sql = """INSERT INTO productImages (product_id, productImage) VALUES (%s, %s)"""
                        val = (prodid[0], filepath)
                        mycursor = mydb.cursor(buffered=True)
                        mycursor.execute(sql, val)
                
                return render_template('addproducts.html', currentUser = currentUser, success = 'Product added!')
        else:
          return render_template('addproducts.html', currentUser = currentUser, wentWrong = 'Invalid file. File must be .png, .jpeg or .jpg')      
    else:
        return render_template('addproducts.html', currentUser = currentUser)


if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)
    mydb.close()