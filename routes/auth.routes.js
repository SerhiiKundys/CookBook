const { Router } = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/User");

const router = Router();

// api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { login, password, repeatPassword } = req.body;

    const userToRegister = await User.findOne({ login });
    if (userToRegister) {
      console.error("ERROR: USER ALREADY EXIST");
      return res.status(400).json({ message: "User already exist" });
    }

    if (password !== repeatPassword) {
      console.error("ERROR: PASSWORDS AREN'T EQUAL");
      return res.status(400).json({ message: "Passwords aren't equal" });
    }

    const hashedPassword = await bcrypt.hash(password, 15);
    const user = new User({ login, password: hashedPassword });

    await user.save();

    const createdUser = await User.findOne({ login });

    const token = jwt.sign(
      {
        userId: user.id,
      },
      config.get("jwtSecret"),
      { expiresIn: "1h" }
    );

    res.json({ token, userId: createdUser.id, login });
  } catch (e) {
    res.status(500).json({ message: "Something is wrong, try again" });
  }
});

// api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { login, password } = req.body;

    const user = await User.findOne({ login });

    let isMatch;
    if (user) {
      isMatch = await bcrypt.compare(password, user.password);
    }

    if (!user || !isMatch) {
      return res.status(400).json({ message: "Incorrect data" });
    }

    const token = jwt.sign(
      {
        userId: user.id,
      },
      config.get("jwtSecret"),
      { expiresIn: "1h" }
    );

    res.json({ token, userId: user.id, login });
  } catch (e) {
    res.status(500).json({ message: "Something is wrong, try again" });
  }
});

module.exports = router;
