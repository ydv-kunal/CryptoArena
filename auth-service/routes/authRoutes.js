// const express = require("express");
// const router = express.Router();
// const { signup, login } = require("../controllers/authController");

// router.post("/signup", signup);
// router.post("/login", login);

// module.exports = router;

const express = require("express");
const router = express.Router();
const { signup, login, verify } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify", authMiddleware, verify);

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user,
  });
});

module.exports = router;