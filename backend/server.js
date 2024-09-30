const express = require("express");
const cors = require("cors");
const path = require("path"); // Add path to serve static files
const app = express();
const port = 3000;

// Sample users and token storage
const users = [
  {
    username: "mahdi@gmail.com",
    password: "password",
  },
];

const tokens = {
  list: {},

  generate() {
    const token = this._randomToken();
    this.list[token] = true;
    return token;
  },

  exists(token) {
    return !!this.list[token];
  },

  _randomToken() {
    return "1111"; // Simple static token, change for real-world use
  },
};

// Middleware to parse JSON bodies and enable CORS
app.use(cors());
app.use(express.json());

// Serve static files from the Vue build folder (dist)
app.use(express.static(path.join(__dirname, "dist")));

// Simple route to test the server
app.get("/", (req, res) => {
  res.send("Hello from the backend!");
});

// Login route
app.post("/login", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (user) {
    res
      .json({ token: tokens.generate() })
      .header("Access-Control-Allow-Origin", "*");
  } else {
    res
      .status(401)
      .json({ error: "Invalid credentials" })
      .header("Access-Control-Allow-Origin", "*");
  }
});

// User info route
app.get("/user", (req, res) => {
  if (!tokens.exists(req.header("Authorization"))) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  return res.json(users[0]).header("Access-Control-Allow-Origin", "*");
});

// Catch-all route: this will serve the index.html for any route that isn't handled by API
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
