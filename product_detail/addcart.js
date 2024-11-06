// Khai báo các biến cho các phần tử HTML
const sizeButtons = document.querySelectorAll(".size-selection button");
const quantityInput = document.querySelector(".quantity input");
const addToCartButton = document.querySelector(".add-to-cart");
const buyNowButton = document.querySelector(".buy-now");
const cartIcon = document.querySelector(".icons a[href='../cart/cart.html']");
let selectedSize = null;

// Chỉ cho phép chọn 1 size duy nhất
sizeButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Bỏ chọn tất cả các size
        sizeButtons.forEach(btn => btn.classList.remove("selected"));
        // Chọn size mới
        button.classList.add("selected");
        selectedSize = button.innerText;
    });
});

// Giới hạn số lượng từ 1 đến 10 và điều chỉnh tăng giảm số lượng
const decreaseButton = document.querySelector(".quantity .quantity-btn:first-of-type");
const increaseButton = document.querySelector(".quantity .quantity-btn:last-of-type");

decreaseButton.addEventListener("click", () => {
    let quantity = parseInt(quantityInput.value);
    if (quantity > 1) {
        quantity--;
        quantityInput.value = quantity;
    }
});

increaseButton.addEventListener("click", () => {
    let quantity = parseInt(quantityInput.value);
    if (quantity < 10) {
        quantity++;
        quantityInput.value = quantity;
    }
});

// Lấy sản phẩm từ localStorage
function getCartItems() {
    return JSON.parse(localStorage.getItem("cartItems")) || [];
}

// Lưu sản phẩm vào localStorage
function saveCartItems(items) {
    localStorage.setItem("cartItems", JSON.stringify(items));
}

// Thêm sản phẩm vào giỏ hàng
function addToCart() {
    if (!selectedSize) {
        alert("Please select a size");
        return;
    }

    const cartItems = getCartItems();
    const product = {
        name: "Vietnamese Steamed Rice Rolls",
        price: 99000,
        quantity: parseInt(quantityInput.value),
        size: selectedSize,
    };

    // Kiểm tra xem sản phẩm đã có trong giỏ chưa, nếu có thì cập nhật số lượng
    const existingItem = cartItems.find(item => item.name === product.name && item.size === product.size);
    if (existingItem) {
        existingItem.quantity += product.quantity;
    } else {
        cartItems.push(product);
    }

    saveCartItems(cartItems);

    // Tăng số lượng hiển thị trên icon giỏ hàng
    updateCartCount();
}

// Cập nhật số lượng trên icon giỏ hàng
function updateCartCount() {
    const cartItems = getCartItems();
    const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // Kiểm tra xem đã có badge chưa, nếu có thì cập nhật, nếu không thì thêm mới
    let cartBadge = cartIcon.querySelector(".cart-count");
    if (!cartBadge) {
        cartBadge = document.createElement("span");
        cartBadge.classList.add("cart-count");
        cartIcon.appendChild(cartBadge);
    }
    cartBadge.innerText = totalCount;
}

// Xử lý khi nhấn nút "Add to Cart"
addToCartButton.addEventListener("click", addToCart);

// Xử lý khi nhấn nút "Buy Now"
buyNowButton.addEventListener("click", () => {
    addToCart(); // Thêm sản phẩm vào giỏ hàng
    window.location.href = "../cart/cart.html"; // Chuyển đến trang giỏ hàng
});

// Cập nhật icon giỏ hàng khi tải trang
document.addEventListener("DOMContentLoaded", updateCartCount);
