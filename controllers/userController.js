const db = require("../config/db");
const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");
const authRegister = require("../middleware/authRegister");
const authUser = require("../middleware/authUser");

const userLogin = (req, res) => {
  if (req.body.userName === "" || req.body.password === "") {
    const error = "Email/Password fields must not be empty!";
    res.render("login", { error });
    // } else if (
    //   /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(req.body.userName)
    // ) {
    //   res.render("login", {
    //     error: "Username must not contain special characters!",
    //   });
  } else {
    authUser(req, res);
  }
};

const registerUser = (req, res) => {
  console.log(req.body);
  authRegister(req, res)
    .then(async () => {
      var { firstName, lastName, email, phone, password } = req.body;
      const userExists = await User.findOne({ where: { email: email } });

      if (userExists) {
        res.render("registration", { error: "User already exists" });
        throw new Error("User already exists");
      }
      bcrypt
        .genSalt(10)
        .then((salt) => bcrypt.hash(password, salt))
        .then((hash) => {
          password = hash;
          db.sync()
            .then(async function () {
              await User.create({
                firstName,
                lastName,
                email,
                phone,
                password,
              }).then((user) => {
                req.session.user = {
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                };
              });
              res.redirect("/dashboard");
            })
            .catch(function (error) {
              console.log("something went wrong!");
            });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => {
      reject("There was an error encrypting the password");
    });
};

const getUserDashboard = (req, res) => {
  res.render("dashboard", { user: req.session.user });
};
const getAdminDashboard = (req, res) => {
  res.render("adminDashboard", { user: req.session.user });
};

module.exports = {
  userLogin,
  registerUser,
  getUserDashboard,
  getAdminDashboard,
};
