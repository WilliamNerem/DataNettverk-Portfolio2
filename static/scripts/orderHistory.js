let currentUserId = document.getElementById('currentUserId').innerHTML;

fetch(`https://localhost:5000/orderHistory/${currentUserId}`)
.then((res) => res.json())
.then((data) => {
    output = '';
    let addedToCart = []
    currentDateAndTime = ''
    data.slice().reverse().forEach(function (product) {
        if (product.dateAndTime != currentDateAndTime){
            currentDateAndTime = product.dateAndTime
            addedToCart = []
            output += `
            <div class="display-flex"><h6 class="text-muted">${product.dateAndTime}</h6></div>
            `
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
                if (idk.dateAndTime == currentDateAndTime && idk.product_id == product.product_id){
                    count ++
                }
            })
            addedToCart.push(product.product_id)
            output += `
            
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <h5>${product.productName}</h5>
                <span class="display-flex cart-price">
                    <div class="display-flex"><h6 class="text-muted">${product.price},-</h6></div>
                    <div class="display-flex"><span class="badge bg-dark rounded-pill amount-of-product">${count}</span>
                </span>
            </li>
            `
        }
    })
    document.getElementById('renderContent').innerHTML = output;
    checkItemsInCart();
})