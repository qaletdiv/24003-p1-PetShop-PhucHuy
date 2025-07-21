// cart.js
function loadCart() {
  const cartItemsEl = document.getElementById("cartItems");
  const cartTotalEl = document.getElementById("cartTotal");
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  cartItemsEl.innerHTML = "";
  let total = 0;

  cart.forEach((item, index) => {
    const itemEl = document.createElement("div");
    itemEl.classList.add("cart-item");
    itemEl.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>Số lượng: ${item.quantity}</p>
        <p>Đơn giá: $${item.price}</p>
        <p>Tổng: $${item.price * item.quantity}</p>
      </div>
      <div class="cart-item-actions">
        <button class="btn remove" data-index="${index}">Xóa</button>
      </div>
    `;
    cartItemsEl.appendChild(itemEl);
    total += item.price * item.quantity;
  });

  cartTotalEl.textContent = total.toLocaleString("vi-VN");
  document.querySelectorAll(".remove").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      localStorage.setItem("cart", JSON.stringify(cart));
      loadCart();
    });
  });
}

// Modal logic ve viec hiển thị giỏ hàng
const cartModal = document.getElementById("cartModal");
const cartLink = document.getElementById("cart-link");
const closeModalBtn = document.querySelector(".close");

if (cartLink && cartModal && closeModalBtn) {
  cartLink.addEventListener("click", (e) => {
    e.preventDefault();
    cartModal.style.display = "block";
    loadCart();
  });

  closeModalBtn.addEventListener("click", () => {
    cartModal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === cartModal) {
      cartModal.style.display = "none";
    }
  });
}
document.getElementById("checkoutBtn")?.addEventListener("click", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  if (cart.length === 0) {
    alert("Giỏ hàng của bạn đang trống!");
    return;
  }

  alert("Cảm ơn bạn đã mua hàng!");
  localStorage.removeItem("cart");
  loadCart();

  //Add confetti effect on thanh toán

  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });
});
