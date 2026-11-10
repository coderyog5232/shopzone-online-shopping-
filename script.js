const products = [
    {
        id: 1,
        name: "Smart Watch",
        price: 1999,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500"
    },

    {
        id: 2,
        name: "Headphones",
        price: 1499,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500"
    },

    {
        id: 3,
        name: "Sneakers",
        price: 2499,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500"
    },

    {
        id: 4,
        name: "Sunglasses",
        price: 999,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500"
    },

    {
        id: 5,
        name: "Camera",
        price: 25999,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=500"
    },

    {
        id: 6,
        name: "Jacket",
        price: 1999,
        category: "Fashion",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500"
    },

    {
        id: 7,
        name: "Backpack",
        price: 1299,
        category: "Accessories",
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500"
    },

    {
        id: 8,
        name: "Keyboard",
        price: 1799,
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500"
    }
];

let cart = [];

const container = document.getElementById("product-container");

function displayProducts(items) {

    container.innerHTML = "";

    items.forEach(product => {

        container.innerHTML += `
            <div class="product-card">

                <img src="${product.image}" alt="${product.name}">

                <h3>${product.name}</h3>

                <p>₹${product.price}</p>

                <button onclick="addToCart(${product.id})">
                    Add To Cart
                </button>

            </div>
        `;

    });

}

displayProducts(products);

// Add to cart

function addToCart(id) {

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...products.find(item => item.id === id),
            quantity: 1
        });
    }

    updateCart();

}

// Update cart

function updateCart() {

    const cartItems = document.getElementById("cart-items");

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;

    cart.forEach(item => {

        total += item.price * item.quantity;
        count += item.quantity;

        cartItems.innerHTML += `

            <div class="cart-item">

                <span>${item.name}</span>

                <span>₹${item.price}</span>

                <button onclick="changeQuantity(${item.id}, -1)">-</button>

                <span>${item.quantity}</span>

                <button onclick="changeQuantity(${item.id}, 1)">+</button>

                <button onclick="removeItem(${item.id})">Remove</button>

            </div>

        `;

    });

    document.getElementById("total").innerText = total;

    document.getElementById("cart-count").innerText = count;

}

// Change quantity

function changeQuantity(id, amount) {

    const item = cart.find(item => item.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== id);
    }

    updateCart();

}

// Remove product

function removeItem(id) {

    cart = cart.filter(item => item.id !== id);

    updateCart();

}

// Show cart

function toggleCart() {

    const cartSection = document.getElementById("cart");

    cartSection.style.display =
        cartSection.style.display === "block" ? "none" : "block";

}

// Filter products

function filterProducts(category) {

    if (category === "All") {
        displayProducts(products);
    } else {
        const filtered = products.filter(
            product => product.category === category
        );

        displayProducts(filtered);
    }

}

// Search products

document.getElementById("search").addEventListener("input", function() {

    const value = this.value.toLowerCase();

    const filtered = products.filter(product =>
        product.name.toLowerCase().includes(value)
    );

    displayProducts(filtered);

});

// Checkout

function checkout() {

    if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    alert("Thank you for shopping with ShopZone!");

    cart = [];

    updateCart();

}