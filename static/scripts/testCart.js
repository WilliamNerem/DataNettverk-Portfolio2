fetch('http://127.0.0.1:5000/shoppingcart/checkout/items')
.then((res) => res.json())
.then((data) => {
    let output = `<h1>`
    data.forEach(function(product){
    output += `
        ${product.productName} </h1>
        <div>
            <img src="${product.productImage}" />
            <h3>Name: ${product.productName}</h3>
            <p>Price: ${product.price}</p>
            <p>Info: ${product.productInfoShort}</p>
        </div>
    `
    })
    document.getElementById('output').innerHTML = output;
})