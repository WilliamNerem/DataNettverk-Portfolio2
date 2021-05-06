displayCart();
let itemsInCart = 0;
checkItemsInCart();
let totalPrice = 0;
const discountForm = document.getElementById('discount-form');
const discountCode = document.getElementById('discount-code');
const validation = document.getElementById('validation');
const completePayment = document.getElementById('complete-payment');
const paymentConfirmation = document.getElementById('payment-confirmation');
let paymentSuccessful = 'false';

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


discountForm.onsubmit = () => {
    event.preventDefault();
    const code = discountCode.value

    if(code.toLowerCase() == 'vacuum100') {
        totalPrice = 0;
        document.getElementById('total-price').innerHTML = 'Total: ' + totalPrice + ',-';
        validation.style = 'color: green;'
        validation.innerHTML = 'Discount successfully added!';
    }
    else {
        validation.style = 'color: red;'
        validation.innerHTML = 'Invalid discount code';
    }
}

completePayment.onclick = () => {
    if (totalPrice == 0) {
        paymentConfirmation.style = 'color: green;';
        paymentConfirmation.innerHTML = 'Payment succsessful!'
        paymentSuccessful = 'true';
    }
    else {
        paymentConfirmation.style = 'color: red;';
        paymentConfirmation.innerHTML = 'An error occured: Could not complete transaction'
        paymentSuccessful = 'false';
    }

    fetch(`http://127.0.0.1:5000/payment/complete/${paymentSuccessful}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({paymentSuccessful:paymentSuccessful})
        })
        .then((res) => res.text())
        .then((data) => {})
        .then(() => {
            displayCart();
            checkItemsInCart();
        })
        .catch((error) => console.log(error))
}

function displayCart() {
    fetch('http://127.0.0.1:5000/shoppingcart/checkout/items')
        .then((res) => res.json())
        .then((data) => {
            let output = ``
            let addedToCart = []

            data.forEach(function (product) {
                let count = 0
                for (let i = 0; i < data.length; i++) {
                    if (data[i].product_id == product.product_id) {
                        count++
                    }
                }
                if (addedToCart.includes(product.product_id) == false) {
                    addedToCart.push(product.product_id)
                    output += `
                <li class="list-group-item d-flex justify-content-between align-items-center" id="cartId${product.shoppingcart_id}">
                    <h5>${product.productName}</h5>
                    <span class="display-flex cart-price">
                        <div class="display-flex"><h6 class="text-muted">${product.price},-</h6></div>
                        <div class="display-flex" id="cartButtons${product.product_id}">
                            <button class="btn-amount btn btn-outline-dark btn-sm" onclick="deleteFromCart(${product.shoppingcart_id},${product.product_id})">-</button>
                            <span class="badge bg-dark rounded-pill amount-of-product" id="countInCart${product.product_id}">${count}</span>
                            <button class="btn-amount addAnotherToCart btn btn-outline-dark btn-sm" value="${product.product_id}">+</button>
                        </div>
                    </span>
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

                    document.getElementById('cartButtons' + product.product_id).innerHTML = outputBtn
                }                    
            })
            
            if(data.length == 0) {
                document.getElementById('renderContent').innerHTML = output;
            }

            document.querySelectorAll('.addAnotherToCart').forEach(item => {
                item.addEventListener('click', addToCart)
            })

            function addToCart() {
                event.preventDefault();
                let prodId = this.value
                fetch("http://127.0.0.1:5000/shoppingcart/" + prodId)
                .then(() => {
                    displayCart();
                    checkItemsInCart();
                })
            }
        })


}

function deleteFromCart(shoppingCart_id, product_id) {
    event.preventDefault();
    fetch('http://127.0.0.1:5000/shoppingcart/remove/' + shoppingCart_id)
    if (document.getElementById('countInCart' + product_id).innerHTML == '1') {
        document.getElementById("cartId" + shoppingCart_id).remove();
    } else {
        sleep(10).then(() => {
            displayCart();
        })
        sleep(10).then(() => {
            checkItemsInCart();
        })
    }
    sleep(10).then(() => {
        checkItemsInCart();
    })
}

function checkItemsInCart() {
    fetch('http://127.0.0.1:5000/shoppingcart/countItems')
        .then((res) => res.json())
        .then((data) => {
            itemsInCart = data.length;
            document.getElementById('shoppingCart').innerHTML = `${itemsInCart}`

            totalPrice = 0;
            data.forEach(function (product) {
                totalPrice += product.price;
            })
            document.getElementById('total-price').innerHTML = 'Total: ' + totalPrice + ',-';

        })

}
sleep(10).then(() => {
    checkItemsInCart();
})