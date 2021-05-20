output = '';
let product_exists = document.getElementById('product_exists').innerHTML;
let itemsInCart = 0;
checkItemsInCart();

if (product_exists == 'false') {
    output = `
    <div class="alert alert-info" role="alert">
    The item does not exist!
    </div>
    `
    document.getElementById('renderContent').innerHTML = output;

} else {

    fetch("https://localhost:5000/fetchCurrent")
        .then((res) => res.json())
        .then((data) => {
            output = `
            <h1 class="display-4"> ${data.productName}</h1>
            <p class="lead">${data.productInfoLong}</p> `
            return fetch("https://localhost:5000/fetchCurrentImage")
        })
        .then((res) => res.json())
        .then((data) => {
            output += `<div id="productsCarousel" class="carousel carousel-dark slide" data-bs-ride="carousel">
        <div class="carousel-inner">`
            let firstIteration = true;
            data.forEach(function (image) {
                if (firstIteration) {
                    output += `<div class="carousel-item active">
                <img src="../${image.productImage}" class="d-block w-75 carousel-img">
                </div>`
                    firstIteration = false;
                }
                else {
                    output += `<div class="carousel-item">
                <img src="../${image.productImage}" class="d-block w-75 carousel-img">
                </div>`
                }

            })
            output += `  </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#productsCarousel" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#productsCarousel" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>`
            return fetch("https://localhost:5000/fetchCurrent")
        })
        .then((res) => res.json())
        .then((data) => {
            output += `<div class="display-flex">
            <p class="lead">${data.price},-</p>
            <button class="addToCart btn btn-outline-dark" value="${data.product_id}">Add to cart</button>
            </div>
            `
            document.getElementById('renderContent').innerHTML = output;

            document.querySelectorAll('.addToCart').forEach(item => {
                item.addEventListener('click', addToCart)
            })
            function addToCart() {
                event.preventDefault();
                let prodId = this.value
                fetch("https://localhost:5000/shoppingcart/" + prodId)
                    .then(() => {
                        checkItemsInCart();
                    })
            }
        })
}
