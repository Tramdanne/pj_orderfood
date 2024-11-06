let products = [
    { id: 1, name: "Flan Cake", price: "29000", sold: "1k Sold", rating: 4.8, reviews: 500, imgSrc: "../asset/food/banhflan.jpg" },
    { id: 2, name: "Banana Chips", price: "19000", sold: "800 Sold", rating: 4.5, reviews: 300, imgSrc: "../asset/food/banhep.jpg" },
    { id: 3, name: "Vietnamese Sandwich", price: "25000", sold: "1.2k Sold", rating: 4.9, reviews: 600, imgSrc: "../asset/food/banhmi.jpg" },
    { id: 4, name: "Steamed Rice Rolls", price: "30000", sold: "500 Sold", rating: 4.2, reviews: 200, imgSrc: "../asset/food/banhcuon.jpg" },
    { id: 5, name: "Rice Cake", price: "15000", sold: "2k Sold", rating: 4.7, reviews: 450, imgSrc: "../asset/food/banhcanh.jpg" },
    { id: 6, name: "Spring Rolls", price: "22000", sold: "700 Sold", rating: 4.3, reviews: 150, imgSrc: "../asset/food/banhflan.jpg" },
    { id: 7, name: "Fruit Chips", price: "18000", sold: "900 Sold", rating: 4.5, reviews: 350, imgSrc: "../asset/food/banhflan.jpg" },
    { id: 8, name: "Coconut Candy", price: "28000", sold: "600 Sold", rating: 4.6, reviews: 280, imgSrc: "../asset/food/banhflan.jpg" },
    { id: 9, name: "Dried Fish", price: "32000", sold: "300 Sold", rating: 4.1, reviews: 120, imgSrc: "../asset/food/banhflan.jpg" },
    { id: 10, name: "Peanut Candy", price: "17000", sold: "500 Sold", rating: 4.4, reviews: 210, imgSrc: "../asset/food/banhflan.jpg" }
];

const itemsPerPage = 6;
let currentPage = 1;

function renderProducts() {
    const productGrid = document.querySelector('.product-grid');
    productGrid.innerHTML = ''; // Clear existing products

    // Calculate the start and end index for products on the current page
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const productsToShow = products.slice(start, end);

    // Render each product in the product grid
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.imgSrc}" alt="Product Image">
            <h3><a href="../product_detail/product_detail.html?id=${product.id}">${product.name}</a></h3>
            <p class="price">${Number(product.price).toLocaleString("vi-VN")} VND</p>
            <p class="sold">${product.sold}</p>
            <div class="rating">
                <span>${product.rating}</span> ★★★★☆<br>
                <span>${product.reviews} Reviews</span>
            </div>
        `;
        productGrid.appendChild(productCard);
    });

    // Update page info
    document.getElementById('page-info').textContent = `Page ${currentPage}/${Math.ceil(products.length / itemsPerPage)}`;
}

// Sorting function based on selected order
function sortProducts(order) {
    products.sort((a, b) => {
        return order === 'asc' ? a.price - b.price : b.price - a.price;
    });
    currentPage = 1; // Reset to the first page after sorting
    renderProducts();
}

// Randomize products for Newest and Best Sellers buttons
function randomizeProducts() {
    products = products.sort(() => Math.random() - 0.5);
    currentPage = 1; // Reset to the first page after randomization
    renderProducts();
}

// Function to go to the next page
function nextPage() {
    if (currentPage < Math.ceil(products.length / itemsPerPage)) {
        currentPage++;
        renderProducts();
    }
}

// Function to go to the previous page
function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderProducts();
    }
}

// Event listeners for sorting and randomizing
document.getElementById('sort-order').addEventListener('change', function() {
    sortProducts(this.value);
});

document.getElementById('filter-new').addEventListener('click', randomizeProducts);
document.getElementById('filter-popular').addEventListener('click', randomizeProducts);

// Event listeners for pagination buttons
document.getElementById('next-page').addEventListener('click', nextPage);
document.getElementById('prev-page').addEventListener('click', prevPage);

// Initial render
renderProducts();
