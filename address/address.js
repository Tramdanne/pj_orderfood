document.addEventListener("DOMContentLoaded", function() {
    const addressForm = document.getElementById("addressForm");
    const nameInput = document.getElementById("name");
    const phoneInput = document.getElementById("phone");
    const addressInput = document.getElementById("address");
    const detailedAddressInput = document.getElementById("detailed-address");
    const addressTypeInput = document.getElementById("address-type");
    const addressTypeButtons = document.querySelectorAll(".address-type-btn");

    // Tạo phần tử thông báo lỗi cho từng input
    function createErrorMessage(input, message) {
        let error = input.nextElementSibling;
        if (!error || !error.classList.contains("error-message")) {
            error = document.createElement("div");
            error.className = "error-message";
            input.after(error);
        }
        error.innerText = message;
    }

    // Xóa thông báo lỗi
    function clearErrorMessage(input) {
        const error = input.nextElementSibling;
        if (error && error.classList.contains("error-message")) {
            error.remove();
        }
    }

    // Xử lý chọn loại địa chỉ
    addressTypeButtons.forEach(button => {
        button.addEventListener("click", () => {
            addressTypeButtons.forEach(btn => btn.classList.remove("selected"));
            button.classList.add("selected");
            addressTypeInput.value = button.getAttribute("data-type");
            clearErrorMessage(addressTypeInput);
        });
    });

    // Kiểm tra dữ liệu nhập vào khi submit
    addressForm.addEventListener("submit", function(event) {
        event.preventDefault();

        let isValid = true;

        // Kiểm tra tên (2-8 từ)
        const nameValue = nameInput.value.trim();
        const nameWords = nameValue.split(" ");
        if (nameWords.length < 2 || nameWords.length > 8) {
            createErrorMessage(nameInput, "Full Name must be between 2 and 8 words.");
            isValid = false;
        } else {
            clearErrorMessage(nameInput);
        }

        // Kiểm tra số điện thoại (10 chữ số, bắt đầu bằng số 0)
        const phoneValue = phoneInput.value.trim();
        const phoneRegex = /^0\d{9}$/;
        if (!phoneRegex.test(phoneValue)) {
            createErrorMessage(phoneInput, "Phone Number must be 10 digits and start with 0.");
            isValid = false;
        } else {
            clearErrorMessage(phoneInput);
        }

        // Kiểm tra địa chỉ chung
        if (addressInput.value === "") {
            createErrorMessage(addressInput, "Please select an address.");
            isValid = false;
        } else {
            clearErrorMessage(addressInput);
        }

        // Kiểm tra địa chỉ chi tiết
        if (detailedAddressInput.value.trim() === "") {
            createErrorMessage(detailedAddressInput, "Detailed Address is required.");
            isValid = false;
        } else {
            clearErrorMessage(detailedAddressInput);
        }

        // Kiểm tra loại địa chỉ
        if (!addressTypeInput.value) {
            createErrorMessage(addressTypeInput, "Please select an address type (Home or Office).");
            isValid = false;
        } else {
            clearErrorMessage(addressTypeInput);
        }

        // Nếu tất cả các kiểm tra đều đúng, điều hướng đến trang thanh toán
        if (isValid) {
            window.location.href = "../payment-method/payment-method.html";
        }
    });
});
