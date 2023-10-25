const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const dotenv = require("dotenv").config();
const multer = require("multer");
const path = require("path");

connectDb();

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api/articles", require("./routes/articleRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

app.post("/api/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No files were uploaded.");
  }
  res.send("File uploaded successfully.");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
