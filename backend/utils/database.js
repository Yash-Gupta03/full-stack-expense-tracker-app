const Sequelize = require("sequelize");
const sequelize = new Sequelize("expense_app", "root", "Yash@123", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
