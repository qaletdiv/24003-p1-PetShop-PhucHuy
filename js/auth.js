// // function getUsers() {
// //   return JSON.parse(localStorage.getItem("users")) || [];
// // }
// // function saveUsers(user) {
// //   const users = getUsers();
// //   users.push(user);
// //   localStorage.setItem("users", JSON.stringify(users));
// // }

// // function register() {
// //   const userName = document.getElementById("registerName").value;
// //   const email = document.getElementById("registerEmail").value;
// //   const password = document.getElementById("registerPassword").value;
// //   const confirmPassword = document.getElementById(
// //     "registerConfirmPassword"
// //   ).value;
// //   console.log(userName, email, password, confirmPassword);

// //   const users = getUsers();
// //   const exists = users.find(
// //     (user) => user.email === email || user.userName === userName
// //   );

// //   if (exists) {
// //     alert("Tên đăng nhập đã tồn tại");
// //     return;
// //   }
// //   if (password !== confirmPassword) {
// //     alert("Mật khẩu không khớp");
// //     return;
// //   }
// //   if (!userName || !email || !password || !confirmPassword) {
// //     alert("Vui lòng điền đầy đủ thông tin");
// //     return;
// //   }
// //   const newUser = {
// //     userName,
// //     registerEmail: email,
// //     registerPassword: password,
// //   };
// //   saveUsers(newUser);
// //   alert("Đăng ký thành công");
// //   window.location.href = "login.html";
// // }

// // document.getElementById("btn-register").addEventListener("click", register);

// // function login() {
// //   const email = document.getElementById("loginEmail").value;
// //   const password = document.getElementById("loginPassword").value;
// //   console.log(email, password);
// //   const users = getUsers();
// //   const user = users.find(
// //     (user) => user.registerEmail === email && user.registerPassword === password
// //   );
// //   if (user) {
// //     alert("Đăng nhập thành công");
// //     window.location.href = "webThuCung.html";
// //   } else {
// //     alert("Email hoặc mật khẩu không đúng");
// //   }
// // }
// // document.getElementById("btn-login").addEventListener("click", login);

// // function saveCurrentUser(user) {
// //   localStorage.setItem("currentUser", JSON.stringify(user));
// // }

// // function checkLogin() {
// //   const saved = localStorage.getItem("currentUser");
// //   return saved ? JSON.parse(saved) : null;
// // }

// //ffffffffff

// // ✅ Your original code (unchanged)
// function getUsers() {
//   return JSON.parse(localStorage.getItem("users")) || [];
// }
// function saveUsers(user) {
//   const users = getUsers();
//   users.push(user);
//   localStorage.setItem("users", JSON.stringify(users));
// }

// function register() {
//   const userName = document.getElementById("registerName").value;
//   const email = document.getElementById("registerEmail").value;
//   const password = document.getElementById("registerPassword").value;
//   const confirmPassword = document.getElementById(
//     "registerConfirmPassword"
//   ).value;
//   console.log(userName, email, password, confirmPassword);

//   const users = getUsers();
//   const exists = users.find(
//     (user) => user.email === email || user.userName === userName
//   );

//   if (exists) {
//     alert("Tên đăng nhập đã tồn tại");
//     return;
//   }
//   if (password !== confirmPassword) {
//     alert("Mật khẩu không khớp");
//     return;
//   }
//   if (!userName || !email || !password || !confirmPassword) {
//     alert("Vui lòng điền đầy đủ thông tin");
//     return;
//   }
//   const newUser = {
//     userName,
//     registerEmail: email,
//     registerPassword: password,
//   };
//   saveUsers(newUser);
//   alert("Đăng ký thành công");
//   localStorage.setItem("redirectAfterLogin", "webThuCung.html");
//   window.location.href = "login.html";
// }

// document.getElementById("btn-register").addEventListener("click", register);

// function login() {
//   const email = document.getElementById("loginEmail").value;
//   const password = document.getElementById("loginPassword").value;
//   console.log(email, password);
//   const users = getUsers();
//   const user = users.find(
//     (user) => user.registerEmail === email && user.registerPassword === password
//   );
//   if (user) {
//     alert("Đăng nhập thành công");
//     window.location.href = "webThuCung.html";
//   } else {
//     alert("Email hoặc mật khẩu không đúng");
//   }
// }
// document.getElementById("btn-login").addEventListener("click", login);

// // ✅ Extensions (additions below your original code)
// function saveCurrentUser(user) {
//   localStorage.setItem("currentUser", JSON.stringify(user));
// }

// function checkLogin() {
//   const saved = localStorage.getItem("currentUser");
//   return saved ? JSON.parse(saved) : null;
// }

// // Override login with session saving + redirect
// function enhancedLogin() {
//   const email = document.getElementById("loginEmail").value;
//   const password = document.getElementById("loginPassword").value;
//   const users = getUsers();
//   const user = users.find(
//     (user) => user.registerEmail === email && user.registerPassword === password
//   );

//   if (user) {
//     saveCurrentUser(user);
//     alert("Đăng nhập thành công");
//     const redirect =
//       localStorage.getItem("redirectAfterLogin") || "webThuCung.html";
//     localStorage.removeItem("redirectAfterLogin");
//     window.location.href = redirect;
//   } else {
//     alert("Email hoặc mật khẩu không đúng");
//   }
// }

// document.getElementById("btn-login").removeEventListener("click", login);
// document.getElementById("btn-login").addEventListener("click", (e) => {
//   e.preventDefault();
//   enhancedLogin();
// });

// function updateNavbar() {
//   const user = checkLogin();
//   const authLinks = document.getElementById("auth-links");
//   const accountLink = document.getElementById("account-link");

//   if (user && authLinks && accountLink) {
//     authLinks.style.display = "none";
//     accountLink.style.display = "flex";
//     accountLink.innerHTML = `
//       <span style="color:white; margin-right:10px;">👋 ${user.userName}</span>
//       <a href="account.html">My Account</a>
//       <a href="#" id="logout-link">Logout</a>
//     `;
//     document.getElementById("logout-link").addEventListener("click", (e) => {
//       e.preventDefault();
//       logoutUser();
//     });
//   } else {
//     if (authLinks) authLinks.style.display = "flex";
//     if (accountLink) accountLink.style.display = "none";
//   }
// }

// function logoutUser() {
//   localStorage.removeItem("currentUser");
//   window.location.reload();
// }

// function requireLoginBeforeAction(callback) {
//   const user = checkLogin();
//   if (!user) {
//     alert("Bạn cần đăng ký hoặc đăng nhập trước khi mua sản phẩm.");
//     localStorage.setItem("redirectAfterLogin", window.location.pathname);
//     window.location.href = "register.html";
//     return false;
//   }
//   callback(); // run actual action
//   return true;
// }

// // Optional: expose to global for HTML inline use
// window.checkLogin = checkLogin;
// window.updateNavbar = updateNavbar;
// window.requireLoginBeforeAction = requireLoginBeforeAction;

////////////
// Your base code
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
  localStorage.setItem("redirectAfterLogin", "webThuCung.html");
  window.location.href = "login.html";
}

document.getElementById("btn-register").addEventListener("click", register);

function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
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

// Extensions for session and navbar
function saveCurrentUser(user) {
  localStorage.setItem("currentUser", JSON.stringify(user));
}
function checkLogin() {
  const saved = localStorage.getItem("currentUser");
  return saved ? JSON.parse(saved) : null;
}

function enhancedLogin() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const users = getUsers();
  const user = users.find(
    (user) => user.registerEmail === email && user.registerPassword === password
  );

  if (user) {
    saveCurrentUser(user);
    alert("Đăng nhập thành công");
    const redirect =
      localStorage.getItem("redirectAfterLogin") || "webThuCung.html";
    localStorage.removeItem("redirectAfterLogin");
    window.location.href = redirect;
  } else {
    alert("Email hoặc mật khẩu không đúng");
  }
}

document.getElementById("btn-login").removeEventListener("click", login);
document.getElementById("btn-login").addEventListener("click", (e) => {
  e.preventDefault();
  enhancedLogin();
});

function updateNavbar() {
  const user = checkLogin();
  const authLinks = document.getElementById("auth-links");
  const accountLink = document.getElementById("account-link");

  if (user && authLinks && accountLink) {
    authLinks.style.display = "none";
    accountLink.style.display = "flex";
    accountLink.innerHTML = `
      <span style="color:white; margin-right:10px;">👋 ${user.userName}</span>
      <a href="account.html">My Account</a>
      <a href="#" id="logout-link">Logout</a>
    `;
    document.getElementById("logout-link").addEventListener("click", (e) => {
      e.preventDefault();
      logoutUser();
    });
  } else {
    if (authLinks) authLinks.style.display = "flex";
    if (accountLink) accountLink.style.display = "none";
  }
}

function logoutUser() {
  localStorage.removeItem("currentUser");
  window.location.reload();
}

function requireLoginBeforeAction(callback) {
  const user = checkLogin();
  if (!user) {
    alert("Bạn cần đăng ký hoặc đăng nhập trước khi thực hiện hành động này.");
    localStorage.setItem("redirectAfterLogin", window.location.pathname);
    window.location.href = "register.html";
    return false;
  }
  callback(); // run actual action
  return true;
}

// Optional export globally
window.checkLogin = checkLogin;
window.updateNavbar = updateNavbar;
window.requireLoginBeforeAction = requireLoginBeforeAction;
