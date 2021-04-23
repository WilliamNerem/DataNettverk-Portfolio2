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
                <form class='getProductInfo'>
                    <input type="hidden" id="product_id_${product.product_id}" value="${product.product_id}">
                    <button type="submit" id="showProduct">Show Info${product.product_id}</button>
                </form>
            </div>
        `
    })
    document.getElementById('output').innerHTML = output;
    
    
    document.querySelectorAll('.getProductInfo').forEach(item => {
        item.addEventListener('submit', getProductInfo)
    })

    
    function getProductInfo(e) {
        e.preventDefault();
        let product_id_value = document.getElementById('product_id_2').value;
        console.log(product_id_value);
    
        fetch('http://127.0.0.1:5000/product/productid', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
            body: JSON.stringify({product_id_value:product_id_value})
        })
        .then((res) => res.json())
        .then((data) => console.log(data[product_id_value].product_id))
        .catch((error) => console.log(error))
    }
})
