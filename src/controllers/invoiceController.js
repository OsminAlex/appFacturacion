const Invoices = require("../models/Invoice.js");
const InvoiceDetails = require("../models/InvoiceDetail.js");

const postInvoice = async (req, res) => {
  const newInvoice = req.body;

  const invoice = {
    client: newInvoice.client,
  };

  const InvoiceDetails = newInvoice.detail;

  console.log(invoice);

  //   InvoiceDetails.forEach((detail) => {
  //     console.log(detail);
  //   });

  try {
    const createdInvoice = await Invoices.create(invoice);

    InvoiceDetails.forEach(async (detail) => {
      detail.invoiceNumber = createdInvoice.invoiceNumber;

      const createdDetail = await InvoiceDetails.create(detail);
    });

    res.status(201).json({ invoiceNumber: createdInvoice.invoiceNumber });
  } catch (error) {
    res.status(500).json({ message: `Error: ${error.message}` });
  }

  //res.json(newInvoice);
};

module.exports = {
  postInvoice,
};
