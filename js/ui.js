class UI {
    constructor() {

    }


    showCourses(course, page) {
        let div = document.createElement('div');
        div.classList.add("col");
        // console.log(course)
        div.innerHTML = `
        <div class="card cardCourse mb-4" id="${course.id}">
			<img src="images/${course.image}" class="card-img-top" height="200" alt="${course.name}">
			<div class="card-body">
				<h5 class="card-title">${course.name}</h5>
				<p class="card-text text-muted">${course.description}</p>
                <div class="d-flex justify-content-between mt-2">
                    <div>
                        <img src="images/${course.author.image}" class="imgAuthor" alt="${course.author.name}"/>
                        <span class="authorName">${course.author.name}</span>
                    </div>
                    <div>
                        <span class="price">$${course.price.toFixed(2)}</span>
                    </div>
                </div>
			</div>
		</div>
        `
        page.appendChild(div);

    }


    generateCatAuthorMenu(items, element) {
        items.forEach(item => {
            let li = document.createElement('li');
            li.innerHTML = `
            <a class="dropdown-item" href="#">${item}</a>
            `
            element.appendChild(li);
        });
    }

    showInCarts(data) {
        //console.log(data)
        let div = document.createElement('div');
        div.classList.add('d-flex', 'justify-content-between', 'mt-2');
        div.setAttribute("id", data.id)
        div.innerHTML = `
            <div class="d-flex row ml-2">
              <div class="mr-2">
                <img src="images/${data.image}" height="80" width="80" alt="${data.name}"/>
              </div>
              <div pt-2>
                <p class="textBold">${data.name}</p>
                <p class="cart textBold">$ ${data.price}</p>
                <p class="text-muted remove">remove</p>
              </div>
            </div>
            <div class="quantity">
              <p><i class="textBold arrowup fa fa-angle-up fa-1x" aria-hidden="true"></i></p>
              <p class="cartQty textBold">${data.quantity}</p>
              <p><i class="textBold arrowdown fa fa-angle-down fa-1x" aria-hidden="true"></i></p>
            </div>
        `
        let cartItem1 = document.querySelector('.cartItem1');
        cartItem1.appendChild(div)

    }


    showItemsInOrders(item) {
        let div = document.createElement('div');
        div.classList.add('d-flex', 'row', 'ml-2', 'my-2');
        div.setAttribute('id', item.id);
        div.innerHTML = `
			<div>
				<img src="images/${item.image}" height="80" width="80" alt="${item.name}"/>
			</div>
			<div class="ml-3 courseDetails">
				<p>${item.name}</p>
				<p class="cartPrice">$${item.price}</p>
				<p>Qty: <span class="cartQuntity">${item.quantity}</span></p>
			</div>
        `

        let cartCourses = document.querySelector('.cartCourses');
        cartCourses.appendChild(div)
    }

}