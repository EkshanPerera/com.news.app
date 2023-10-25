const asyncHandler = require("express-async-handler");
const Article = require("../models/articleModel");
//@desc Get all articles
//@route GET /api/articles
//@access public
const getArticles = asyncHandler(async (req, res) => {
  try {
    const articles = await Article.find().populate('author', 'id username');
    res.status(200).json(articles);
  } catch (error) {
    res.status(404);
    throw new Error(error.message);
  }
});

//@desc Create New article
//@route POST /api/articles
//@access private
const createArticle = asyncHandler(async (req, res) => {
  const { title, description, content, image } = req.body;
  if (!title || !description || !content || !image) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  try {
    const article = await Article.create({
      title,
      description,
      content,
      author: req.user.id,
      image,
    });
    res.status(201).json(article);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
  
});

//@desc Get article
//@route GET /api/articles/:id
//@access public
const getArticle = asyncHandler(async (req, res) => {
  try {
    const article = await Article.findById(req.params.id).populate('author', 'id username');
    res.status(200).json(article);
  } catch (error) {
    res.status(400);
    throw new Error("Article not found");
  }
});

//@desc Update article
//@route PUT /api/articles/:id
//@access private
const updateArticle = asyncHandler(async (req, res) => {
  try {
    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.status(200).json(updatedArticle);
  } catch (error) {
    res.status(400);
    throw new Error("Article not found");
  }


});

//@desc Delete article
//@route DELETE /api/articles/:id
//@access private
const deleteArticle = asyncHandler(async (req, res) => {
  try {
    await Article.deleteOne({ _id: req.params.id });
    res.status(201).json({message:"deleted"});
  } catch (error) {
    res.status(400);
    throw new Error("Article not found");
  }
});

module.exports = {
  getArticles,
  createArticle,
  getArticle,
  updateArticle,
  deleteArticle,
};
