//Get URL-parameter (product.id)
const urlParam = new URLSearchParams(window.location.search);
const productId = urlParam.get("id");

//Fetch more info about single product
const productFromAPI = fetch(`https://dummyjson.com/products/${productId}`);

productFromAPI
    .then((response) => response.json())
    .then((result) => {
        //Print products to product-page
        const productDetails = document.querySelector(".product-details");

        const detailsImage = document.createElement("div");
        detailsImage.classList.add("product-details-images");
        detailsImage.innerHTML = `
                                    <div class="img-container">
                                        <img src="${result.images[0]}" alt="${result.title}">
                                    </div>
                                    <div class="thumbnails-wrapper">
                                        <div class="thumbnail-container">
                                            <img class="thumbnail" src="${result.images[0]}" alt="${result.title}">
                                        </div>
                                        <div class="thumbnail-container">
                                            <img class="thumbnail" src="${result.images[1]}" alt="${result.title}">
                                        </div>
                                        <div class="thumbnail-container">
                                            <img class="thumbnail" src="${result.images[2]}" alt="${result.title}">
                                        </div>
                                    </div>
                                `;
        productDetails.appendChild(detailsImage);

        const detailsText = document.createElement("div");
        detailsText.classList.add("product-details-text");
        detailsText.innerHTML = `
                                    <h2 class="product-name">${result.title}</h2>
                                    <span class="product-price">${result.price}€</span>
                                    <div class="product-rating"></div>
                                    <p class="product-description">${result.description}</p>
                                    <button type="button" class="btn add-cart-btn" data-id="${result.id}"><span class="material-symbols-outlined material-icons">shopping_bag</span>Add to bag</button>
                                `;
        productDetails.appendChild(detailsText);

        calculateRating(result);

        //Calculate rating
        function calculateRating(product) {
            const rating = Math.round(product.rating);
            const ratingContainer = document.querySelector(".product-rating");

            //Add filled stars = rounded rating
            for (let i = 0; i < rating; i++) {
                const ratingStar = document.createElement("span");
                ratingStar.innerHTML = `<i class="fas fa-star">`;
                ratingContainer.appendChild(ratingStar);
            }

            //If theres less than 5 filled star, add empty stars
            while (ratingContainer.childElementCount < 5) {
                const emptyRatingStar = document.createElement("span");
                emptyRatingStar.innerHTML = `<i class="far fa-star">`;
                ratingContainer.appendChild(emptyRatingStar);
            }
            console.log("product.rating", product.rating);
        }

        //Product image gallery
        const thumbnails = document.querySelectorAll(".thumbnail");
        const imgContainer = document.querySelector(".img-container");

        //Active border on the first thumbnail on load
        thumbnails[0].parentElement.classList.add("active");

        //Swap img source on the main image
        thumbnails.forEach((image) => {
            image.addEventListener("click", () => {
                imgContainer.querySelector("img").src = image.src;
                resetActiveState();
                image.parentElement.classList.add("active");
            });
        });

        //Reset active border
        function resetActiveState() {
            thumbnails.forEach((img) => {
                img.parentElement.classList.remove("active");
            });
        }

        //Add product to cart
        const addBtn = document.querySelector(".add-cart-btn");
        addBtn.addEventListener("click", addProductToCart);

        function addProductToCart() {
            const item = {
                id: result.id,
                title: result.title,
                price: result.price,
                img: result.thumbnail,
            };
            cart.push(item);
            //Save cart to local storage
            localStorage.setItem("cart", JSON.stringify(cart));
            //Print cart to DOM
            addProductsToDOM(cart);
        }
    });

//Toggle product cart
const cartIcon = document.querySelector(".cart-icon-fixed");
const productCart = document.querySelector(".product-cart");
const closeCartIcon = document.querySelector(".close-cart");

cartIcon.addEventListener("click", toggleProductCart);
closeCartIcon.addEventListener("click", toggleProductCart);

function toggleProductCart() {
    productCart.classList.toggle("show-cart");
}

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

//Remove item from product cart
cartList.addEventListener("click", removeProductFromCart);

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
