const { Models, DataTypes } = require("sequelize");
const sequelize = require("./connection");

const Product = sequelize.define(
  "Product",
  {
    productId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT(10, 2),
      allowNull: false,
    },
    stock: {
      type: DataTypes.FLOAT(8, 2),
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }
  //   {
  //     timestamps: false,
  //   }
);

module.exports = Product;
