// Event listener for the filter buttons
document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
        // Add active class to the clicked button
        button.classList.add('active');
        // Call a function to filter products based on the clicked filter (implementation needed)
        filterProducts(button.id);
    });
});

// Event listener for the sort-order dropdown
document.getElementById('sort-order').addEventListener('change', function() {
    // Call a function to sort products based on the selected option (implementation needed)
    sortProducts(this.value);
});

// Placeholder function for filtering products
function filterProducts(filterType) {
    console.log(`Filtering products by: ${filterType}`);
    // Implement your filter logic here
}

// Placeholder function for sorting products
function sortProducts(order) {
    console.log(`Sorting products in order: ${order}`);
    // Implement your sorting logic here
}

// Pagination controls
document.getElementById('prev-page').addEventListener('click', () => {
    console
    // Call a function to go to the previous page (implementation needed)
    goToPreviousPage();
});

document.getElementById('next-page').addEventListener('click', () => {
    // Call a function to go to the next page (implementation needed)
    goToNextPage();
});

// Placeholder function for pagination
function goToPreviousPage() {
    console.log("Going to the previous page");
    // Implement pagination logic here
}

function goToNextPage() {
    console.log("Going to the next page");
    // Implement pagination logic here
}
// Lấy tất cả các nút lọc
const filterButtons = document.querySelectorAll('.sort-filter .filter-button');

// Lặp qua từng nút và thêm sự kiện click
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Xóa trạng thái active từ tất cả các nút
        filterButtons.forEach(btn => btn.classList.remove('active'));
        
        // Thêm trạng thái active cho nút vừa được nhấn
        button.classList.add('active');
        
        // Thêm mã logic xử lý cho từng nút tại đây nếu cần
    });
});
