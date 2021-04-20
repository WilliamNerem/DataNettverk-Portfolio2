document.getElementById('getProducts').addEventListener('click', getProducts);

function getProducts(){
    fetch('http://127.0.0.1:5000/fetchProducts')
    .then((res) => res.json())
    .then((data) => {
        console.log(data)
        let output = '<h2>Products</h2>'
        data.forEach(function(product){
            output += `
                <ul>
                    <li>Price: ${product.price}</li>
                    <li>Name: ${product.productName}</li>
                </ul>
            `
        })
        document.getElementById('output').innerHTML = output;
    })
}