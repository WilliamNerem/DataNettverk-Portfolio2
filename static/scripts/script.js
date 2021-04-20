document.getElementById('test').addEventListener('click', getText);
document.getElementById('getUsers').addEventListener('click', getUsers);
document.getElementById('getProducts').addEventListener('click', getProducts);

function getText(){
    console.log('Knappen er klikket')
    
    /* fetch('sample.txt')
    .then(function(res){
        return res.text();
    })
    .then(function(data){
        console.log(data);
    }) */

    fetch('sample.txt')
    .then((res) => res.text())
    .then((data) => {
        document.getElementById('output').innerHTML = data;
    })
    .catch((error) => console.log(error))


}

function getUsers(){
    
    fetch('users.json')
    .then((res) => res.json())
    .then((data) => {
        let output = '<h2>Users</h2>';
        console.log(data);

        data.forEach(function(user){
            output += `
                <ul>
                    <li>ID: ${user.id}</li>
                    <li>Name: ${user.name}</li>
                    <li>Age: ${user.age}</li>
                </ul>
            `;
        })
        document.getElementById('output').innerHTML = output;
    })

}

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