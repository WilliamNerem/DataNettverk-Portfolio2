let output = '';
let currentUserId = document.getElementById('currentUserId').innerHTML;

fetch(`http://127.0.0.1:5000/orderHistory/${currentUserId}`)
.then((res) => res.json())
.then((data) => {
    data.forEach(function (product) {
        console.log(product)
        output += `
        <h5>${product.productName}</h5>
        <span class="display-flex cart-price">
            <div class="display-flex"><h6 class="text-muted">${product.price},-</h6></div>
        </span>
        `
        document.getElementById('renderContent').innerHTML = output;
    })
})