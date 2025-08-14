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
    alert("Please fill in all fields!");
    alert("làm ơn điền đầy đủ thông tin!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    alert("Invalid email format!");
    alert("Định dạng email không hợp lệ!");
    return;
  }
  const avatar = "https://i.pravatar.cc/40?u=" + email;

  const users = getUsers();
  if (users.find((u) => u.email === email)) {
    alert("Email already exists!");
    return;
  }

  const user = { userName, email, password, avatar };
  saveUsers(user);
  alert("Registration successful!");
  window.location.href = "login.html";
}

// 🧠 LOGIN
export function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const users = getUsers();
  const user = users.find((u) => u.email === email && u.password === password);
  if (!email || !password) {
    alert("Please fill in all fields!");
    alert("làm ơn điền đầy đủ thông tin!");
    return;
  }
  if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
    alert("Invalid email format!");
    alert("Định dạng email không hợp lệ!");
    return;
  }
  if (!user) {
    alert("Invalid credentials");
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));
  window.location.href = "webThuCung.html";
}
