let itemsInCart = 0;
var users = []
var logged_in = null

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

fetch('https://localhost:5000/fetchProducts')
    .then((res) => res.json())
    .then((data) => {
        let output = '<p class="lead">Owning a vacuum cleaner is essential to keep your home clean!</p>';
        data.forEach(function (product) {
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

            fetch(`https://localhost:5000/product/${product_id_value}`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ product_id_value: product_id_value })
            })
                .then(() => {
                    window.location.replace(`https://localhost:5000/product/${product_id_value}`)

                })
                .catch((error) => console.log(error))

        }

        function addToCart() {
            event.preventDefault();
            let prodId = this.value
            fetch("https://localhost:5000/shoppingcart/" + prodId)
                .then(() => {
                    checkItemsInCart();
                })
        }
        checkItemsInCart();
    })