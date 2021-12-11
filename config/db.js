const Sequelize = require("sequelize");

var sequelize = new Sequelize(
  "d289ska2gbnhah",
  "xptdzjzvbglihq",
  "12e7f07422d1dd8066c1c4ee27ac3a3f54d6c6c0b16cc08b6cf5122d91da740e",
  {
    host: "ec2-34-205-217-14.compute-1.amazonaws.com",
    dialect: "postgres",
    port: 5432,
    dialectOptions: {
      ssl: { rejectUnauthorized: false },
    },
    query: { raw: true },
  }
);

module.exports = sequelize;
