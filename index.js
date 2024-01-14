const express = require("express");
const app = express();
require("dotenv").config();
const { dbConnect } = require("./config/dbconnection");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: "*" }));

//connect database
dbConnect();
// Use Google authentication routes
const fileUpload = require("./routes/uploadRoute");
const cards = require("./routes/cardRoute");

app.use("/file", fileUpload);
app.use("/card", cards);

app.listen(process.env.PORT, () => {
  console.log(`your server is running on on port :${process.env.PORT}`);
});
