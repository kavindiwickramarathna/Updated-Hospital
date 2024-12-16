// Retrieve cart data from localStorage
const cart = JSON.parse(localStorage.getItem("cart")) || [];


function updateOrderSummary() {
    const orderSummaryBody = document.getElementById("order-summary-body");
    const orderTotalPrice = document.getElementById("order-total-price");

   
    orderSummaryBody.innerHTML = "";

    let total = 0;
    cart.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${item.price}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        orderSummaryBody.appendChild(row);
        total += item.price * item.quantity;
    });

    orderTotalPrice.textContent = `$${total.toFixed(2)}`;
}


updateOrderSummary();


const addToFavouritesBtn = document.getElementById("add-to-favourites");
const applyFavouritesBtn = document.getElementById("apply-favourites");
const payButton = document.getElementById("pay-button");
const orderTableBody = document.getElementById("order-summary-body");
const orderTotalPrice = document.getElementById("order-total-price");
const fullNameInput = document.getElementById("full-name");
const addressInput = document.getElementById("address");
const postalCodeInput = document.getElementById("postal-code");
const phoneInput = document.getElementById("phone-number");
const paymentMethodSelect = document.getElementById("payment-method");
const checkoutForm = document.getElementById("checkout-form");


function saveToFavourites() {
    const orderSummary = getOrderSummary();

  
    localStorage.setItem("favourites", JSON.stringify(orderSummary));

    
    alert("Order and details saved to favourites!");
}


function applyFavourites() {
    const favouriteOrder = JSON.parse(localStorage.getItem("favourites")); 
    if (favouriteOrder) {
      
        orderTableBody.innerHTML = ""; 
        favouriteOrder.items.forEach((item) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.price}</td>
                <td>$${item.total.toFixed(2)}</td>
            `;
            orderTableBody.appendChild(row);
        });

        
        orderTotalPrice.textContent = `$${favouriteOrder.totalPrice.toFixed(2)}`;

       
        fullNameInput.value = favouriteOrder.customerDetails.fullName || "";
        addressInput.value = favouriteOrder.customerDetails.address || "";
        postalCodeInput.value = favouriteOrder.customerDetails.postalCode || "";
        phoneInput.value = favouriteOrder.customerDetails.phone || "";
        paymentMethodSelect.value = favouriteOrder.customerDetails.paymentMethod || "";

        alert("Favourites applied successfully!");
    } else {
        alert("No favourites found!");
    }
}


function getOrderSummary() {
    const items = [];
    let totalPrice = 0;

    
    const rows = orderTableBody.querySelectorAll("tr");
    rows.forEach((row) => {
        const cells = row.querySelectorAll("td");
        const name = cells[0].textContent;
        const quantity = parseInt(cells[1].textContent);
        const price = parseFloat(cells[2].textContent.replace("$", ""));
        const total = quantity * price;
        items.push({ name, quantity, price, total });
        totalPrice += total;
    });

    
    const customerDetails = {
        fullName: fullNameInput.value,
        address: addressInput.value,
        postalCode: postalCodeInput.value,
        phone: phoneInput.value,
        paymentMethod: paymentMethodSelect.value,
    };

    return { items, totalPrice, customerDetails };
}


checkoutForm.addEventListener("submit", (event) => {
    event.preventDefault(); 

    const fullName = fullNameInput.value;
    const address = addressInput.value;

    
    const submitButton = document.activeElement.id;

    if (submitButton === "pay-button") {
        
        alert(`Thank you for your purchase, ${fullName}! Your order will be shipped to: ${address}.`);

        
        localStorage.removeItem("cart");
        window.location.href = "index.html";
    } else {
        alert("Order saved but not submitted for payment.");
    }
});


addToFavouritesBtn.addEventListener("click", saveToFavourites);


applyFavouritesBtn.addEventListener("click", applyFavourites);
