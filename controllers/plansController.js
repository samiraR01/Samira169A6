const Plans = require("../models/planModel");
const Orders = require("../models/orderModel");
const db = require("../config/db");

const addPlan = (req, res) => {
  var {
    planName,
    price,
    description,
    feature1,
    feature2,
    feature3,
    feature4,
    isPopular,
  } = req.body;
  if (isPopular === undefined) {
    isPopular = false;
  } else {
    isPopular = true;
  }
  db.sync().then(async function () {
    await Plans.create({
      planName,
      price,
      description,
      feature1,
      feature2,
      feature3,
      feature4,
      isPopular,
    })
      .then(function (plan) {
        console.log("success!");
      })
      .catch(function (error) {
        console.log("something went wrong!");
      });
    res.redirect("/planPackages");
  });
};

const displayPlans = async (req, res) => {
  var plans = await Plans.findAll();
  res.render("cwh", { plans });
};

const getPlans = (req, res) => {
  db.sync().then(async function () {
    var plans = await Plans.findAll();
    res.render("planPackages", { plans });
  });
};

const getPlanById = (req, res) => {
  db.sync().then(async function () {
    console.log(req.params.id);
    var plan = await Plans.findOne({ where: { id: req.params.id } });
    res.render("plan", { plan });
  });
};

const updatePlan = (req, res) => {
  var {
    planName,
    price,
    description,
    feature1,
    feature2,
    feature3,
    feature4,
    isPopular,
  } = req.body;
  if (isPopular === undefined) {
    isPopular = false;
  } else {
    isPopular = true;
  }
  db.sync().then(async function () {
    await Plans.update(
      {
        planName,
        price,
        description,
        feature1,
        feature2,
        feature3,
        feature4,
        isPopular,
      },
      { where: { id: req.body.id } }
    );
    res.redirect("/planPackages");
  });
};

const popularPlan = (req, res) => {
  db.sync().then(async function () {
    var plan = await Plans.findOne({ where: { isPopular: true } });
    res.render("home", { plan });
  });
};
const addToCart = (req, res) => {
  req.session.cart = {
    id: req.params.id,
  };
  res.redirect("/shoppingCart");
};

const getShoppingCart = (req, res) => {
  var plan;
  db.sync().then(async function () {
    if (req.session.cart) {
      plan = await Plans.findOne({ where: { id: req.session.cart.id } });
      res.render("shoppingCart", { plan });
    } else {
      res.render("shoppingCart", { message: "Cart is Empty" });
    }
  });
};

const checkout = (req, res) => {
  db.sync().then(async function () {
    var userId = req.session.user.id;
    var planName = req.params.planName;
    await Orders.create({ userId, planName })
      .then(() => {
        console.log("success");
      })
      .catch((err) => {
        console.log(err);
      });
    req.session.cart = {};
    res.redirect("/dashboard");
  });
};

module.exports = {
  displayPlans,
  addPlan,
  getPlans,
  getPlanById,
  updatePlan,
  popularPlan,
  addToCart,
  getShoppingCart,
  checkout,
};
