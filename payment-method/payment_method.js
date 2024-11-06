document.addEventListener("DOMContentLoaded", function() {
    // Lấy giá trị totalAmount từ sessionStorage
    const totalAmount = sessionStorage.getItem("totalAmount");

    // Kiểm tra và hiển thị totalAmount nếu tồn tại
    if (totalAmount) {
        document.getElementById("subtotal").textContent = parseFloat(totalAmount).toLocaleString("vi-VN") + "đ";
    } else {
        document.getElementById("subtotal").textContent = "0đ"; // Giá trị mặc định nếu không có totalAmount
    }
});
