const Category = require("../models/Category");
const Product = require("../models/Product");
const Invoice = require("../models/Invoice");
const InvoiceDetail = require("../models/InvoiceDetail");

const syncModel = async () => {
  await Category.sync();
  await Product.sync();
  await Invoice.sync();
  await InvoiceDetail.sync();
};

module.exports = syncModel;
