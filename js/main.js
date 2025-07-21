// main.js
import { petsData } from "./mock-data.js";

function renderProducts(data) {
  const productContainer = document.getElementById("petGrid");
  productContainer.innerHTML = "";

  data.forEach((pet) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
  <img src="${pet.image}" alt="${pet.name}" class="product-image">
  <h3 class="product-name">${pet.name}</h3>
  <p>Giống: ${pet.breed}</p>
  <p>Tuổi: ${pet.age}</p>
  <p>Giới tính: ${pet.gender}</p>
  <p class="product-description">${pet.description}</p>
  <div class="star-rating">
    <span class="rating">${pet.reviews.rating.toFixed(1)}</span>
    <span class="stars">${"★".repeat(
      Math.round(pet.reviews.rating)
    )}${"☆".repeat(5 - Math.round(pet.reviews.rating))}</span>
  </div>
  <p class="product-reviews">(${pet.reviews.count} đánh giá)</p>
  <p class="product-price">$${pet.price}</p>
  <button class="add-to-cart" data-id="${pet.id}">Thêm vào giỏ</button>
`;

    productContainer.appendChild(productCard);
  });

  // Add event listeners to cart buttons
  document.querySelectorAll(".add-to-cart").forEach((button) => {
    button.addEventListener("click", (e) => {
      const petId = parseInt(e.target.dataset.id);
      addToCart(petId);
    });
  });
}

function addToCart(id) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cart.find((item) => item.id === id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    const pet = petsData.find((p) => p.id === id);
    cart.push({ ...pet, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert("Đã thêm vào giỏ hàng!");
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const total = cart.reduce((sum, item) => sum + item.quantity, 0);
  const countEl = document.getElementById("cart-count");
  if (countEl) countEl.textContent = total;
}

function handleFilterChange() {
  const filter = document.getElementById("petTypeFilter");
  filter.addEventListener("change", () => {
    const selected = filter.value;
    if (selected === "all") {
      renderProducts(petsData);
    } else {
      const filtered = petsData.filter((pet) => pet.type === selected);
      renderProducts(filtered);
    }
  });
}

// Initialize
renderProducts(petsData);
updateCartCount();
handleFilterChange();
/////////
