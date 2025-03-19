document.addEventListener('DOMContentLoaded', displayOrderSummary);

function displayOrderSummary() {
    if (performance.navigation.type === performance.navigation.TYPE_RELOAD) {
        localStorage.removeItem('cart');
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderItems = document.getElementById('order-items');
    const orderTotal = document.getElementById('order-total');
    
    orderItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;
        let li = document.createElement("li");
        li.innerHTML = `${item.name} (x${item.quantity}) - ₱${(item.price * item.quantity).toFixed(2)}`;
        orderItems.appendChild(li);
    });

    orderTotal.textContent = total.toFixed(2);
}

function cancelOrder() {
    // Clear the order items
    document.getElementById('order-items').innerHTML = '';
    // Reset the total
    document.getElementById('order-total').textContent = '0.00';
    alert('Order has been canceled.');
}

function confirmOrder() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        alert("You don't have any orders yet. Please order first.");
        window.location.href = "../html/menu.html";
        return;
    }

    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;
    const cash = parseFloat(document.getElementById('cash').value);
    const total = parseFloat(document.getElementById('order-total').textContent);

    if (name === "" || phone === "" || address === "" || isNaN(cash)) {
        alert("Please fill in all fields and enter a valid cash amount.");
        return;
    }

    if (cash < total) {
        alert("Insufficient cash. Please enter an amount equal to or greater than the total.");
        return;
    }

    const change = cash - total;

    document.getElementById('confirm-name').textContent = `Name: ${name}`;
    document.getElementById('confirm-phone').textContent = `Phone: ${phone}`;
    document.getElementById('confirm-address').textContent = `Address: ${address}`;
    document.getElementById('confirm-total').textContent = total.toFixed(2);
    document.getElementById('confirm-cash').textContent = cash.toFixed(2);
    document.getElementById('confirm-change').textContent = change.toFixed(2);

    document.getElementById('order-modal').style.display = 'block';
}

function closeModal() {
    alert("Thank you for buying!");
    localStorage.removeItem('cart');
    window.location.reload();
    window.location.href = "../index.html";
}
