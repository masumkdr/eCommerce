let courses = new Courses();
//let store = new Store();
let cartItems = [];

let courseTitle = document.querySelector('.courseTitle');
let courseDesc = document.querySelector('.courseDesc');
let amountE = document.querySelector('.amountE');
let amount1 = document.querySelector('.amount1');
let courseAuthor = document.querySelector('.courseAuthor');
let authorName = document.querySelector('.authorName');
let aName = document.querySelector('.aName');
let gotoCart = document.querySelector('.gotoCart');
let gotoCart1 = document.querySelector('.gotoCart1');
let enroll = document.querySelectorAll('.enroll');


let url = window.location.href
let id = url.split('#')[1]


document.addEventListener("DOMContentLoaded", () => {
    //console.log(courseAuthor)

    courses.getCourses()
        .then(courses => {
            courses.forEach(course => {
                if (course.id == id) {
                    courseTitle.innerHTML = course.name;
                    courseDesc.innerHTML = course.description;
                    amountE.innerHTML = `At $${course.price}`;
                    amount1.innerHTML = `At $${course.price}`;
                    courseAuthor.src = `images/${course.author.image}`;
                    courseAuthor.alt = course.author.name;
                    authorName.innerHTML = course.author.name;
                    aName.innerHTML = course.author.name;
                }
            });
        })

})


for (i = 0; i < enroll.length; i++) {
    enroll[i].addEventListener('click', (e) => {
        cartItems = store.getLocalStorageData();
        cartItem = cartItems.find(item => item.id === id);
        if (cartItem == undefined) {
            courses.getCourses()
                .then(courses => {
                    courses.forEach(course => {
                        // console.log(id)
                        if (course.id == id) {
                            let courseItem = new Store(course.id, course.name, course.image, course.author.name, course.price, 1)
                            cartItems.push(courseItem);
                            ui.showInCarts(courseItem);
                            store.saveToLocalStorate(cartItems);
                            numOfCourse += 1;
                            cartAmount += course.price;
                            document.querySelector('.amount').innerHTML = cartAmount;
                            document.querySelector('.fa-shopping-cart').title = `You have ${numOfCourse} items with amount ${cartAmount} USD in cart`;
                            document.querySelector('.numOfCourse').innerHTML = numOfCourse;
                        }
                    })
                })
        } else {
            gotoCart.innerHTML = `This Item is aleady added in cart, Please goto <a href="#" data-toggle="modal" data-target="#myModal">Carts</a>`
            gotoCart1.innerHTML = `This Item is aleady added in cart, Please goto <a href="#" data-toggle="modal" data-target="#myModal">Carts</a>`
        }

        setTimeout(() => {
            gotoCart.innerHTML = "";
            gotoCart1.innerHTML = "";
        }, 3000)
    })
}

