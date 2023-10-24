const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const cors = require("cors");
const dotenv = require("dotenv").config();
connectDb();
const app = express();

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());
app.use("/api/server",require("./routes/serverRoutes"));
app.use("/api/articles", require("./routes/articleRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
