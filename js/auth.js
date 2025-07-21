function getUsers() {
  return JSON.parse(localStorage.getItem("users")) || [];
}
function saveUsers(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
}

function register() {
  const userName = document.getElementById("registerName").value;
  const email = document.getElementById("registerEmail").value;
  const password = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById(
    "registerConfirmPassword"
  ).value;
  console.log(userName, email, password, confirmPassword);

  const users = getUsers();
  const exists = users.find(
    (user) => user.email === email || user.userName === userName
  );

  if (exists) {
    alert("Tên đăng nhập đã tồn tại");
    return;
  }
  if (password !== confirmPassword) {
    alert("Mật khẩu không khớp");
    return;
  }
  if (!userName || !email || !password || !confirmPassword) {
    alert("Vui lòng điền đầy đủ thông tin");
    return;
  }
  const newUser = {
    userName,
    registerEmail: email,
    registerPassword: password,
  };
  saveUsers(newUser);
  alert("Đăng ký thành công");
  window.location.href = "login.html";
}

document.getElementById("btn-register").addEventListener("click", register);

function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  console.log(email, password);
  const users = getUsers();
  const user = users.find(
    (user) => user.registerEmail === email && user.registerPassword === password
  );
  if (user) {
    alert("Đăng nhập thành công");
    window.location.href = "webThuCung.html";
  } else {
    alert("Email hoặc mật khẩu không đúng");
  }
}

document.getElementById("btn-login").addEventListener("click", login);

document.getElementById("btn-login").addEventListener("click", login);

function saveCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}

function checkLogin() {
  const saved = localStorage.getItem("currentUser");
  return saved ? JSON.parse(saved) : null;
}
