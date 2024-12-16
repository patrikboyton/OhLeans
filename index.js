//Get URL-parameter for mens/womens categories
let categoryURL = window.location.search.substring(1);

//Set standard value to fetch mens categories if empty URL parameter (index.html)
if (categoryURL == "") {
    categoryURL = "limit=16&skip=82";
}

let productsArray = [];

const productsFromAPI = fetch(`https://dummyjson.com/products?${categoryURL}`);

productsFromAPI
    .then((response) => response.json())
    .then((result) => {
        productsArray = result.products;

        //Print products to grid element
        updateProductGrid(productsArray);

        function updateProductGrid(products) {
            const grid = document.querySelector(".grid");
            grid.innerHTML = "";

            products.forEach((product) => {
                const newProduct = document.createElement("div");
                newProduct.classList.add("grid-item");
                newProduct.innerHTML = `
                                            <a href="product-page.html?id=${product.id}" class="item-link">
                                                <img src="${product.thumbnail}" alt="${product.title}" class="item-image">
                                                <h3 class="item-title">${product.title}</h3>
                                                <h4 class="item-price">${product.price}€</h4>
                                                
                                            </a>
                                        `;
                grid.appendChild(newProduct);
            });
        }

        //Sort functions
        //Default
        const sortByDefault = document.querySelector("#sort-default");

        sortByDefault.addEventListener("click", () => {
            updateProductGrid(productsArray);
        });

        //Price ascending
        const sortByLowest = document.querySelector("#sort-lowest-price");
        const ascendingPrice = productsArray
            .slice()
            .sort((a, b) => a.price - b.price);

        sortByLowest.addEventListener("click", () => {
            updateProductGrid(ascendingPrice);
        });

        //Price descending
        const sortByHighest = document.querySelector("#sort-highest-price");
        const descendingPrice = productsArray
            .slice()
            .sort((a, b) => b.price - a.price);

        sortByHighest.addEventListener("click", () => {
            updateProductGrid(descendingPrice);
        });

        //Search function
        const searchInput = document.querySelector(".search__input");

        searchInput.addEventListener("input", (event) => {
            if (event.target.value !== "") {
                const foundItems = productsArray.filter((product) =>
                    product.title
                        .toLocaleLowerCase()
                        .includes(event.target.value.toLocaleLowerCase())
                );
                updateProductGrid(foundItems);
            } else {
                updateProductGrid(productsArray);
            }
        });
    });

//Toggle searchbar
const searchButton = document.querySelector("#search-button");
const searchBar = document.querySelector("#search-bar");

searchButton.addEventListener("click", () => {
    searchBar.classList.toggle("show-search");
});
