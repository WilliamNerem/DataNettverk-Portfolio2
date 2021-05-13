//idCounter = 0
let itemsInCart = 0;
var users = []
var logged_in = null

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
user = document.getElementById('currentUser').innerHTML
if (user == 'Admin'){
    document.getElementById('addProducts').style.display = "inline"
}

fetch('http://localhost:5000/fetchProducts')
.then((res) => res.json())
.then((data) => {
    let output = '<p class="lead">Owning a vacuum cleaner is essential to keep your home clean!</p>';
    data.forEach(function(product){
        output += `
            <div class="col-sm-3">
                <div class="card text-dark bg-light mb-3 h-100">
                    <input type="image" src="${product.productImage}" class="showProduct card-img-top" value="${product.product_id}" />
                    <div class="card-body">
                        <button class="showProduct card-title-btn" value="${product.product_id}"><h5 class"card-title">${product.productName}</h5></button>
                        <h6 class="card-subtitle mb-2 text-muted">${product.price},-</h6>
                        <p class="card-text">${product.productInfoShort}</p>
                    </div>
                    <div class="card-footer">
                        <button class="showProduct btn btn-outline-dark" value="${product.product_id}">Show Info</button>
                        <button class="addToCart btn btn-outline-dark" value="${product.product_id}">Add to cart</button>
                    </div>
                </div>
            </div>
        `
    })
    document.getElementById('renderContent').innerHTML = output;
    
    
    document.querySelectorAll('.showProduct').forEach(item => {
        item.addEventListener('click', getProductInfo)
    })

    document.querySelectorAll('.addToCart').forEach(item => {
        item.addEventListener('click', addToCart)
    })

    
     function getProductInfo(e) {
         e.preventDefault();

        let product_id_value = this.value;
    
        fetch(`http://localhost:5000/product/${product_id_value}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({product_id_value:product_id_value})
        })
        .then((res) => res.text())
        .then((data) => {
            console.log(data)

            window.location.replace(`http://localhost:5000/product/${product_id_value}`)

        })
        .catch((error) => console.log(error))

     }


     function addToCart() {
        event.preventDefault();
        let prodId = this.value
        fetch("http://localhost:5000/shoppingcart/" + prodId)
        .then(() => {     
            checkItemsInCart();
        })
     }
     checkItemsInCart();

})

var id_token = null;

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    id_token = googleUser.getAuthResponse().id_token;
    console.log(`ID Token to pass to server: ${id_token}`)

    logged_in = profile;

    // Render again to get the logged in users card
    // updated from the google profile
    remove_users();
    render_users(users);
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      logged_in = null;
      remove_users();
      load_users();
    });
    id_token = null;
}

function checkItemsInCart(){
    fetch('http://localhost:5000/shoppingcart/countItems')
    .then((res) => res.json())
    .then((data) => {
        itemsInCart = data.length;
        document.getElementById('shoppingCart').innerHTML = `${itemsInCart}`
    })

}