let output = ''
let product_exists = document.getElementById('product_exists').innerHTML

if (product_exists == 'false') {
    output = `
    <div class="alert alert-info" role="alert">
    The item does not exist!
    </div>
    `
    document.getElementById('renderContent').innerHTML = output;
    
} else {

    fetch("http://127.0.0.1:5000/fetchCurrent")
    .then((res) => res.json())
    .then((data) => {
        console.log(data.productImage)
        output = `
            <h1 class="display-4"> ${data.productName}</h1>
            <p class="lead">${data.productInfoLong}</p>
            <img src="../${data.productImage}" class="img-thumbnail" />
            <div class="display-flex">
                <p class="lead">${data.price},-</p>
                <button class="addToCart btn btn-outline-dark" value="${data.product_id}">Add to cart</button>
            </div>
        `
        document.getElementById('renderContent').innerHTML = output;
    })

}