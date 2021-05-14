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

function onSuccess(googleUser){
    var profile = googleUser.getBasicProfile();
    id_token = googleUser.getAuthResponse().id_token;
    logged_in = profile;
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
      logged_in = null;
      remove_users();
      load_users();
    });
    id_token = null;
    window.location.replace('http://localhost:5000/')
}