const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const { MONGODB_URI } = require("./configuration");

// Fix all Deprecation Warnings
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
app.use("/api/users", require("./routes/users"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/categories", require("./routes/categories"));
app.use("/api/products", require("./routes/products"));
app.use("/api/cart", require("./routes/cart"));
app.use("/api/order", require("./routes/orders"));
app.use("/api/review", require("./routes/reviews"));

app.get("/", (req, res) => {
  res.send("Ecommerce Website API");
});

// Start the Server
const port = process.env.PORT || 5000;
app.listen(port);
console.log(`Server listening at Port ${port}`);
