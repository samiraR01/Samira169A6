const Sequelize = require("sequelize");
const db = require("../config/db");

var User = db.define("Users", {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  phone: Sequelize.STRING,
  password: Sequelize.STRING,
  isAdmin: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = User;
