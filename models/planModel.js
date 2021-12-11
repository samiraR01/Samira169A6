const Sequelize = require("sequelize");
const db = require("../config/db");

var Plans = db.define("Plans", {
  planName: Sequelize.STRING,
  description: Sequelize.STRING,
  price: Sequelize.DOUBLE,
  feature1: Sequelize.STRING,
  feature2: Sequelize.STRING,
  feature3: Sequelize.STRING,
  feature4: Sequelize.STRING,
  isPopular: Sequelize.BOOLEAN,
});

module.exports = Plans;
