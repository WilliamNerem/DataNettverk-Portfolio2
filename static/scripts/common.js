const currentUser = document.getElementById('currentUser').innerHTML
let output = '<a class="nav-link float-end" href="http://127.0.0.1:5000/login">Log in/Register</a>'

if (currentUser != '' || null || undefined) {
    output = '<a class="nav-link float-end" href="http://127.0.0.1:5000/profile">'+currentUser+'</a>';

}

document.getElementById('loginLink').innerHTML = output;