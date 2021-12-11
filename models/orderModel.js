const Sequelize = require("sequelize");
const db = require("../config/db");

var Orders = db.define("Orders", {
  userId: Sequelize.STRING,
  planName: Sequelize.STRING,
});

module.exports = Orders;
