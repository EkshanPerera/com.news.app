const mongoose = require("mongoose");

const articleSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add the article title"],
    },
    description: {
      type: String,
      required: [true, "Please add the article description"],
    },
    content: {
      type: String,
      required: [true, "Please add the article content"],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    image: {
      type: String,
      required: [true, "Please add the article image"],
    },

  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Article", articleSchema);
