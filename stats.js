fetch("https://dummyjson.com/products/category/mens-watches")
    .then((response) => response.json())
    .then((result) => {
        const ctx = document.querySelector("#myChart");
        const data = [];
        const labels = [];

        const watches = result.products;

        watches.forEach((watch) => {
            data.push(watch.price);
            labels.push(watch.title);
        });

        new Chart(ctx, {
            type: "bar",
            data: {
                labels: labels,
                datasets: [
                    {
                        label: "Price range, mens watches",
                        data: data,
                        backgroundColor: [
                            "#f0a441",
                            "#dbb788",
                            "#df84b1",
                            "#dae65e",
                            "#e1e79d",
                        ],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
            },
        });
    });
