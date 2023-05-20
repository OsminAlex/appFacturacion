const Sequelize = require("sequelize");

const sequelize = new Sequelize("appFacturacion","root","Educa2023*",{
    host: "localhost",
    dialect: "mysql",
    port: 3306
});

module.exports = sequelize;