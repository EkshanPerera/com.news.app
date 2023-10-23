const express = require("express");
const router = express.Router();
const {
  getArticles,
  createArticle,
  getArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articleController");
const validateToken = require("../middleware/validateTokenHandler");

router.route("/").get(getArticles).post(validateToken,createArticle);
router.route("/:id").get(getArticle).put(validateToken,updateArticle).delete(validateToken,deleteArticle);

module.exports = router;
