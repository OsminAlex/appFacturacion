const { DataTypes } = require("sequelize");
const sequelize = require("./connection");

const Invoice = sequelize.define(
    "Invoice",
    {
        invoiceNumber :{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        client: {
            type: DataTypes.STRING
        }
    },
    {
        timestamps: false
    }
    
)

module.exports = Invoice;