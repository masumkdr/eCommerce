let body = document.getElementsByTagName("BODY")[0];
let nav = document.createElement('nav');
let store = new Store();
let ui = new UI();
// nav.classList.add("navbar", "navbar-expand-lg", "fixed-top", "navbar-dark", "bg-info", "mb-5");
nav.classList.add("navbar", "navbar-expand-lg", "navbar-dark");

let cartData = store.getLocalStorageData();
let numOfCourse = 0;
let cartAmount = 0;




nav.innerHTML = `
<div class="container">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" href="./index.html">Turnover</a>

    <div class="d-flex">
        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
                <li class="nav-item mr-2">
                    <a class="nav-link text-light active" aria-current="page" href="./courses.html">Courses</a>
                </li>
                <li class="nav-item mr-2">
                    <a class="nav-link text-light" href="./order.html">Orders</a>
                </li>
                <li class="nav-item mr-2">
                    <a class="nav-link text-light signIn" href="./login.html#signin">Sign In</a>
                </li>
                <li class="nav-item mr-5">
                    <a class="nav-link btn text-light signUp" href="./login.html#signup" tabindex="-1">Sign Up</a>
                </li>
            </ul>
        </div>
    </div>
    <div class="cartheader">
        <button type="button" class="btn text-light position-relative" data-toggle="modal" data-target="#myModal">
            <i class="fa fa-shopping-cart fa-2x text-dark" aria-hidden="true" data-bs-toggle="tooltip"
                data-bs-placement="top" title="You have ${numOfCourse} items with amount ${cartAmount} USD in cart"></i>
            <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger numOfCourse">${numOfCourse}</span>
    </div>
</div>
`

let div = document.createElement('div');
div.innerHTML = `
<div id="myModal" class="modal come-from-modal right fade" role="dialog">
  <div class="modal-dialog">
    <!-- Modal content-->
    <div class="modal-content">
       <i class="fa fa-window-close fa-2x close" data-dismiss="modal" aria-hidden="true"></i>
       
      <div class="modal-body">
        <h4 class="text-center my-3 textBold">Your Cart</h4>
        <div class="cartItem1 mt-3">

          

        </div>
        <div class="text-center mt-5">
          <h5 class="textBold">Your Total : $ <span class="amount">${cartAmount}</span></h5>
          <button class="btn btn-info btn-lg px-5 clearCart mt-2">Clear Cart</button>
          <button class="btn btn-info btn-lg px-5 checkout mt-2" href="./order.html">Checkout</button>
        </div>
       
      </div>
    
    </div>

  </div>
</div>
`


body.prepend(div);
body.prepend(nav);


if (cartData.length > 0) {
    cartData.forEach(data => {
       // console.log(data)
        numOfCourse += data.quantity;
        cartAmount += data.quantity * data.price;
        ui.showInCarts(data);
        document.querySelector('.amount').innerHTML = cartAmount.toFixed(2);
        document.querySelector('.fa-shopping-cart').title = `You have ${numOfCourse} items with amount ${cartAmount} USD in cart`;
        document.querySelector('.numOfCourse').innerHTML = numOfCourse;
    });
}



let cartItem1 = document.querySelector('.cartItem1');
cartItem1.addEventListener("click", (e) => {
    if (e.target.classList.contains('remove') || e.target.classList.contains("arrowup") || e.target.classList.contains('arrowdown')) {
        let preEle = e.target.parentElement.parentElement.parentElement;
        let id = preEle.getAttribute("id");
        let cartData = store.getLocalStorageData();
        cartData.forEach(data => {
            if (data.id == id) {
                if (e.target.classList.contains('remove')) {
                    numOfCourse -= data.quantity;
                    cartAmount -= data.quantity * data.price;
                    cartData.splice(cartData.indexOf(data), 1);
                    preEle.remove();
                }
                if (e.target.classList.contains('arrowup')) {
                    numOfCourse = data.quantity + 1;
                    cartAmount += data.price;
                    data.quantity += 1;
                    console.log(e.target.parentElement.nextElementSibling.innerHTML)
                    e.target.parentElement.nextElementSibling.innerHTML = parseInt(e.target.parentElement.nextElementSibling.innerHTML) +1;
                }
                if (e.target.classList.contains('arrowdown')) {
                    numOfCourse = data.quantity - 1;
                    cartAmount -= data.price;
                    data.quantity -= 1;
                    e.target.parentElement.previousElementSibling.innerHTML = parseInt(e.target.parentElement.previousElementSibling.innerHTML) - 1;
                    if (data.quantity < 1) {
                        cartData.splice(cartData.indexOf(data), 1);
                        preEle.remove();
                    }
                }

            }
        })
        store.saveToLocalStorate(cartData)
        document.querySelector('.amount').innerHTML = cartAmount.toFixed(2);
        document.querySelector('.fa-shopping-cart').title = `You have ${numOfCourse} items with amount ${cartAmount} USD in cart`;
        document.querySelector('.numOfCourse').innerHTML = numOfCourse;

    }
})

let clearCart = document.querySelector('.clearCart');
clearCart.addEventListener('click', (e) => {
    store.removeLocalStorageData();
    document.querySelector('.amount').innerHTML = 0;
    document.querySelector('.fa-shopping-cart').title = `You have 0 items with amount 0 USD in cart`;
    document.querySelector('.numOfCourse').innerHTML = 0;
    cartItem1.innerHTML = "";
})

let checkout = document.querySelector('.checkout');
checkout.addEventListener('click', () => {
    location.href = "order.html"
})