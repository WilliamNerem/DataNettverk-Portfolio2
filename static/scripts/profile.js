document.getElementById('logout').addEventListener('click', logout);
document.getElementById('orderHistory').addEventListener('click', orderHistory)

user = document.getElementById('currentUser').innerHTML
if (user == 'Admin'){
    document.getElementById('addProducts').style.display = "inline"
}

function logout() {

    fetch(`http://localhost:5000/logout`)
        .then((res) => res.json())
        .then((data) => {
            window.location.replace(`http://localhost:5000/`)
        })
}

function orderHistory() {
    window.location.replace(`http://localhost:5000/orderHistory`)
}