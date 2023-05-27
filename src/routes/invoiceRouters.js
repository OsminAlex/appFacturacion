const { Router } = require("express");
const invoiceController = require("../controllers/invoiceController.js");

const invoiceRouters = Router();

invoiceRouters.get("/", invoiceController.getInvoices);
invoiceRouters.post("/", invoiceController.postInvoice);

module.exports = invoiceRouters;
