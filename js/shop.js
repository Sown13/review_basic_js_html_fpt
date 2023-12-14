class Product {
    constructor(name, price, img, quantity) {
     this.name = name;
     this.price = price;
     this.img = img;
     this.quantity = quantity;
    }
}
let productList = [
    { name: 'book 1', price: 10000, img: '', quantity: 0},
    { name: 'book 2', price: 20000, img: '', quantity: 0},
    { name: 'book 3', price: 30000, img: '', quantity: 0},
    { name: 'book 4', price: 40000, img: '', quantity: 0},
    { name: 'book 5', price: 50000, img: '', quantity: 0},
    { name: 'book 6', price: 60000, img: '', quantity: 0}
]

let printProduct = "<table>" 
                + "<tr>" 
                + "<th>Number</th>"
                + "<th>Image</th>"
                + "<th>Name</th>"
                + "<th>Price/Unit</th>"
                + "<th>Quantity</th>"
                + "<th>Add to cart</th>"
                + "</tr>";
for(let i = 0; i < productList.length; i++) {
    printProduct += ("<tr>" 
                + "<td>" + (i+1) + "</td>"
                + "<td>" + productList[i].img + "</td>"
                + "<td>" + productList[i].name + "</td>"
                + "<td>" + productList[i].price + "</td>"
                + "<td>" + productList[i].quantity + "</td>"
                + "<td>" + `<button onclick='addProductToCart(${i})'>+</button>`
                + "</tr>");
}
printProduct += "</table>";
document.getElementById("shop").innerHTML = printProduct; 

let currentUser;
if (localStorage.getItem("currentUser") !== null) {
    currentUser = JSON.parse(localStorage.getItem("currentUser"));
    printCart();
} else {
    document.getElementById("cart").innerHTML = "Your must login first!";
}

function printCart() {
    let totalPrice = 0;
    let printProduct = "<table>" 
                + "<tr>" 
                + "<th>Number</th>"
                + "<th>Image</th>"
                + "<th>Name</th>"
                + "<th>Price/Unit</th>"
                + "<th>Quantity</th>"
                + "<th>Remove from cart</th>"
                + "</tr>";
    for(let i = 0; i < currentUser.cart.length; i++) {
        printProduct += ("<tr>" 
                    + "<td>" + (i+1) + "</td>"
                    + "<td>" + currentUser.cart[i].img + "</td>"
                    + "<td>" + currentUser.cart[i].name + "</td>"
                    + "<td>" + currentUser.cart[i].price + "</td>"
                    + "<td>" + currentUser.cart[i].quantity + "</td>"
                    + "<td>" + `<button onclick='removeProductFromCart(${i})'>-</button>`
                    + "</tr>");
        totalPrice += currentUser.cart[i].price;
    }
    printProduct +=  "<tr>" 
                + "<th>Total Price:</th>"
                + "<th></th>"
                + "<th></th>"
                + `<th>${totalPrice}</th>`
                + "<th></th>"
                + "<th></th>"
                + "</tr>";
    printProduct += "</table>";            
    document.getElementById("cart").innerHTML = printProduct; 
}

function save(user) {
    let userList = JSON.parse(localStorage.getItem('userList'));
    for (let i = 0; i < userList.length; i++) {
        if (user.username === userList[i].username) {
            userList[i] = user;
            localStorage.setItem('userList', JSON.stringify(userList));
            break;
        }
    }
}

function addProductToCart(productId) {
    currentUser.cart.push(productList[productId]);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    save(currentUser);
    printCart();
}

function removeProductFromCart(productId) {
    currentUser.cart.splice(productId,1);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    save(currentUser);
    printCart();
}