class Store {
    constructor(id, name, image, author, price, quantity) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.author = author;
        this.price = price;
        this.quantity = quantity;
    }

    getLocalStorageData() {
        return (localStorage.getItem('cartCourses') == null) ? [] : JSON.parse(localStorage.getItem('cartCourses'));
    }

    saveToLocalStorate(courses) {
        localStorage.setItem('cartCourses', JSON.stringify(courses));
    }

    removeLocalStorageData() {
        localStorage.removeItem('cartCourses');
    }
}


class Users {
    constructor(id, email, name, password, agreed, termPolicyAgreed, cardInfo, billing, delivery) {
        this.id = id;
        this.email = email;
        this.name = name;
        this.password = password;
        this.agreed = agreed;
        this.termPolicyAgreed = termPolicyAgreed;
        this.cardInfo = cardInfo;
        this.billing = billing;
        this.delivery = delivery;
    }

    getLocalStorageUsers() {
        return (localStorage.getItem('users') == null) ? [] : JSON.parse(localStorage.getItem('users'));
    }

    saveToLocalStorateUsers(users) {
        localStorage.setItem('users', JSON.stringify(users));
    }
}


class Card {
    constructor(gateway, nameOnCard, cardNumber, exipreDate, cvc) {
        this.gateway = gateway;
        this.nameOnCard = nameOnCard;
        this.cardNumber = cardNumber;
        this.exipreDate = exipreDate;
        this.cvc = cvc;
    }
}


class Billing {
    constructor(bussiness, country, street, street2, city, state, postal, deliverySame) {
        this.bussiness = bussiness;
        this.country = country;
        this.street = street;
        this.street2 = street2;
        this.city = city;
        this.state = state;
        this.postal = postal;
        this.deliverySame = deliverySame;
    }
}

class Delivery {
    constructor(country, street, street2, city, state, postal, deliverySame) {
        this.country = country;
        this.street = street;
        this.street2 = street2;
        this.city = city;
        this.state = state;
        this.postal = postal;
        this.deliverySame = deliverySame;
    }
}


class Orders {
    constructor(id, courses, amount, date) {
        this.id = id;
        this.courses = courses;
        this.amount = amount;
        this.date = date;
    }

    getLocalStorageOrders() {
        return (localStorage.getItem('orders') == null) ? [] : JSON.parse(localStorage.getItem('orders'));
    }

    saveToLocalStorateUsers(orders) {
        localStorage.setItem('orders', JSON.stringify(orders));
    }
}