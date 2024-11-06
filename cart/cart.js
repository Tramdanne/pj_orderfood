// Lấy sản phẩm từ localStorage
function getCartItems() {
    return JSON.parse(localStorage.getItem("cartItems")) || [];
}

// Lưu sản phẩm vào localStorage
function saveCartItems(items) {
    localStorage.setItem("cartItems", JSON.stringify(items));
}

// Hàm định dạng số tiền thành dạng "99.000đ"
function formatCurrency(value) {
    return value.toLocaleString("vi-VN") + "đ";
}

// Hiển thị các sản phẩm trong giỏ hàng
function renderCartItems() {
    const cartItems = getCartItems();
    const cartFooter = document.querySelector(".cart-footer");

    // Xóa các sản phẩm cũ
    document.querySelectorAll(".cart-item").forEach(item => item.remove());

    cartItems.forEach((item, index) => {
        const price = parseFloat(item.price);
        const quantity = parseInt(item.quantity);
        const itemTotalPrice = price * quantity;

        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
            <input type="checkbox" class="select-item" onchange="updateTotalAmount()">
            <img src="../asset/food/banhcuon.jpg" alt="Product Image">
            <div class="item-info">
                <p class="item-name">${item.name}</p>
                <p class="item-shop">Size: ${item.size}</p>
            </div>
            <div class="item-price" data-price="${price}">${formatCurrency(price)}</div>
            <div class="item-quantity">
                <button class="quantity-btn" onclick="updateQuantity('${item.name}', '${item.size}', -1)">-</button>
                <input type="text" value="${quantity}" readonly>
                <button class="quantity-btn" onclick="updateQuantity('${item.name}', '${item.size}', 1)">+</button>
            </div>
            <div class="item-total">${formatCurrency(itemTotalPrice)}</div>
            <button class="remove-btn" onclick="removeItem('${item.name}', '${item.size}')">Xóa</button>
        `;

        cartFooter.insertAdjacentElement("beforebegin", cartItem);
    });

    // Cập nhật tổng thanh toán ngay sau khi hiển thị các sản phẩm
    updateTotalAmount();
}

// Hàm cập nhật số lượng và tổng giá tiền khi thay đổi số lượng
function updateQuantity(name, size, change) {
    const cartItems = getCartItems();
    const item = cartItems.find(item => item.name === name && item.size === size);

    if (item) {
        item.quantity += change;

        // Giới hạn số lượng từ 1 đến 10
        if (item.quantity < 1) item.quantity = 1;
        if (item.quantity > 10) item.quantity = 10;

        saveCartItems(cartItems);
        renderCartItems();
    }
}

// Hàm xóa sản phẩm khỏi giỏ hàng
function removeItem(name, size) {
    const cartItems = getCartItems().filter(item => !(item.name === name && item.size === size));
    saveCartItems(cartItems);
    renderCartItems();
}

// Hàm cập nhật tổng thanh toán khi checkbox sản phẩm được chọn
function updateTotalAmount() {
    const cartItems = getCartItems();
    let totalAmount = 0;

    // Lấy tất cả các cart-item đã chọn (checkbox được tick)
    document.querySelectorAll(".cart-item").forEach((item, index) => {
        const checkbox = item.querySelector(".select-item");
        if (checkbox && checkbox.checked) { // Kiểm tra nếu checkbox được tick
            const quantity = cartItems[index].quantity;
            const price = parseFloat(cartItems[index].price);
            totalAmount += quantity * price; // Tính tổng dựa trên số lượng và đơn giá
        }
    });

    // Cập nhật tổng thanh toán hiển thị
    document.querySelector(".total-amount").textContent = formatCurrency(totalAmount);

    // Lưu tổng thanh toán vào sessionStorage để sử dụng trên trang thanh toán
    sessionStorage.setItem("totalAmount", totalAmount);
}

// Hàm điều hướng đến trang thanh toán
function redirectToPayment() {
    window.location.href = `../payment-method/payment-method.html`;
}

// Gán sự kiện cho nút "Mua Hàng"
document.getElementById("checkout-btn_1").onclick = redirectToPayment;

// Khởi tạo khi trang được tải
document.addEventListener("DOMContentLoaded", () => {
    renderCartItems();

    // Lấy giá trị subtotal từ sessionStorage và hiển thị lại
    const savedSubtotal = sessionStorage.getItem("totalAmount");
    if (savedSubtotal) {
        document.querySelector(".total-amount").textContent = formatCurrency(parseFloat(savedSubtotal));
    }
});
