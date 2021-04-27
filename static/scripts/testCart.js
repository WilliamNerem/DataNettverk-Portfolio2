idCounter = 0
itemsInCart = 0
function displayCart(){
    fetch('http://127.0.0.1:5000/shoppingcart/checkout/items')
    .then((res) => res.json())
    .then((data) => {

        itemsInCart = data.length;
        let output = `<p id="itemsInCart">${itemsInCart}</p>`



        data.forEach(function(product){
            idCounter += 1
        output += `
            <div id="cartId${idCounter}">
                
                <h3>Name: ${product.productName}</h3>
                <p>Price: ${product.price}</p>
                <p>Info: ${product.productInfoShort}</p>
                <form class='getProductInfo'>
                    <button type="submit" id="deleteOne" onclick="deleteFromCart(${idCounter})">Remove from cart</button>
                </form>
            </div>
        `
        })
        document.getElementById('output1').innerHTML = output;

    })
}

displayCart()

function deleteFromCart(product_id_value){
    event.preventDefault();
    console.log(product_id_value)
    fetch('http://127.0.0.1:5000/shoppingcart/remove/' + product_id_value)
    document.getElementById("cartId"+product_id_value).remove();
    itemsInCart -= 1
    document.getElementById("itemsInCart").innerHTML = itemsInCart
}


function getProductInfo(e) {
    e.preventDefault();
    let product_id_value = document.getElementById('product_id_2').value;
    console.log(product_id_value);

    fetch('http://127.0.0.1:5000/shoppingcart/' + product_id_value, {
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