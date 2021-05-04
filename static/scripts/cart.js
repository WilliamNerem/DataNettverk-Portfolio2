displayCart();
let itemsInCart = 0;
checkItemsInCart();

function displayCart(){
    fetch('http://127.0.0.1:5000/shoppingcart/checkout/items')
    .then((res) => res.json())
    .then((data) => {
        let output = ``
        let addedToCart = []

        data.forEach(function(product){
        let count = 0
        for (let i = 0; i < data.length; i++){
            if(data[i].product_id == product.product_id){
                count++
            }
        }
        if (addedToCart.includes(product.product_id) == false){
            addedToCart.push(product.product_id)
            output += `
            <li class="list-group-item d-flex justify-content-between align-items-center" id="cartId${product.shoppingcart_id}">
                <h5>${product.productName}</h3>
                <h6 class="text-muted">${product.price},-</h6>
                <div class="display-flex" id="cartButtons${product.product_id}">
                    <button class="btn-amount btn btn-outline-dark btn-sm" onclick="deleteFromCart(${product.shoppingcart_id},${product.product_id})">-</button>
                    <span class="badge bg-dark rounded-pill amount-of-product" id="countInCart${product.product_id}">${count}</span>
                    <button class="btn-amount addAnotherToCart btn btn-outline-dark btn-sm" value="${product.product_id}">+</button>
                </div>
            </li>
            `
            document.getElementById('renderContent').innerHTML = output;
        } 
        else {
            addedToCart.push(product.product_id)

            outputBtn = `
            <button class="btn-amount btn btn-outline-dark btn-sm" onclick="deleteFromCart(${product.shoppingcart_id},${product.product_id})">-</button>
            <span class="badge bg-dark rounded-pill amount-of-product" id="countInCart${product.product_id}">${count}</span>
            <button class="btn-amount addAnotherToCart btn btn-outline-dark btn-sm" value="${product.product_id}">+</button>
            `

            document.getElementById('cartButtons'+product.product_id).innerHTML = outputBtn
        }
        
        })
        
        document.querySelectorAll('.addAnotherToCart').forEach(item => {
            item.addEventListener('click', addToCart)
        })

        function addToCart() {
            event.preventDefault();
            let prodId = this.value
            fetch("http://127.0.0.1:5000/shoppingcart/" + prodId)
            sleep(10).then(() => {
                console.log("add to cart is clicked")
            })
            sleep(10).then(() => {
                displayCart()
            })
        }
    })

    
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function deleteFromCart(shoppingCart_id, product_id){
    event.preventDefault();
    fetch('http://127.0.0.1:5000/shoppingcart/remove/' + shoppingCart_id)
    if(document.getElementById('countInCart'+product_id).innerHTML.indexOf("1") !== -1){
        document.getElementById("cartId"+shoppingCart_id).remove();
    } else {
        sleep(10).then(() => {
            displayCart()
        })
    }
    checkItemsInCart();
}

function checkItemsInCart(){
    fetch('http://127.0.0.1:5000/shoppingcart/countItems')
    .then((res) => res.json())
    .then((data) => {
        itemsInCart = data.length;
        document.getElementById('shoppingCart').innerHTML = `${itemsInCart}`
    })

}