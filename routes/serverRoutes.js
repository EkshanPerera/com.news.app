const express = require("express");
const router = express.Router();

const validateToken = require("../middleware/validateTokenHandler");

router.route("/validatetoken").get(validateToken, (req, res) => {
  res.status(200).json({ message: "Token valid" });
});

module.exports = router;
