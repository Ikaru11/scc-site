// DATA MEMBER (fake database)
const members = [
    { username: "admin", password: "123", role: "admin" },
    { username: "member", password: "123", role: "user" }
];

// SHOW / HIDE PASSWORD
function togglePassword() {
    const pass = document.getElementById("password");
    pass.type = pass.type === "password" ? "text" : "password";
}

// LOGIN FUNCTION
function login(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const status = document.getElementById("status");

    const user = members.find(u => u.username === username && u.password === password);

    if (user) {
        status.style.color = "lightgreen";
        status.innerText = "Login berhasil! Halo " + user.username;

        // simulasi masuk dashboard
        setTimeout(() => {
            alert("Masuk ke dashboard (next step 😏)");
        }, 500);

    } else {
        status.style.color = "salmon";
        status.innerText = "Username atau password salah!";
    }
}