

let allProducts = [];
let activeCategory = "";

document.addEventListener("DOMContentLoaded", () => {
    loadProducts();
    setupCategoryClicks();
});

// Load product data
async function loadProducts() {
    try {
        const res = await fetch("products.json");
        allProducts = await res.json();
        showProducts(allProducts);
    } catch (error) {
        console.error("Error loading products:", error);
    }
}

// Show products on screen
function showProducts(list) {
    const container = document.getElementById("product-container");
    container.innerHTML = "";

    list.forEach(p => {
        const card = document.createElement("div");
        card.className = "product";

        card.innerHTML = `
            <img src="${p.image}" alt="${p.name}">
            <h4>${p.name}</h4>
            <p>${p.desc}</p>
            <p><strong>${p.price} افغانی</strong></p>
            <button class="buy" onclick="buyNow('${p.name}', '${p.price}')">سفارش</button>
        `;

        container.appendChild(card);
    });
}

// Category click system
function setupCategoryClicks() {
    const cats = document.querySelectorAll(".cat");
    cats.forEach(cat => {
        cat.addEventListener("click", () => {
            cats.forEach(c => c.classList.remove("active"));
            cat.classList.add("active");

            activeCategory = cat.getAttribute("data-cat");

            if (activeCategory === "all") {
               showProducts(allProducts);
            } else {
               const filtered = allProducts.filter(p => p.category === activeCategory);
               showProducts(filtered);
            }
        });
    });
}

// Search system
function searchProducts() {
    const text = document.getElementById("search").value.toLowerCase();
    const filtered = allProducts.filter(p => p.name.toLowerCase().includes(text));
    showProducts(filtered);
}

// WhatsApp ordering
function buyNow(name, price) {
    const phone = "0784632234";
    const msg = `سلام! میخواهم این دوا را سفارش بدهم:\n\nنام دوا: ${name}\nقیمت: ${price} افغانی\n\nلطفاً تایید کنید.`;

    const url = `https://wa.me/93${phone.substring(1)}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
}
