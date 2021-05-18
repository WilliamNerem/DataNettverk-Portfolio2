document.getElementById('formLogin').addEventListener('submit', login);
const result = document.getElementById('result');

user = document.getElementById('currentUser').innerHTML
if (user == 'Admin'){
    document.getElementById('addProducts').style.display = "inline"
}

function login() {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const user = {
        username: username,
        password: password,
    }

    fetch(`http://localhost:5000/login`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then((res) => res.json())
        .then((data) => {
            result.innerHTML = 'You are now logged in as ' + data.username
            window.location.replace(`http://localhost:5000/profile`)

        })
        .catch((error) => {
            result.style = 'color: red;';
            result.innerHTML = 'Wrong username or password!';
        })

}

var id_token = null;

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    ID = profile.getId();
    Name = profile.getName();
    Email = profile.getEmail();
    ImageUrl = profile.getImageUrl();
    id_token = googleUser.getAuthResponse().id_token;
    fetch(`http://localhost:5000/registerGoogle/${id_token}`)
    .then(() => {     
        window.location.replace(`http://localhost:5000/profile`)
    })
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    console.log(`ID Token to pass to server: ${id_token}`)

    logged_in = profile;

    // Render again to get the logged in users card
    // updated from the google profile
    remove_users();
    render_users(users);
}