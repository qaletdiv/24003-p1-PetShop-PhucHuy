// main.js
import { petsData } from "./mock-data.js";

function renderProducts(data) {
  const productContainer = document.getElementById("petGrid");
  productContainer.innerHTML = "";

  data.forEach((pet) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.style.cursor = "pointer";
    productCard.innerHTML = `
      <img src="${pet.image}" alt="${pet.name}" class="product-image">
      <h3 class="product-name">${pet.name}</h3>
      <p>Giống: ${pet.breed}</p>
      <p>Tuổi: ${pet.age}</p>
      <p>Giới tính: ${pet.gender}</p>
      <div class="star-rating">
        <span class="rating">${pet.reviews.rating.toFixed(1)}</span>
        <span class="stars">${"★".repeat(
          Math.round(pet.reviews.rating)
        )}${"☆".repeat(5 - Math.round(pet.reviews.rating))}</span>
        <span class="review-count">(${pet.reviews.count})</span>
      </div>
      <p class="product-price">$${pet.price}</p>
      <div class="quantity-selector-small">
        <label class="quantity-label-small">Số lượng:</label>
        <div class="quantity-controls">
          <button type="button" class="quantity-btn-small decrease" data-id="${pet.id}">−</button>
          <input 
            type="number" 
            class="quantity-input-small" 
            data-id="${pet.id}"
            value="1" 
            min="1" 
            max="99"
          />
          <button type="button" class="quantity-btn-small increase" data-id="${pet.id}">+</button>
        </div>
      </div>
      <button class="add-to-cart" data-id="${pet.id}">Thêm vào giỏ</button>
    `;

    // Navigate to productDetail.html with pet id on card click (except button)
    productCard.addEventListener("click", (e) => {
      if (!e.target.classList.contains("add-to-cart") && 
          !e.target.classList.contains("quantity-btn-small") &&
          !e.target.classList.contains("quantity-input-small") &&
          !e.target.classList.contains("quantity-controls") &&
          !e.target.classList.contains("quantity-selector-small") &&
          !e.target.closest(".quantity-selector-small")) {
        window.location.href = `productDetail.html?id=${pet.id}`;
      }
    });

    // Quantity controls
    const quantityInput = productCard.querySelector(`.quantity-input-small[data-id="${pet.id}"]`);
    const decreaseBtn = productCard.querySelector(`.decrease[data-id="${pet.id}"]`);
    const increaseBtn = productCard.querySelector(`.increase[data-id="${pet.id}"]`);

    decreaseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      let currentValue = parseInt(quantityInput.value) || 1;
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });

    increaseBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      let currentValue = parseInt(quantityInput.value) || 1;
      if (currentValue < 99) {
        quantityInput.value = currentValue + 1;
      }
    });

    quantityInput.addEventListener("change", (e) => {
      e.stopPropagation();
      let value = parseInt(quantityInput.value) || 1;
      if (value < 1) {
        quantityInput.value = 1;
      } else if (value > 99) {
        quantityInput.value = 99;
      }
    });

    // Add event listener for add to cart button
    const addToCartBtn = productCard.querySelector(".add-to-cart");
    addToCartBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const quantity = parseInt(quantityInput.value) || 1;
      addToCart(pet.id, quantity);
    });

    productContainer.appendChild(productCard);
  });
}

function addToCart(id, quantity = 1) {
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
    existingItem.quantity += quantity;
  } else {
    const pet = petsData.find((p) => p.id === id);
    cart.push({ ...pet, quantity: quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`Đã thêm ${quantity} sản phẩm vào giỏ hàng!`);
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

// Initialize - Show only 4 featured products on homepage
const featuredProducts = petsData.slice(0, 4);
renderProducts(featuredProducts);
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
      <a href="profileDetail.html" style="display: flex; align-items: center; gap: 10px; text-decoration: none; color: white;">
        <img src="${user.avatar}" alt="Avatar" style="width:32px;height:32px;border-radius:50%;cursor:pointer;" />
        <span>Hi, ${user.userName}</span>
      </a>
      <a href="#" id="logout-link" style="color: red;">Logout</a>
    `;

    document.getElementById("logout-link").addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("currentUser");
      window.location.reload();
    });
  }
});

//search engine - redirect to product.html with search query
document.getElementById("search-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const searchTerm = document.getElementById("search-input").value.trim();
  if (searchTerm) {
    // Redirect to product.html with search query parameter
    window.location.href = `product.html?search=${encodeURIComponent(
      searchTerm
    )}`;
  } else {
    // If empty, just go to product page
    window.location.href = "product.html";
  }
});
