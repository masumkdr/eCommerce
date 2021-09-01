let user = new Users();
let navbar = document.querySelector('.navbar');
let footer = document.querySelector('.footer');
let cartheader = document.querySelector('.cartheader');
let navbarNav = document.querySelector('.navbar-nav');
let nameSection = document.querySelector('.nameSection');
let confirmPasswordSection = document.querySelector('.confirmPasswordSection');
let checkboxSection = document.querySelector('.checkboxSection');
let signInBtn = document.querySelector('.signInBtn');
let forgotSection = document.querySelector('.forgotSection');
let createAccountText = document.querySelector('.createAccountText');
let loginAccount = document.querySelector('.loginAccount');
let inputFields = document.querySelectorAll('.required');
let loginName = document.querySelector('#loginName');
let loginEmail = document.querySelector('#loginEmail');
let password = document.querySelector('#password');
let confirmPassword = document.querySelector('#confirmPassword');
let termsPrivacy = document.getElementById('signInPrivacy');
let forgotPassBtn = document.querySelector('.forgotPassBtn');
let allItems = document.querySelector('.allItems');
let btnGroup = document.querySelector('.btn-group');


let nameValid = false;
let emailValid = false;
let passwordValid = false;
let confirmPasswordValid = false;


//login page loading compontent
document.addEventListener("DOMContentLoaded", () => {
    navbar.classList.add("bg-info", "fixed-top");
    footer.style.display = "none"
    cartheader.style.display = "none";
    navbarNav.style.display = "none";
    let url = window.location.href;
    let mode = url.split('#')[1]

    if (mode == "signin") {
        SignInPageRender();
    }
})


// page switching by clicking on signin/signup
loginAccount.addEventListener("click", () => {
    console.log('clicked')
    let url = window.location.href;
    let mode = url.split('#')[1]
    console.log(mode)
    let mainUrl = url.split('#')[0]
    if (mode == "signin") {
        nameSection.style.display = "block"
        confirmPasswordSection.style.display = "block"
        checkboxSection.style.display = "block"
        signInBtn.innerHTML = "Sign Up"
        forgotSection.style.display = "none"
        createAccountText.innerHTML = "Have Account? Sign In"
        location.assign(`${mainUrl}#signup`)
        clearInputFileds();
    }
    if (mode == "signup" || mode == undefined) {
        SignInPageRender()
        //forgotSection.style.display = "none"
    }

})


function SignInPageRender() {
    let mainUrl = window.location.href.split('#')[0]
    nameSection.style.display = "none"
    confirmPasswordSection.style.display = "none"
    checkboxSection.style.display = "none"
    signInBtn.innerHTML = "Sign In"
    forgotSection.style.display = "block"
    createAccountText.innerHTML = "Create An Account"
    location.assign(`${mainUrl}#signin`)
    clearInputFileds();
}

function clearInputFileds() {
    loginEmail.value = "";
    loginName.value = "";
    password.value = "";
    confirmPassword.value = "";
    termsPrivacy.checked = false;
    loginName.parentElement.nextElementSibling.innerHTML = "";
    loginEmail.parentElement.nextElementSibling.innerHTML = "";
    password.parentElement.nextElementSibling.innerHTML = "";
    confirmPassword.parentElement.nextElementSibling.innerHTML = "";
    termsPrivacy.parentElement.nextElementSibling.innerHTML = ""
    nameValid = false;
    emailValid = false;
    passwordValid = false;
    confirmPasswordValid = false;
}



// validation through input fields
inputFields.forEach(eachField => {
    eachField.addEventListener('keyup', (e) => {
        let type = e.target.type;
        let id = e.target.id;
        let InValue = e.target.value;
        let nextEle = e.target.parentElement.nextElementSibling;
        validateInput(type, id, InValue, nextEle)
    })
})



//validation function
function validateInput(type, id, inValue, nextEle) {
    switch (type) {
        case "text":
            console.log(inValue)
            if ((inValue.length > 2) && (inValue.length <= 24)) {
                nextEle.innerHTML = ""
                nameValid = true;
            } else {
                nextEle.innerHTML = `Name should be between 2 to 24 character`;
                nameValid = false;
            }
            break;
        case "email":
            let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!regex.test(inValue)) {
                nextEle.innerHTML = "Email is not valid";
                emailValid = false
            } else {
                nextEle.innerHTML = "";
                emailValid = true;
            }
            break;
        case "password":
            let passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
            if (id == "confirmPassword") {
                let password = document.getElementById('password').value;
                if (password != inValue) {
                    nextEle.innerHTML = "Confirm Password does not Match with password";
                    confirmPasswordValid = false;
                } else {
                    nextEle.innerHTML = "";
                    confirmPasswordValid = true;
                }
            } else if (id == "password") {
                if (!passRegex.test(inValue)) {
                    nextEle.innerHTML = "Password Must be between 7 to  15 character with Number, text, specail character"
                    passwordValid = false;
                } else {
                    nextEle.innerHTML = ""
                    passwordValid = true;
                    let confirm_pass = document.getElementById('confirmPassword').value;
                    if (confirm_pass != inValue) {
                        confirmPassword.parentElement.nextElementSibling.innerHTML = "Confirm Password does not Match with password";
                        confirmPasswordValid = false;
                    } else {
                        confirmPassword.parentElement.nextElementSibling.innerHTML = "";
                        confirmPasswordValid = true;
                    }
                }
            }
            break;
        default:

    }
}


termsPrivacy.addEventListener('click', () => {
    if (!termsPrivacy.checked) {
        termsPrivacy.parentElement.nextElementSibling.innerHTML = "You must agree with terms & privacy policy to complete the sign up."
    } else {
        termsPrivacy.parentElement.nextElementSibling.innerHTML = ""
    }
})


//singin or signup submit action

signInBtn.addEventListener('click', (e) => {
    console.log(nameValid, emailValid, passwordValid, confirmPasswordValid)
    console.log(loginName.value, loginEmail.value, password.value, confirmPassword.value)
    if (!nameValid) {
        loginName.parentElement.nextElementSibling.innerHTML = "Name should be between 2 to 24 character";
    }
    if (!emailValid) {
        loginEmail.parentElement.nextElementSibling.innerHTML = "Email is not valid";
    }
    if (!passwordValid) {
        password.parentElement.nextElementSibling.innerHTML = "Password Must be between 7 to  15 character with Number, text, specail character";
    }
    if (!confirmPasswordValid) {
        confirmPassword.parentElement.nextElementSibling.innerHTML = "Confirm Password does not Match with password";
    }
    if (termsPrivacy.checked == false) {
        termsPrivacy.parentElement.nextElementSibling.innerHTML = "You must agree with terms & privacy policy to complete the sign up."
    }


    let mode = window.location.href.split('#')[1]

    let existUsers = user.getLocalStorageUsers();
    let id = existUsers.length + 1;
    let name = loginName.value;
    let email = loginEmail.value;
    let pass = password.value;
    let promoEmailAgree = document.getElementById('signInAgree').checked ? "yes" : "no";
    let termsPolicyAgree = document.getElementById('signInPrivacy').checked ? "yes" : "no";
    let cardInfo = {};
    let billing = {};
    let delivery = {};
    let existEmail = existUsers.find(userItem => userItem.email === email);

    if (mode == "signup" || mode == undefined) {
        if (nameValid && emailValid && passwordValid && confirmPassword && termsPrivacy.checked) {
            let newUser = new Users(id, email, name, pass, promoEmailAgree, termsPolicyAgree, cardInfo, billing, delivery);
            console.log(newUser)
            if (existEmail == undefined) {
                existUsers.push(newUser);
                user.saveToLocalStorateUsers(existUsers);
                clearInputFileds();
                location.assign('success.html');

            } else {
                //alert("Email address Alreday Exist!, Try with another email.")
                loginEmail.parentElement.nextElementSibling.innerHTML = "Email is already Registered, Try with another email";
            }
        }
    }


    if (mode == "signin") {
        console.log(existEmail)
        if (emailValid && passwordValid) {
            if (existEmail == undefined) {
                loginEmail.parentElement.nextElementSibling.innerHTML = "Email is not Registered";
            } else {
                if (existEmail.password != pass) {
                    password.parentElement.nextElementSibling.innerHTML = "Password is Incorrect, Try Again!";
                }
                else {
                    location.assign(`portal.html#${existEmail.id}`)
                }
            }
        }
    }
})


forgotPassBtn.addEventListener('click', (e) => {
  location.assign(`forgotpass.html`)
})






