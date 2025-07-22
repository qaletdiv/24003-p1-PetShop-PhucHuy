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
  const registerModal = document.getElementById("registerModal");
  const loginModal = document.getElementById("loginModal");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  if (!currentUser) {
    alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng");
    loginModal.style.display = "block";
    return;
  }
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
document.addEventListener("DOMContentLoaded", () => {
  const authLinks = document.getElementById("auth-links");
  const accountLink = document.getElementById("account-link");

  const userData = localStorage.getItem("currentUser");

  if (userData) {
    const user = JSON.parse(userData);

    authLinks.style.display = "none";
    accountLink.style.display = "flex";
    accountLink.style.alignItems = "center";
    accountLink.style.gap = "10px";

    accountLink.innerHTML = `
      <img src="${user.avatar}" alt="Avatar" style="width:32px;height:32px;border-radius:50%;" />
      <span>Hi, ${user.userName}</span>
      <a href="#" id="logout-link" style="color: red;">Logout</a>
    `;

    document.getElementById("logout-link").addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("currentUser");
      window.location.reload();
    });
  }
});
