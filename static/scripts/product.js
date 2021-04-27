fetch("http://127.0.0.1:5000/fetchCurrent")
.then((res) => res.json())
.then((data) => {
    let output = `<h2 class="display-2"> ${data.productName} </h2><p class="lead">${data.productInfoLong}</p>`
    output += `
        <div>
        <img src="${data.productImage}" />
            <p>Price: ${data.price}</p>
        </div>
    `
    document.getElementById('renderContent').innerHTML = output;
})

