//Hämta städer
const fetchBtn = document.querySelector(".fetch-btn");
fetchBtn.addEventListener("click", fetchCities);

function fetchCities() {
    fetch("https://avancera.app/cities/")
        .then((response) => response.json())
        .then((result) => {
            const dataContainer = document.querySelector(".data-container");
            dataContainer.innerHTML = "";

            for (let i = 0; i < result.length; i++) {
                const city = document.createElement("div");
                city.classList.add("city-container");
                city.innerHTML = `
                                    <h3 class="city">${result[i].name}</h3>
                                    <p class="population">Befolkningsmängd: ${result[i].population}</p>
                                    <input type="button" class="btn delete-btn" value="Radera ${result[i].name}">
                                `;
                dataContainer.appendChild(city);

                //Radera-knapp för varje stad
                const deleteBtn = document.querySelectorAll(".delete-btn");
                deleteBtn[i].addEventListener("click", () => {
                    console.log("click");
                    fetch(`https://avancera.app/cities/${result[i].id}`, {
                        method: "DELETE",
                    }).then((response) => {
                        console.log(response);
                        fetchCities();
                    });
                });

                //Ändra befintlig stad
                const putBtn = document.querySelector(".put-btn");
                putBtn.addEventListener("click", editCity);

                function editCity() {
                    if (nameInput.value === result[i].name) {
                        fetch(`https://avancera.app/cities/${result[i].id}`, {
                            body: JSON.stringify({
                                id: result[i].id,
                                name: nameInput.value,
                                population: parseInt(populationInput.value),
                            }),
                            headers: {
                                "Content-Type": "application/json",
                            },
                            method: "PUT",
                        }).then((response) => {
                            console.log(response);
                            fetchCities();
                        });
                    }
                }
            }
        });
}

//Formulärvärden
const nameInput = document.querySelector("#name"),
    populationInput = document.querySelector("#population");

//Posta ny stad
const postBtn = document.querySelector(".post-btn");
postBtn.addEventListener("click", postCity);

function postCity() {
    fetch("https://avancera.app/cities/", {
        body: JSON.stringify({
            name: nameInput.value,
            population: parseInt(populationInput.value),
        }),
        headers: {
            "Content-Type": "application/json",
        },
        method: "POST",
    })
        .then((response) => response.json())
        .then((result) => {
            console.log(result);
            fetchCities();
        });
}
