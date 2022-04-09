const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./routes/user");
const vendorRoutes = require("./routes/vendors");
const customersRoutes = require("./routes/customers");
const itemsRoute = require("./routes/items");
const stockRoute = require("./routes/stock");
const pdfInvoice = require("./routes/invoice_pdf");
const salesRoute = require("./routes/sales");
const purchaseRoute = require("./routes/purchase");
const logoutRoute = require("./routes/logout-auth");
const expenseRoute = require("./routes/expenses");
const reportRoutes = require("./routes/report");
//app.use(allowCrossDomain); // plumbing it in as middleware
app.use(cors());

mongoose.connect(process.env.MONGODB);

// mongoose.connect(
//   "mongodb+srv://satsol:2346@cluster0.0xn3d.mongodb.net/test?retryWrites=true&w=majority"
// );

mongoose.Promise = global.Promise;

app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// Routes which handle requests
app.use("/user", userRoutes);
app.use("/vendors", vendorRoutes);
app.use("/customers", customersRoutes);
app.use("/items", itemsRoute);
app.use("/stock", stockRoute);
app.use("/pdf", pdfInvoice);
app.use("/sales", salesRoute);
app.use("/purchase", purchaseRoute);
app.use("/logout", logoutRoute);
app.use("/expense", expenseRoute);
app.use("/report", reportRoutes);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      author: "Satyam Naithani",
      descrption: "Invalid Route",
      message: error.message,
    },
  });
});

module.exports = app;