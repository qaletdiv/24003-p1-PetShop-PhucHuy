function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}

function saveUsers(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}

// 🧠 REGISTER
export function register() {
  const userName = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById(
    "registerConfirmPassword"
  ).value;
  
  if (!userName || !email || !password || !confirmPassword) {
    alert("Làm ơn điền đầy đủ thông tin!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Mật khẩu xác nhận không khớp!");
    return;
  }

  if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    alert("Định dạng email không hợp lệ!");
    return;
  }
  
  const avatar = "https://i.pravatar.cc/40?u=" + email;

  const users = getUsers();
  if (users.find((u) => u.email === email)) {
    alert("Email đã tồn tại!");
    return;
  }

  const user = { userName, email, password, avatar };
  saveUsers(user);
  alert("Đăng ký thành công!");
  window.location.href = "login.html";
}

// 🧠 LOGIN
export function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  if (!email || !password) {
    alert("Làm ơn điền đầy đủ thông tin!");
    return;
  }
  
  if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    alert("Định dạng email không hợp lệ!");
    return;
  }

  const users = getUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  
  if (!user) {
    alert("Thông tin đăng nhập không chính xác!");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));
  window.location.href = "webThuCung.html";
}
