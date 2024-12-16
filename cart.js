//Check if there is a cart in localStorage
if (!localStorage.getItem("cart")) {
    localStorage.setItem("cart", "[]");
}

//Save cart into global variable
let cart = JSON.parse(localStorage.getItem("cart"));

const cartList = document.querySelector(".cart-list");
const totalElement = document.querySelector(".total-cost");

//Calculate cart total on load
calculateTotal(cart);

//Print cart to DOM
addProductsToDOM(cart);

//Remove item from product cart
cartList.addEventListener("click", removeProductFromCart);

function addProductsToDOM(products) {
    cartList.innerHTML = "";
    products.forEach((product) => {
        const newCartItem = document.createElement("div");
        newCartItem.classList.add("cart-product");
        newCartItem.innerHTML = `
                                    <img src="${product.img}" alt="${product.title}">
                                    <p>${product.title}</p>
                                    <span>${product.price}€</span>
                                    <span class="material-symbols-outlined remove-product-btn" id="remove-product-btn" data-id="${product.id}">delete</span>
                                `;
        cartList.appendChild(newCartItem);

        //Calculate total sum of cart
        calculateTotal(cart);
    });
}

function removeProductFromCart(event) {
    if (event.target.matches(".remove-product-btn")) {
        const currentProduct = event.target.dataset.id;
        const temp = cart.filter((product) => product.id != currentProduct);
        cart = temp;
        localStorage.setItem("cart", JSON.stringify(cart));

        //Update total sum + DOM after removal of product
        addProductsToDOM(cart);
        calculateTotal(cart);
    }
}

function calculateTotal(products) {
    let cartTotal = 0;
    products.forEach((num) => (cartTotal += parseFloat(num.price)));
    totalElement.textContent = cartTotal.toFixed(2);
}

//Toggle product cart
const cartIcon = document.querySelector(".cart-icon-fixed");
const productCart = document.querySelector(".product-cart");
const closeCartIcon = document.querySelector(".close-cart");

cartIcon.addEventListener("click", toggleProductCart);
closeCartIcon.addEventListener("click", toggleProductCart);

function toggleProductCart() {
    productCart.classList.toggle("show-cart");
}
