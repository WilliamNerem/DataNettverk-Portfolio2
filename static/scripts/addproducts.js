document.getElementById('myform').addEventListener('submit', formSubmitted);
let arr = []

function formSubmitted() {
    event.preventDefault();

    let pname = document.getElementById('pname').value;
    let price = document.getElementById('price').value;
    let pinfos = document.getElementById('pinfos').value;
    let pinfol = document.getElementById('pinfol').value;
    let file = file.get
    const product = {
        pname: pname,
        price: price,
        pinfos: pinfos,
        pinfol: pinfol,
        file: file
    }

    fetch('http://localhost:5000/addproductsReal', {
        method: 'POST', 
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-type': 'application/json'
        },
        body: JSON.stringify(product)
    })
    .then((res) => res.text())
    .then((data) => console.log(data))
    document.getElementById('result').innerHTML = "<h3>Product added!</h3>"
    document.getElementById('myform').reset();

}