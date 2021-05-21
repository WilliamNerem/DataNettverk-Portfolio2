let currentUserId = document.getElementById('currentUserId').innerHTML;

fetch(`https://localhost:5000/orderHistory/${currentUserId}`)
    .then((res) => res.json())
    .then((data) => {
        output = '';
        let addedToCart = []
        let total = 0
        let counter = 0
        currentDateAndTime = ''
        data.slice().reverse().forEach(function (product) {
            if (product.dateAndTime != currentDateAndTime) {
                currentDateAndTime = product.dateAndTime
                addedToCart = []
                counter = 0
                if (total == 0) {
                    output += `
                    <div class="display-flex"><h6 class="text-muted">${product.dateAndTime}</h6></div>
                    `
                } else {
                    output += `
                <div class="display-flex" style="justify-content: flex-end;"><h5>Total purchase: ${total},-</h5></div>
                <hr class="solid mb-5">
                <div class="display-flex"><h6 class="text-muted">${product.dateAndTime}</h6></div>
                `
                }

                total = 0
            }
            let count = 0
            for (let i = 0; i < addedToCart.length; i++) {
                if (addedToCart[i] == product.product_id) {
                    count++
                }
            }
            if (addedToCart.includes(product.product_id) == false) {
                count = 0
                data.forEach(function (idk) {
                    if (idk.dateAndTime == currentDateAndTime && idk.product_id == product.product_id) {
                        count++
                    }
                })
                addedToCart.push(product.product_id)
                sumProduct = count * product.price
                total += sumProduct
                output += `
            
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <h5>${product.productName}</h5>
                <span class="display-flex cart-price">
                    <div class="display-flex"><h6 class="text-muted">Price: ${product.price},-</h6></div>
                    <div class="display-flex"><h6 class="text-muted">Quantity: ${count}</h6></div>
                    <div class="display-flex"><h6 class="text-muted">Total: ${sumProduct},-</h6></div>
                </span>
            </li>
            `
            }
        })
        output += `<div class="display-flex" style="justify-content: flex-end;"><h5>Total purchase: ${total},-</h5></div>`
        document.getElementById('renderContent').innerHTML = output;
        checkItemsInCart();
    })