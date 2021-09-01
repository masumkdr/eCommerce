let navbar = document.querySelector('.navbar');
let footer = document.querySelector('.footer');
let signIn = document.querySelector('.signIn');
let signUp = document.querySelector('.signUp');
let cardTtle = document.querySelector('.card-title');
let user = new Users();


document.addEventListener("DOMContentLoaded", () => {
    navbar.classList.add("bg-info", "fixed-top");
    footer.classList.add('bottomFooter')
    signIn.style.display = "none";
    signUp.innerHTML = "Logout";
    signUp.href = "index.html"
    let id = window.location.href.split('#')[1]
    let users = user.getLocalStorageUsers();
    users.forEach(user => {
        if(user.id == id) {
            cardTtle.innerHTML = `Hello ${user.name}`;
        }
    });
   
})