const express = require("express");
const cors = require('cors');
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
const User = require("./models/user.js");

const jwt = require("jsonwebtoken");
const secretKey = "himanshu123";

const app = express();
app.use(bodyParser.json());
app.use(cors());
const saltRounds = 10; // Number of salt rounds for bcrypt

app.get("/", (req, res) => {
  res.send("Hello, This is RichPanel coding task");
});

function verifyToken(req, res, next) {
  const rawtoken = req.headers.authorization;

  if (!rawtoken) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  console.log("Decoded user:", rawtoken);
  const [bearer, token] = rawtoken.split(" ");

  if (bearer !== "Bearer" || !token) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Invalid authorization format" });
  }

  jwt.verify(token, secretKey, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Unauthorized: Invalid token" });
    }

    req.user = user; // Attach the user object to the request
    next();
  });
}

// Register endpoint
app.post("/register", async (req, res) => {
  try {
    const { userName:Name, email:EmailAddress, password:Password } = req.body;

    // Check if user with the provided phone number already exists
    const existingUser = await User.query().where({ EmailAddress }).first();

    if (existingUser) {
      return res
        .status(400)
        .json({ error: "User with this email already registered" });
    }

    const hashedPassword = await bcrypt.hash(Password, saltRounds);

    const newUser = await User.query().insertAndFetch({
      Name,
      EmailAddress,
      Password: hashedPassword,
    });

    const token = jwt.sign(
      { userId: newUser.id, username: newUser.Name },
      secretKey,
      { expiresIn: "1h" }
    );

    delete newUser.Password;
    res.status(201).json({ user: newUser, token });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Sign-in route
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.query().findOne({ EmailAddress:email })

  if (!user || !bcrypt.compareSync(password, user.Password)) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const token = jwt.sign(
    { userId: user.id, username: user.username },
    secretKey,
    { expiresIn: "1h" }
  );

  res.json({ token });
});



// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

