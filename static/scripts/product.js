fetch('http://127.0.0.1:5000/product/productid')
.then((res) => res.json())
.then((data) => {
    let output = `<h1> ${data.productName} </h1>`
    output += `
        <div>
        <img src="${data.productImage}" />
            <p>Price: ${data.price}</p>
            <p>Info: ${data.productInfoLong}</p>
        </div>
    `
    document.getElementById('output').innerHTML = output;
})

