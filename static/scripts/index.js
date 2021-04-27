fetch('http://127.0.0.1:5000/fetchProducts')
.then((res) => res.json())
.then((data) => {
    let output = '<h2>Products</h2>';
    data.forEach(function(product){
        output += `
            <div>
                <img src="${product.productImage}" />
                <h3>Name: ${product.productName}</h3>
                <p>Price: ${product.price}</p>
                <p>Info: ${product.productInfoShort}</p>
                <button class="showProduct" value="${product.product_id}">Show Info</button>
                <button class="addToCart" value="${product.product_id}">Add to cart</button>
 
            </div>
        `
    })
    document.getElementById('output').innerHTML = output;
    
    
    document.querySelectorAll('.showProduct').forEach(item => {
        item.addEventListener('click', getProductInfo)
    })

    document.querySelectorAll('.addToCart').forEach(item => {
        item.addEventListener('click', addToCart)
    })

    
     function getProductInfo(e) {
         e.preventDefault();

        let product_id_value = this.value;
    
        fetch(`http://127.0.0.1:5000/product/${product_id_value}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({product_id_value:product_id_value})
        })
        .then((res) => res.text())
        .then((data) => {
            console.log(data)

            window.location.replace("http://127.0.0.1:5000/product_info")

        })
        .catch((error) => console.log(error))

     }


     function addToCart(e) {
         e.preventDefault();

         console.log("add to cart is clicked")
     }

})
