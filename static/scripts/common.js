const currentUser = document.getElementById('currentUser').innerHTML
const googleLogin = document.getElementById('googleLogin').innerHTML
const currentUserImage = document.getElementById('currentUserImage').innerHTML
let output = '<a class="nav-link float-end" href="https://localhost:5000/login">Log in/Register</a>'
console.log(currentUserImage)
console.log(googleLogin)
if(googleLogin == 'True') {
    output = `<a class="nav-link float-end" href="https://localhost:5000/profile">
        <img id="userImage" src="${currentUserImage}" width="16" height="16" style="border-radius: 50%;" alt=""></img>
        `+ currentUser + `
        </a>
    `;
} else if (currentUser != '' || null || undefined) {
    output = `<a class="nav-link float-end" href="https://localhost:5000/profile">
        <svg xmlns="https://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
        </svg>
        `+ currentUser + `
        </a>
    `;

}

if (currentUser == 'admin') {
    document.getElementById('addProducts').style.display = "inline"
}

function checkItemsInCart(){
    fetch('https://localhost:5000/shoppingcart/countItems')
    .then((res) => res.json())
    .then((data) => {
        itemsInCart = data.length;
        document.getElementById('shoppingCart').innerHTML = `${itemsInCart}`
    })

}

document.getElementById('loginLink').innerHTML = output;