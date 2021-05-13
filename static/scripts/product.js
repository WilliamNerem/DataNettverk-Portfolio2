let output = '';
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

    fetch("http://localhost:5000/fetchCurrent")
    .then((res) => res.json())
    .then((data) => {
        output = `
            <h1 class="display-4"> ${data.productName}</h1>
            <p class="lead">${data.productInfoLong}</p> `
            // <img src="../${data.productImage}" class="img-thumbnail" />
            // fetch("http://localhost:5000/fetchCurrentImage")
            // .then((res) => res.json())
            // .then((data) => {
            //     data.forEach(function(image) {
            //     output += `<img src="../${image.productImage}" class="img-thumbnail" />`
            //     })
            // })
        // output += `<div class="display-flex">
        //     <p class="lead">${data.price},-</p>
        //     <button class="addToCart btn btn-outline-dark" value="${data.product_id}">Add to cart</button>
        // </div>
        // `
        // document.getElementById('renderContent').innerHTML = output;

        // document.querySelectorAll('.addToCart').forEach(item => {
        //     item.addEventListener('click', addToCart)
        // })
        // function addToCart() {
        //     event.preventDefault();
        //     let prodId = this.value
        //     fetch("http://localhost:5000/shoppingcart/" + prodId)
        //     .then(() => {     
        //         checkItemsInCart();
        //     })
        // }
        return fetch("http://localhost:5000/fetchCurrentImage")
    })
    .then((res) => res.json())
    .then((data) => {
        data.forEach(function(image) {
        output += `<img src="../${image.productImage}" class="img-thumbnail" />`
        })
        return fetch("http://localhost:5000/fetchCurrent")
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
            fetch("http://localhost:5000/shoppingcart/" + prodId)
            .then(() => {     
                checkItemsInCart();
            })
        }
    })
    // fetch("http://localhost:5000/fetchCurrentImage")
    //         .then((res) => res.json())
    //         .then((data) => {
    //             data.forEach(function(image) {
    //             output += `<img src="../${image.productImage}" class="img-thumbnail" />`
    //             })
    //             document.getElementById('renderContent').innerHTML = output;
    //         })
    
    
}

function checkItemsInCart(){
    fetch('http://localhost:5000/shoppingcart/countItems')
    .then((res) => res.json())
    .then((data) => {
        itemsInCart = data.length;
        document.getElementById('shoppingCart').innerHTML = `${itemsInCart}`
    })

}