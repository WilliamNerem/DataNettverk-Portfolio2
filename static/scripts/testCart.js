displayCart()
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
            <div class="col-sm-3" id="cartId${product.shoppingcart_id}">
                <div class="card text-dark bg-light mb-3 h-100">
                    <img src="${product.productImage}" class"card-img-top" />
                    <div class="card-body">
                        <h5 class"card-title">${product.productName}</h3>
                        <h6 class="card-subtitle mb-2 text-muted">${product.price},-</h6>
                        <p class="card-text">${product.productInfoShort}</p>
                    </div>
                    <div class="card-footer" id="cartButtons${product.product_id}">
                        <button class="btn btn-outline-dark" onclick="deleteFromCart(${product.shoppingcart_id},${product.product_id})">-</button>
                        <h6 class="card-subtitle mb-2 text-muted" id="countInCart${product.product_id}">${count}</h6>
                        <button class="addAnotherToCart btn btn-outline-dark" value="${product.product_id}">+</button>
                    </div>
                </div>
            </div>
            `
            document.getElementById('renderContent').innerHTML = output;
        } 
        else {
            addedToCart.push(product.product_id)

            outputBtn = `
            <button class="btn btn-outline-dark" onclick="deleteFromCart(${product.shoppingcart_id},${product.product_id})">-</button>
            <h6 class="card-subtitle mb-2 text-muted" id="countInCart${product.product_id}">${count}</h6>
            <button class="addAnotherToCart btn btn-outline-dark" value="${product.product_id}">+</button>
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
}