document.getElementById('formReg').addEventListener('submit', regUser);
let userExists = false;

function regUser() {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    const newUser = {
        username: username,
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
        password: password,
    }

    fetch(`http://127.0.0.1:5000/fetchUsers`)
        .then((res) => res.json())
        .then((data) => {
            userExists = false;
            data.forEach(function (user) {
                console.log(user.username)

                if (user.username == newUser.username) {
                    userExists = true;
                }
            })

        })
        .then(() => {

            if (!userExists) {
                fetch(`http://127.0.0.1:5000/register`, {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json, text/plain, */*',
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(newUser)
                })
                    .then((res) => res.text())
                    .then((data) => {

                        console.log('New user added!')

                    })
                    .catch((error) => console.log(error))
            }
            else {
                console.log('ERROR!: User exists!')
            }
        })
}
