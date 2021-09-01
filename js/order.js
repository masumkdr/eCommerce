let courses = new Courses();
let user = new Users();
let order = new Orders();
let navbar = document.querySelector('.navbar');
let cartCourses = document.querySelector('.cartCourses');
let totalAmount = document.querySelector('.totalAmount');
let cartheader = document.querySelector('.cartheader');
let expandNext = document.querySelectorAll('.expandNext');
let couponInput = document.querySelector('.couponInput');
let totalAmountBtn = document.querySelector('.totalAmountBtn');
let btnCouponApply = document.querySelector('.btnCouponApply');
let couponText = document.querySelector('.couponText');
let error = document.querySelector('.error');
let disAmount = document.querySelector('.disAmount');
let paypalDiv = document.querySelector('.paypalDiv');
let creditDiv = document.querySelector('.creditDiv');
let finalSubmit = document.querySelector('.finalSubmit');
let deliverySection = document.querySelector('.deliverySection');
let billingSection = document.querySelector('.billingSection');
let cCode = document.querySelector('.cCode');
let footer = document.querySelector('.footer');
let inputCheckbox = document.querySelectorAll('.form-check-input');
let formControl = document.querySelectorAll('.form-control');



let finalAmount = 0;

document.addEventListener("DOMContentLoaded", loadOrderPageItems);

// default load page
function loadOrderPageItems() {
    navbar.classList.add("bg-info", "fixed-top");
    cartheader.style.display = "none"
    couponInput.style.display = "none";
    let cartData = store.getLocalStorageData();
    if (cartData.length == 0) {
        document.querySelector('.fullOrder').innerHTML = "";
        document.querySelector('.fullOrder').innerHTML = `
        <div class="card text-center mt-5 noOrderCard">
            <div class="card-body">
                <h5 class="card-title">My Carts</h5>
                <h5 class="mb-4">There are no items in your cart List</h5>
                <a href="courses.html" class="btn btn-outline-primary">Buy Courses</a>
            </div>
        </div>
        `;
        footer.classList.add('bottomFooter')
    }
    cartData.forEach(item => {
        console.log(item)
        ui.showItemsInOrders(item);
        finalAmount = cartAmount;
        totalAmount.innerHTML = `$${cartAmount.toFixed(2)}`
        totalAmountBtn.innerHTML = `$${cartAmount.toFixed(2)}`
    });
}


// exapnd items open/expand
expandNext.forEach(item => {
    item.addEventListener('click', (e) => {
        e.target.style.display = "none";
        if (e.target.classList.contains('couponbtn')) {
            e.target.parentElement.nextElementSibling.style.display = "flex";
        } else {
            e.target.parentElement.nextElementSibling.style.display = "block";
        }
    })
})


//coupon apply
btnCouponApply.addEventListener('click', (e) => {
    let couponIn = couponText.value;
    let couponAmount = 0;
    courses.getCoupons()
        .then(coupons => {
            couponCode = coupons.find(coupon => coupon.code === couponIn);
            if (couponCode == undefined) {
                error.innerHTML = "Invalid Coupon";
                error.classList.add("errorStyle");
                error.classList.remove("successStyle")
                couponAmount = 0;
                disAmount.innerHTML = `-$${couponAmount.toFixed(2)}`
                totalAmount.innerHTML = `$${(cartAmount - couponAmount).toFixed(2)}`
                totalAmountBtn.innerHTML = `$${(cartAmount - couponAmount).toFixed(2)}`
                finalAmount = cartAmount - couponAmount;
                cCode.innerHTML = ""
            } else {
                coupons.forEach(coupon => {
                    if (coupon.code == couponIn) {
                        console.log(coupon.code)
                        console.log(coupon.discount);
                        error.innerHTML = "";
                        couponAmount = (cartAmount * coupon.discount) / 100;
                        console.log(couponAmount)
                        disAmount.innerHTML = `-$${couponAmount.toFixed(2)}`
                        totalAmount.innerHTML = `$${(cartAmount - couponAmount).toFixed(2)}`
                        totalAmountBtn.innerHTML = `$${(cartAmount - couponAmount).toFixed(2)}`
                        finalAmount = cartAmount - couponAmount;
                        error.innerHTML = "Coupon Applied"
                        error.classList.remove("errorStyle")
                        error.classList.add("successStyle")
                        cCode.innerHTML = `(Code: ${couponIn})`
                        setTimeout(() => {
                            error.innerHTML = "";
                        }, 3000)
                    }
                })
            }
        })
})



// hide and show paypal and credit card payment option
console.log(inputCheckbox)
inputCheckbox.forEach(checkbox => {
    checkbox.addEventListener('click', (e) => {
        console.log(e.target.id)
        if (e.target.type == "radio") {
            if (e.target.id == "paypal") {
                paypalDiv.style.display = "block";
                document.getElementById('credtiCard').checked = false;
                creditDiv.style.display = "none";
                billingSection.style.display = "none";
                deliverySection.style.display = "none";
            }
            if (e.target.id == "credtiCard") {
                console.log(creditDiv)
                creditDiv.style.display = "block";
                document.getElementById('paypal').checked = false;
                paypalDiv.style.display = "none";
                billingSection.style.display = "block";
                document.getElementById('deliverAddress').checked = true;
            }
        }

        if (e.target.type == "checkbox") {
            console.log(e.target.id)
            if (e.target.id == "deliverAddress") {
                console.log(e.target)
                if (e.target.checked) {
                    deliverySection.style.display = "none";
                } else {
                    deliverySection.style.display = "block";
                }
            }
        }
    })
})



//input validation

formControl.forEach(formInput => {
    if (formInput.classList.contains("required")) {
        formInput.addEventListener('click', (e) => {
            let inputValue = e.target.value;
            let nextEle = e.target.parentElement.nextElementSibling;
            console.log(nextEle)
            if (inputValue == "") {
                nextEle.innerHTML = "Required"
            }
        })

        formInput.addEventListener('keyup', (e) => {
            let inputValue = e.target.value;
            let nextEle = e.target.parentElement.nextElementSibling;
            let id = e.target.id;
            let type = e.target.type;
            if (inputValue == '') {
                nextEle.innerHTML = "Required"
            }
            else {
                nextEle.innerHTML = ""
                validateInput(id, type, inputValue, nextEle);
            }
        })
    }

})

let signUpValid = false;
let creditCardValid = false;
let BillingValid = false;
let deliveryValid = false;
let emailValid = false;
let loginNameValid = false;
let passwordValid = false;
let streetValid = false;
let cardNumberVaild = false;
let cityValid = false;
let deliStreetValid = false;
let deliCityValid = false;
let expirationValid = false;
let cvcValid = false;
let postalValid = false;
let deliPostalValid = false;
let nameoncardValid = false;

// validate funtion
function validateInput(id, type, value, nextEle) {

    switch (type) {
        case "text":
            if (id == "cardNumber") {
                document.getElementById('cardNumber').value = value.replace(/[^a-z0-9]+/gi, '').replace(/(.{4})/g, '$1 ');
                if (value.length != 19) {
                    nextEle.innerHTML = "Card Number is invalid"
                } else {
                    console.log(value.length)
                    cardNumberVaild = true;
                    console.log(cardNumberVaild)
                }
            }
            if (id == "loginName" || id == "nameoncard" || id == "street" || id == "city" || id == "deliStreet" || id == "deliCity") {
                if ((value.length < 2) || (value.length > 10)) {
                    console.log(id)
                    nextEle.innerHTML = `${id} should be between 2 to 10 character`
                    if (id == "loginName") {
                        loginNameValid = false;
                    } else if (id == "nameoncard") {
                        nameoncardValid = false
                    } else if (id == "street") {
                        streetValid = false
                    } else if (id == "city") {
                        cityValid = false
                    } else if (id == "deliStreet") {
                        deliStreetValid = false
                    } else if (id == "deliCity") {
                        deliCityValid = false
                    }
                } else {
                    if (id == "loginName") {
                        loginNameValid = true;
                    } else if (id == "nameoncard") {
                        nameoncardValid = true
                    } else if (id == "street") {
                        streetValid = true
                    } else if (id == "city") {
                        cityValid = true
                    } else if (id == "deliStreet") {
                        deliStreetValid = true
                    } else if (id == "deliCity") {
                        deliCityValid = true
                    }
                }
            }
            if (id == "expiration") {
                //  document.getElementById('expiration').value = value.replace(/[^a-z0-9]+/gi, ' / ').replace(/(.{3})/g, '$1 ');
                if (value.length > 7) {
                    nextEle.innerHTML = "Expiration is not valid"
                    expirationValid = false
                } else {
                    expirationValid = true
                }
            }

            if (id == "couponCode") {
                if ((value.length > 0) && (value.length < 7)) {
                    btnCouponApply.removeAttribute('disabled')
                }
                else {
                    error.innerHTML = "Coupon code must be 6 character"
                    error.classList.remove("successStyle")
                    error.classList.add("errorStyle")
                    btnCouponApply.setAttribute('disabled', true)
                }
            }

            break;
        case "email":
            let regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!regex.test(value)) {
                nextEle.innerHTML = "Email is not valid";
                emailValid = false
            } else {
                emailValid = true
            }
            break;
        case "number":
            if ((value.length < 3) || (value.length > 4)) {
                nextEle.innerHTML = `${id} is not valid`
                if (id == "cvc") {
                    cvcValid = false;
                } else if (id == "postal") {
                    postalValid = false
                } else if (id == "deliPostal") {
                    deliPostalValid = false
                }
            } else {
                if (id == "cvc") {
                    cvcValid = true;
                } else if (id == "postal") {
                    postalValid = true
                } else if (id == "deliPostal") {
                    deliPostalValid = true
                }
            }

            break;
        case "password":
            let passRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
            if (!passRegex.test(value)) {
                nextEle.innerHTML = "Password Must be between 7 to  15 character with Number, text, specail character"
                passwordValid = false
            } else {
                passwordValid = true
            }
            break;
        default:
    }



    signUpValid = loginNameValid && emailValid && passwordValid;
    creditCardValid = nameoncardValid && cardNumberVaild && expirationValid && cvcValid;
    BillingValid = streetValid && cityValid && postalValid;
    deliveryValid = deliStreetValid && deliCityValid && deliPostalValid;
    // console.log(signUpValid, loginNameValid, emailValid, passwordValid)

    if (signUpValid && creditCardValid && BillingValid && document.getElementById("deliverAddress").checked) {
        finalSubmit.disabled = false;
    }

    if (document.getElementById("deliverAddress").checked) {
        finalSubmit.disabled = (signUpValid && creditCardValid && BillingValid) ? false : true;
    }

}


// final submit action
finalSubmit.addEventListener("click", (e) => {
    let existUsers = user.getLocalStorageUsers();
    let id = existUsers.length + 1;

    let name = document.getElementById('loginName').value;
    let email = document.getElementById('loginEmail').value;
    let existEmail = existUsers.find(userItem => userItem.email === email)
    console.log(existEmail)
    let password = document.getElementById('password').value;
    let agreed = document.getElementById('signInAgree').checked ? "yes" : "no";
    let termPolicyAgreed = "no";

    //save credit card info
    let gateway = "credit card";
    let nameOnCard = document.getElementById('nameoncard').value;
    let cardNumber = document.getElementById('cardNumber').value;
    let expireDate = document.getElementById('expiration').value;
    let cvc = document.getElementById('cvc').value;
    let newCard = (document.getElementById('saveCard').checked) ? new Card(gateway, nameOnCard, cardNumber, expireDate, cvc) : {};

    //save billing info
    let business = document.getElementById("busName").value;
    let countryEle = document.getElementById("country");
    let country = countryEle.options[countryEle.selectedIndex].innerHTML;
    let street = document.getElementById("street").value;
    let street2 = document.getElementById("street2").value;
    let city = document.getElementById("city").value;
    let state = document.getElementById("state").value;
    let postal = document.getElementById("postal").value;
    let deliverySame = document.getElementById("deliverAddress").checked ? 'yes' : "no";
    let billing = new Billing(business, country, street, street2, city, state, postal, deliverySame)

    // save deliery info
    let deliCountryEle = document.getElementById("deliCountry");
    let deliCountry = deliCountryEle.options[deliCountryEle.selectedIndex].innerHTML;
    let deliStreet = document.getElementById("deliStreet").value;
    let deliStreet2 = document.getElementById("deliStreet2").value;
    let deliCity = document.getElementById("deliCity").value;
    let deliState = document.getElementById("deliState").value;
    let deliPostal = document.getElementById("deliPostal").value;
    let delivery = (!document.getElementById("deliverAddress").checked) ? new Delivery(deliCountry, deliStreet, deliStreet2, deliCity, deliState, deliPostal) : {};

    let newUser = new Users(id, email, name, password, agreed, termPolicyAgreed, newCard, billing, delivery);
    console.log(newUser)
    if (existEmail == undefined) {
        existUsers.push(newUser);
        user.saveToLocalStorateUsers(existUsers);


        // save orders item
        let existOrders = order.getLocalStorageOrders();
        console.log(existOrders)
        let cartData = store.getLocalStorageData();
        let newOrder = new Orders(id, cartData, finalAmount, new Date());
        console.log(newOrder)
        existOrders.push(newOrder);
        order.saveToLocalStorateUsers(existOrders);
        store.removeLocalStorageData();
        location.assign('success.html');
    }
    else {
        //alert("Email address Alreday Exist!, Try with another email.")
        $('#emailExistModal').modal()  
    }



})





document.getElementById('deliverAddress').addEventListener('click', (e) => {
    if (e.target.checked) {
        finalSubmit.disabled = (signUpValid && creditCardValid && BillingValid) ? false : true;
    }
    if (e.target.checked == false) {
        finalSubmit.disabled = (signUpValid && creditCardValid && BillingValid && deliveryValid) ? false : true;
    }
})


