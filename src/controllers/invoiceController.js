const Invoices = require("../models/Invoice");
const InvoiceDetails = require("../models/InvoiceDetail");
const Products = require("../models/Product");

const sequelize = require("../models/connection");

const getInvoices = async (req, res) => {
  const invoices = await Invoices.findAll();
  const invoicedetails = await InvoiceDetails.findAll();
  //res.json(invoices);
  res.json(invoicedetails);
};

const getInvoice = async (req, res) => {
  const { invoiceId } = req.body;

  try {
    const invoice = await Invoice.findByPk(invoiceId);
    res.json(invoice);

    if (invoiceId == null) {
      res.status(400).json({ message: "Invoice not found" });
      return;
    }

    res.json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// const postInvoice = async (req, res) => {
//   const newInvoice = req.body;

//   const invoice = {
//     client: newInvoice.client,
//   };

//   const invoiceDetails = newInvoice.details;

//   const t = await sequelize.transaction(); // Iniciar la transacción

//   try {
//     const createdInvoice = await Invoices.create(invoice, { transaction: t });

//     invoiceDetails.forEach(async (detail) => {
//       detail.invoiceNumber = createdInvoice.invoiceNumber;

//       const product = await Products.findByPk(detail.productId, {
//         transaction: t,
//       });

//       if (product != null) {
//         const createdDetail = await InvoiceDetails.create(detail, {
//           transaction: t,
//         });

//         // Verificar si hay suficiente stock del producto
//         if (detail.qty > product.stock) {
//           throw new Error(
//             `No hay suficiente stock para el producto con ID ${detail.productId}`
//           );
//         }
//       }

//       // Actualizar el stock del producto facturado
//       const updatedStock = product.stock - detail.qty;
//       await Products.update(
//         { stock: updatedStock },
//         { where: { productId: detail.productId }, transaction: t }
//       );
//     });

//     await t.commit(); // Confirmar la transacción
//     res.status(201).json({ invoiceNumber: createdInvoice.invoiceNumber });
//   } catch (error) {
//     await t.rollback(); // Revertir la transacción
//     res.status(500).json({ message: `Error: ${error.message}` });
//   }

//   res.status(201);
// };

const postInvoice = async (req, res) => {
  const newInvoice = req.body;

  const invoice = {
    client: newInvoice.client,
  };

  const invoiceDetails = newInvoice.details;

  const t = await sequelize.transaction(); // Iniciar la transacción

  try {
    const createdInvoice = await Invoices.create(invoice, { transaction: t });

    for (const detail of invoiceDetails) {
      detail.invoiceNumber = createdInvoice.invoiceNumber;

      const product = await Products.findByPk(detail.productId, {
        transaction: t,
      });

      if (product != null) {
        const createdDetail = await InvoiceDetails.create(detail, {
          transaction: t,
        });

        // Verificar si hay suficiente stock del producto
        if (detail.qty > product.stock) {
          throw new Error(
            `No hay suficiente stock para el producto con ID ${detail.productId}`
          );
        }

        // Actualizar el stock del producto facturado
        const updatedStock = product.stock - detail.qty;
        await Products.update(
          { stock: updatedStock },
          { where: { productId: detail.productId }, transaction: t }
        );
      }
    }

    await t.commit(); // Confirmar la transacción
    res.status(201).json({ invoiceNumber: createdInvoice.invoiceNumber });
  } catch (error) {
    await t.rollback(); // Revertir la transacción
    res.status(500).json({ message: `Error: ${error.message}` });
  }

  res.status(201);
};

module.exports = {
  postInvoice,
  getInvoices,
  getInvoice,
};
