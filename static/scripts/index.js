idCounter = 0
itemsInCart = 0
document.getElementById('shoppingCart').innerHTML = `<button id="goToCart" onclick="displayCart()">${itemsInCart}</button>`

fetch('http://127.0.0.1:5000/fetchProducts')
.then((res) => res.json())
.then((data) => {
    let output = '<p class="lead">Owning a vacuum cleaner is essential to keep your home clean!</p>';
    data.forEach(function(product){
        output += `
            <div class="col-sm-3">
                <div class="card text-dark bg-light mb-3 h-100">
                    <img src="${product.productImage}" class"card-img-top" />
                    <div class="card-body">
                        <h5 class"card-title">${product.productName}</h3>
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
    
        fetch(`http://127.0.0.1:5000/product/${product_id_value}`, {
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

            window.location.replace("http://127.0.0.1:5000/product_info")

        })
        .catch((error) => console.log(error))

     }


     function addToCart() {
        event.preventDefault();
        let prodId = this.value
        fetch("http://127.0.0.1:5000/shoppingcart/" + prodId)
        console.log("add to cart is clicked")
        checkItemsInCart()
     }

})

function checkItemsInCart(){
    fetch('http://127.0.0.1:5000/shoppingcart/countItems')
    .then((res) => res.json())
    .then((data) => {
        console.log(data.length)
        itemsInCart = data.length + 1;
        idCounter = data[data.length - 1].shoppingcart_id + 1
        console.log(idCounter)
        document.getElementById('shoppingCart').innerHTML = `<button id="goToCart" onclick="displayCart()">${itemsInCart}</button>`
    })

}

//Legg alle items i cart i ett array og hent ut possisjonen. bruk det til å fjerne fra shoppingcart

function displayCart(){
    fetch('http://127.0.0.1:5000/shoppingcart/checkout/items')
    .then((res) => res.json())
    .then((data) => {
        let output = ``

        data.forEach(function(product){
        output += `
            <div id="cartId${idCounter}">
                
                <h3>Name: ${product.productName}</h3>
                <p>Price: ${product.price}</p>
                <p>Info: ${product.productInfoShort}</p>
                <form class='getProductInfo'>
                    <button type="submit" id="deleteOne" onclick="deleteFromCart(${idCounter})">Remove from cart</button>
                </form>
            </div>
        `
        })
        document.getElementById('output').innerHTML = output;

    })
}

function deleteFromCart(product_id_value){
    event.preventDefault();
    console.log("hei")
    console.log(product_id_value)
    console.log("hey")
    fetch('http://127.0.0.1:5000/shoppingcart/remove/' + product_id_value)
    document.getElementById("cartId"+product_id_value).remove();
    itemsInCart -= 1
    document.getElementById('shoppingCart').innerHTML = `<button id="goToCart" onclick="displayCart()">${itemsInCart}</button>`
}

