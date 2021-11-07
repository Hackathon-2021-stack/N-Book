const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "QAZWSXEDCRFVTGBYHNUJMIK,OL.P;/[";

// ROUT-1 Create a User using: POST "/api/auth/createuser". no login require
router.post(
  "/createuser",
  [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password must be atleast 5 characters").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let success = false
      return res.status(400).json({success, errors: errors.array() });
    }
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        let success = false
        return res.status(400).json({success, error: "sorry a user with this email already exists" });
      }

      const salt = await bcrypt.genSaltSync(10);
      const secPass = await bcrypt.hashSync(req.body.password, salt);

      user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,
      });

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);

      //   res.json(user);
      let success = true
      res.json({success, authToken });
    } catch (error) {
      console.error(error.message);
      let success = false
      res.status(500).send(success,"Internal Server Error");
    }
  }
);

// ROUT-2 Create a User using: POST "/api/auth/login". No login require
router.post(
  "/login",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password", "Password cannot be blank").exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      let success = false
      return res.status(400).json({success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (!user) {
        let success = false
        return req
          .status(400)
          .json({success, error: "Please try to login correct credentials" });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        let success=false
        return req.status(400).json({ success,error: "Please try to login correct credentials" });
      }

      const data = {
        user: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      let success = true
      res.json({ success,authToken });
    } catch (error) {
      let success = false
      console.error(error.message);
      res.status(500).send(success,"Internal Server Error");
    }
  }
);

// ROUT-3 Get loggedin User details using: POST "/api/auth/getuser". login require
router.post("/getuser", fetchuser, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);
  } catch (error) {
    let success = false
    console.error(error.message);
    res.status(500).send(success,"Internal Server Error");
  }
});

module.exports = router;
