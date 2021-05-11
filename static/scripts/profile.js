document.getElementById('logout').addEventListener('click', logout);
document.getElementById('orderHistory').addEventListener('click', orderHistory)

function logout() {

    fetch(`http://127.0.0.1:5000/logout`)
        .then((res) => res.json())
        .then((data) => {
            window.location.replace(`http://127.0.0.1:5000/`)
        })
}

function orderHistory() {
    window.location.replace(`http://127.0.0.1:5000/orderHistory/0`)
}