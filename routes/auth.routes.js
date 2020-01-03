const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { check, validationResult } = require("express-validator");
const config = require("config");
const User = require("../models/User");
const router = Router();

// Registration Route
router.post(
  "/register",
  [
    check("email", "Incorrect Email").isEmail(),
    check("password", "Password must be at least 6 characters").isLength({
      min: 6
    })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect Values"
        });
      }

      const { email, password } = req.body;

      const candidate = await User.findOne({ email });
      if (candidate) {
        return res.status(400).json({ message: "Email has been already used" });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({ email, password: hashedPassword });
      user.save((err, user) => {
        if (err) return res.json(err);
        res.status(201).json({ message: "User has been created", user });
      });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
);

// Login Route
router.post(
  "/login",
  [
    check("email", "Incorrect Email")
      .normalizeEmail()
      .isEmail(),
    check("password", "Incorrect Password").exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect Values for authentication"
        });
      }

      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Password incorrect, please try again" });
      }
      const token = jwt.sign({ userId: user._id }, config.get("jwtSecret"), {
        expiresIn: "1h"
      });

      res.status(200).json({ token, userId: user.id });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Something went wrong, please try again" });
    }
  }
);
module.exports = router;
