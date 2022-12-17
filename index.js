const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");
require("dotenv").config();
const PORT = process.env.PORT;

//REQUIRING ROUTES
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");

//CONNECTING WITH MONGODB SERVER
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Database connection error");
  });

//SETTING MIDDLEWARES FOR PARSING INCOMING REQUESTS
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, "client/build")));

app.use("/api/auth", authRoutes);
app.use("/api/file", uploadRoutes);

app.get("/", (req, res) => {
  res.send("test api");
});

app.listen(PORT, () => console.log(`listening on port ${PORT}`));
