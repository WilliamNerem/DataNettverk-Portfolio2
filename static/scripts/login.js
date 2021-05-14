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