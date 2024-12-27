const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5001;
const SECRET_KEY = "secret_key"; // Replace with strong key in production

app.use(cors());
app.use(express.json());

// Connect to SQLite database
const db = new sqlite3.Database("./database.db", (err) => {
  if (err) console.error("Database connection failed:", err.message);
  else console.log("Connected to SQLite database");
});

// Login Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const query = "SELECT * FROM users WHERE email = ?";
  db.get(query, [email], (err, user) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare passwords
    if (!bcrypt.compareSync(password, user.password)) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign({ id: user.id, role: user.role }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.json({ message: "Login successful", token });
  });
});

// Check if Email Exists for Login
app.get("/check-login-email", (req, res) => {
  const { email } = req.query;
  const query = "SELECT * FROM users WHERE email = ?";
  db.get(query, [email], (err, user) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (!user) {
      return res.status(404).json({ message: "User not registered. Redirecting to Sign Up..." });
    }
    res.json({ exists: true });
  });
});

// Sign Up Route
app.post("/signup", (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);
  const query =
    "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, 'user')";

  db.run(query, [username, email, hashedPassword], function (err) {
    if (err) return res.status(400).json({ error: "User already exists" });

    // Generate a JWT for the new user
    const token = jwt.sign({ id: this.lastID, role: 'user' }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.status(201).json({
      message: "User registered successfully",
      token, // Include the token in the response
    });
  });
});

// Check Email Route
app.get("/check-email", (req, res) => {
  const { email } = req.query;
  const query = "SELECT * FROM users WHERE email = ?";
  db.get(query, [email], (err, user) => {
    if (err) return res.status(500).json({ error: "Database error" });
    res.json({ exists: !!user });
  });
});

// Middleware to verify token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ error: "No token provided" });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(401).json({ error: "Unauthorized" });
    req.user = decoded;
    next();
  });
};

// Protected Route
app.get("/profile", verifyToken, (req, res) => {
  const query = "SELECT username, email FROM users WHERE id = ?";
  db.get(query, [req.user.id], (err, user) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json({ username: user.username, email: user.email });
  });
});

// Get all detections for a user
app.get("/detections", verifyToken, (req, res) => {
  const query = "SELECT * FROM detections WHERE user_id = ?";
  db.all(query, [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ error: "Failed to fetch detections" });
    res.json(rows);
  });
});

// Add a new detection
app.post("/detections", verifyToken, (req, res) => {
  const { title, content, fakePercentage = "70%", truePercentage = "30%", date } = req.body;

  if (!title || !content || !fakePercentage || !truePercentage || !date) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Check if the detection already exists for the user
  const checkQuery = "SELECT * FROM detections WHERE user_id = ? AND title = ? AND content = ?";
  const insertQuery =
    "INSERT INTO detections (user_id, title, content, fake_percentage, true_percentage, date) VALUES (?, ?, ?, ?, ?, ?)";

  db.get(checkQuery, [req.user.id, title, content], (err, row) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (row) {
      return res.status(409).json({ error: "Duplicate detection. Already exists." });
    }

    db.run(
      insertQuery,
      [req.user.id, title, content, fakePercentage, truePercentage, date],
      function (err) {
        if (err) return res.status(500).json({ error: "Failed to add detection" });

        res.status(201).json({
          id: this.lastID,
          user_id: req.user.id,
          title,
          content,
          fakePercentage,
          truePercentage,
          date,
        });
      }
    );
  });
});

const resetDetectionsSequence = () => {
  const query = `
    UPDATE sqlite_sequence
    SET seq = (SELECT MAX(id) FROM detections)
    WHERE name = 'detections';
  `;

  db.run(query, (err) => {
    if (err) {
      console.error("Failed to reset detections sequence:", err.message);
    } else {
      console.log("Sequence reset successfully for detections.");
    }
  });
};

// Delete a detection
app.delete("/detections/:id", verifyToken, (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM detections WHERE id = ? AND user_id = ?";
  db.run(query, [id, req.user.id], function (err) {
    if (err) return res.status(500).json({ error: "Failed to delete detection" });
    if (this.changes === 0)
      return res.status(404).json({ error: "Detection not found or not authorized" });

    resetDetectionsSequence(); // Reset sequence after deletion
    res.status(204).send();
  });
});

// Get all claims for a user
app.get("/claims", verifyToken, (req, res) => {
  const query = "SELECT * FROM claims WHERE user_id = ?";
  db.all(query, [req.user.id], (err, rows) => {
    if (err) return res.status(500).json({ error: "Failed to fetch claims" });
    res.json(rows);
  });
});

// Add a new claim
app.post("/claims", verifyToken, (req, res) => {
  const { title, rating, link, date } = req.body;

  if (!title || !rating || !link || !date) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Check if the detection already exists for the user
  const checkQuery = "SELECT * FROM claims WHERE user_id = ? AND title = ?";
  const insertQuery =
    "INSERT INTO claims (user_id, title, rating, link, date) VALUES (?, ?, ?, ?, ?)";

  db.get(checkQuery, [req.user.id, title], (err, row) => {
    if (err) return res.status(500).json({ error: "Database error" });

    if (row) {
      return res.status(409).json({ error: "Duplicate claim. Already exists." });
    }

    db.run(
      insertQuery,
      [req.user.id, title, rating, link, date],
      function (err) {
        if (err) return res.status(500).json({ error: "Failed to add claim" });

        res.status(201).json({
          id: this.lastID,
          user_id: req.user.id,
          title,
          rating,
          link,
          date,
        });
      }
    );
  });
});

const resetClaimsSequence = () => {
  const query = `
    UPDATE sqlite_sequence
    SET seq = (SELECT MAX(id) FROM claims)
    WHERE name = 'claims';
  `;

  db.run(query, (err) => {
    if (err) {
      console.error("Failed to reset claims sequence:", err.message);
    } else {
      console.log("Sequence reset successfully for claims.");
    }
  });
};

// Delete a claim
app.delete("/claims/:id", verifyToken, (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM claims WHERE id = ? AND user_id = ?";
  db.run(query, [id, req.user.id], function (err) {
    if (err) return res.status(500).json({ error: "Failed to delete claim" });
    if (this.changes === 0)
      return res.status(404).json({ error: "Claim not found or not authorized" });

    resetClaimsSequence(); // Reset sequence after deletion
    res.status(204).send();
  });
});


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
