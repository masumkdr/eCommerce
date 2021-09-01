let user = new Users();
let navbar = document.querySelector('.navbar');
let footer = document.querySelector('.footer');
let cartheader = document.querySelector('.cartheader');
let navbarNav = document.querySelector('.navbar-nav');
let error = document.querySelector('.error');
let resetInput = document.querySelector('#resetInput');
let forgotPass = document.querySelector('.forgotPass');
let loginLabel = document.querySelector('.loginLabel');
let inputGroup = document.querySelector('.input-group');
let title = document.querySelector('.title');
let backtoSignIn = document.querySelector('.backtoSignIn');
let alertText = document.querySelector('.alertText');
let alert = document.querySelector('.alert');
let closebtn = document.querySelector('.closebtn');
let inputValid = false;
let type = "email";
let inputValue = "";
let id = 0;
let code = 10000;


document.addEventListener("DOMContentLoaded", () => {
    navbar.classList.add("bg-info", "fixed-top");
    footer.style.display = "none"
    cartheader.style.display = "none";
    navbarNav.style.display = "none";
})



resetInput.addEventListener('keyup', (e) => {
    type = e.target.type;
    inputValue = resetInput.value;
    validateInput(type, inputValue);

})

function validateInput(type, input) {
    switch (type) {
        case "email":
            let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!regex.test(input)) {
                console.log(input)
                error.innerHTML = "Email is not valid";
                inputValid = false
            } else {
                console.log(input)
                error.innerHTML = "";
                inputValid = true;
            }
            break;
        case "number":
            if (inputValue.length != 6) {
                error.innerHTML = "Code must be 6 digit";
                inputValid = false;
            } else {
                error.innerHTML = "";
                inputValid = true;
            }
            break;
        case "password":
            let passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
            if (!passRegex.test(inputValue)) {
                error.innerHTML = "Password Must be between 7 to  15 character with Number, text, specail character"
                inputValid = false;
            } else {
                error.innerHTML = ""
                inputValid = true;
            }
        default:
    }
}



forgotPass.addEventListener('click', () => {
    if (inputValid) {
        if (type == "email") {
            let users = user.getLocalStorageUsers();
            let existEmail = users.find(userItem => userItem.email == inputValue);
            id = (existEmail != undefined) ? existEmail.id : 0;
            console.log(id)
            if (existEmail == undefined) {
                error.innerHTML = "Sorry!! This email address is not registered";
                alert.style.display = "none";
            } else {
                title.innerHTML = "Enter you Code Here"
                loginLabel.innerHTML = "Verification Code"
                forgotPass.innerHTML = "Confirm"
                resetInput.type = "number";
                resetInput.value = "";
                code = Math.floor((Math.random() * 1000000) + 1);
                console.log(code)
                alert.style.display = "block";
                alertText.innerHTML = "A Code has been sent to your email!!";
                inputValid = false;
            }
        }


        if (type == "number") {
            if (inputValue == code) {
                title.innerHTML = "Reset Your Password"
                loginLabel.innerHTML = "New Password"
                forgotPass.innerHTML = "Reset"
                resetInput.type = "password"
                resetInput.value = "";
                alert.style.display = "none";
                inputValid = false
            } else {
                error.innerHTML = `This code is not valid, Try again or <span> <a class="getNewCode"> Get New Code</a></span>`
                alert.style.display = "none";
            }
        }


        if (type == "password") {
            let users = user.getLocalStorageUsers();
            let existId = users.find(userItem => userItem.id === id);
            if (existId != undefined) {
                existId.password = inputValue;
            }
            user.saveToLocalStorateUsers(users);
            title.innerHTML = "Successful"
            loginLabel.innerHTML = "You have successfully changed your password. Please back to Sign in to login your account."
            inputGroup.style.display = "none"
            resetInput.value = "";
            forgotPass.style.display = "none";
            inputValid = false
            alert.style.display = "none";

        }
    }
})


backtoSignIn.addEventListener('click', () => {
    location.assign('login.html#signin')
})


error.addEventListener('click', (e) => {
    if (e.target.classList.contains('getNewCode')) {
        code = Math.floor((Math.random() * 1000000) + 1);
        console.log(code)
        error.innerHTML = "";
        alert.style.display = "block";
        alertText.innerHTML = "A new Code has been sent to your email !!";
        resetInput.value = "";
    }
})


closebtn.addEventListener('click', () => {
    alert.style.display = "none";
})