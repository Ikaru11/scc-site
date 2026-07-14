const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
    secret: "eskul-secret",
    resave: false,
    saveUninitialized: true
}));

// Database sederhana (sementara)
let users = [
    { username: "admin", password: "123" }
];

let forum = [];

// LOGIN
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    const user = users.find(u => u.username === username && u.password === password);

    if (user) {
        req.session.user = username;
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// CEK LOGIN
app.get("/me", (req, res) => {
    res.json({ user: req.session.user || null });
});

// FORUM POST
app.post("/forum", (req, res) => {
    if (!req.session.user) return res.sendStatus(403);

    forum.push({
        user: req.session.user,
        message: req.body.message
    });

    res.json({ success: true });
});

// GET FORUM
app.get("/forum", (req, res) => {
    res.json(forum);
});

// LOGOUT
app.get("/logout", (req, res) => {
    req.session.destroy();
    res.redirect("/");
});

app.listen(3000, () => console.log("Server jalan di http://localhost:3000"));