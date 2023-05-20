const { Models, DataTypes } = require("sequelize");
const Product = require("./Product");
const Invoice = require("./Invoice");

const sequelize = require("./connection");

const InvoiceDetail = sequelize.define("InvoiceDetail", {
  invoiceDetailId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  qty: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  price: {
    type: DataTypes.FLOAT(10, 2),
    allowNull: false,
  },
});

Invoice.hasMany(InvoiceDetail, {
  foreignKey: "invoiceNumber",
});

InvoiceDetail.belongsTo(Invoice, {
  foreignKey: "invoiceNumber",
});

Product.hasMany(InvoiceDetail, {
  foreignKey: "productId",
});

InvoiceDetail.belongsTo(Product, {
  foreignKey: "productId",
});

module.exports = InvoiceDetail;
