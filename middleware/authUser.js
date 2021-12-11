const User = require("../models/usersModel");
const bcrypt = require("bcryptjs");

const authUser = async (req, res) => {
  const { userName, password } = req.body;
  const user = await User.findOne({ where: { email: userName } });
  if (user && (await bcrypt.compare(password, user.password))) {
    req.session.user = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    if (user.isAdmin) {
      res.redirect("/adminDashboard");
    } else {
      res.redirect("/dashboard");
    }
  } else {
    const error = "Username or Password is incorrect";
    res.render("login", { error });
  }
};

module.exports = authUser;
