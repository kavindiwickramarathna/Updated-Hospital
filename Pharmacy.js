let cart = [];

// Event listener for the entire document
document.addEventListener("click", (event) => {
    const target = event.target;

    // Handle Add to Cart button click
    if (target.classList.contains("add-to-cart")) {
        const id = target.dataset.id;
        const name = target.dataset.name;
        const price = parseFloat(target.dataset.price);
        const quantityInput = target.previousElementSibling.querySelector(".quantity"); // Get the quantity input
        const quantity = parseInt(quantityInput.value); // Get the current quantity

        // Check if the item is already in the cart
        const existingItem = cart.find((item) => item.id === id);
        if (existingItem) {
            existingItem.quantity = quantity; // Update quantity if the item already exists in the cart
        } else {
            cart.push({ id, name, price, quantity }); // Add the item to the cart
        }

        alert(`${name} (${quantity} units) has been added to the cart!`);
        updateCartDisplay();
    }

    // Handle quantity increase (increase button)
    if (target.classList.contains("increase")) {
        const quantityInput = target.previousElementSibling;
        let currentQuantity = parseInt(quantityInput.value);
        quantityInput.value = currentQuantity + 1; // Increase quantity by 1
    }

    // Handle quantity decrease (decrease button)
    if (target.classList.contains("decrease")) {
        const quantityInput = target.nextElementSibling;
        let currentQuantity = parseInt(quantityInput.value);
        if (currentQuantity > 1) {
            quantityInput.value = currentQuantity - 1; // Decrease quantity by 1
        }
    }

    // Handle Remove button in the cart
    if (target.classList.contains("remove")) {
        const id = target.dataset.id;
        cart = cart.filter((item) => item.id !== id);
        updateCartDisplay();
    }
});

// Function to update the cart display
function updateCartDisplay() {
    const cartTableBody = document.getElementById("cart-table-body");
    const totalPriceElement = document.getElementById("total-price");

    // Clear existing rows
    cartTableBody.innerHTML = "";

    let total = 0;

    // Add items to the cart table
    cart.forEach((item) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td> <!-- Display quantity -->
            <td>$${item.price.toFixed(2)}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
            <td><button class="remove" data-id="${item.id}">Remove</button></td>
        `;
        cartTableBody.appendChild(row);
        total += item.price * item.quantity;
    });

    // Update total price
    totalPriceElement.textContent = `$${total.toFixed(2)}`;
}

// Handle Buy Now button
document.getElementById("buy-now").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Redirecting to checkout!");
    window.location.href = "checkout.html";
});

// Handle Clear Cart button
document.getElementById("clear-cart").addEventListener("click", () => {
    cart = [];
    updateCartDisplay();
    alert("Your cart has been cleared!");
});
