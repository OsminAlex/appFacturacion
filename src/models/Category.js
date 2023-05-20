const { DataTypes } = require("sequelize");
const sequelize = require("./connection");
const Product =require("./Product");

const Category = sequelize.define(
    "Category",
    {
        categoryId: {
            type: DataTypes.INTEGER,            
            primaryKey: true,
            autoIncrement: true
        },
        categoryName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        categoryDescripcion: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        timestamps: false
    }
)

Category.hasMany(Product,{
    foreignKey: "categoryId"
});

Product.belongsTo(Category,{
    foreignKey: "categoryId"
})

module.exports = Category;