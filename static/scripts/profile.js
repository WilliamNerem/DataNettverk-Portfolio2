document.getElementById('orderHistory').addEventListener('click', orderHistory)
checkItemsInCart();

function orderHistory() {
    window.location.replace(`https://localhost:5000/orderHistory`)
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
    fetch(`https://localhost:5000/logout`)
    .then(() => window.location.replace('https://localhost:5000/'))
}

if (document.getElementById('googleLogin').innerHTML == "True"){
    document.getElementById('defaultUserImage').style.display = "none"
    document.getElementById('userImageProfile').style.display = 'inline'
    document.getElementById('phonenumber').style.display = 'none'
}