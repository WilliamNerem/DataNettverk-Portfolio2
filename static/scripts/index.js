fetch('http://127.0.0.1:5000/fetchProducts')
.then((res) => res.json())
.then((data) => {
    let output = '<h2>Products</h2>'
    data.forEach(function(product){
        output += `
            <div>
                <img src="{{ url_for('static', filename='${product.productImage}') }}" />
                <h3>Name: ${product.productName}</h3>
                <p>Price: ${product.price}</p>
                <p>Info: ${product.productInfoShort}</p>
                <p>Detailed Info: ${product.productInfoLong}</p>
            </div>
        `
    })
    document.getElementById('output').innerHTML = output;
})