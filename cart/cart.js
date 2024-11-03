function updateQuantity(button, change) {
    const quantityInput = button.parentNode.querySelector('input');
    let quantity = parseInt(quantityInput.value);
    quantity = Math.max(1, quantity + change); // Giới hạn số lượng ít nhất là 1
    quantityInput.value = quantity;

    // Cập nhật số tiền cho sản phẩm
    const cartItem = button.closest('.cart-item');
    const price = parseInt(cartItem.querySelector('.item-price').getAttribute('data-price'));
    const total = price * quantity;
    cartItem.querySelector('.item-total').textContent = total.toLocaleString() + "đ";

    // Cập nhật tổng thanh toán
    updateTotalAmount();
}

function updateTotalAmount() {
    const totalAmountElement = document.querySelector('.total-amount');
    let totalAmount = 0;

    document.querySelectorAll('.cart-item').forEach(item => {
        const itemTotal = parseInt(item.querySelector('.item-total').textContent.replace(/\D/g, ''));
        totalAmount += itemTotal;
    });

    totalAmountElement.textContent = totalAmount.toLocaleString() + "đ";
}
