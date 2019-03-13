const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const { MONGODB_URI } = require("./configuration");

// To fix all deprecation warnings
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

process.env.MONGODB_URI
  ? mongoose.connect(process.env.MONGODB_URI)
  : mongoose.connect(MONGODB_URI);

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
// app.use("/api/users", require("./routes/users"));

app.get("/", (req, res) => {
  res.send("Ecommerce Website API");
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Server listening at Port ${port}`);