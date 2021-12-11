const path = require("path");
const express = require("express");
const multer = require("multer");
const db = require("./config/db");
const clientSessions = require("client-sessions");
const {
  userLogin,
  registerUser,
  getUserDashboard,
  getAdminDashboard,
} = require("./controllers/userController");
const {
  displayPlans,
  addPlan,
  getPlans,
  getPlanById,
  updatePlan,
  popularPlan,
  addToCart,
  getShoppingCart,
  checkout,
} = require("./controllers/plansController");

const app = express();

app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "./web311_assignment2")));
app.use(express.urlencoded({ extended: true }));
/*app.use(express.static("views/images"));*/
// Client Session
app.use(
  clientSessions({
    cookieName: "session",
    secret: "web311_assignment",
    duration: 60 * 60 * 1000,
    activeDuration: 1000 * 60,
  })
);
app.use(
  clientSessions({
    cookieName: "shopping_cart",
    secret: "first secret",
    duration: 7 * 24 * 60 * 60 * 1000,
  })
);
function ensureLogin(req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    next();
  }
}
function isAdmin(req, res, next) {
  if (!req.session.user.isAdmin) {
    res.redirect("/login");
  } else {
    next();
  }
}

// Multer
const storage = multer.diskStorage({
  destination: "./web311_assignment2/images/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    var ext = path.extname(file.originalname);
    if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
      return callback(new Error("Only images are allowed"));
    }
    callback(null, true);
  },
}).single("image");

db.authenticate()
  .then(function () {
    console.log("Connection has been established successfully.");
  })
  .catch(function (err) {
    console.log("Unable to connect to the database:", err);
  });

app.get("/", popularPlan);

app.get("/dashboard", ensureLogin, getUserDashboard);
app.get("/adminDashboard", ensureLogin, isAdmin, getAdminDashboard);

app.get("/cwh", displayPlans);

app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/plans/add", ensureLogin, isAdmin, (req, res) => {
  res.render("addPlan");
});

app.post("/plans/add", ensureLogin, isAdmin, upload, addPlan);
app.get("/planPackages", ensureLogin, isAdmin, getPlans);
app.get("/plan/:id", ensureLogin, isAdmin, getPlanById);
app.post("/plan/update", ensureLogin, isAdmin, updatePlan);

app.post("/login", userLogin);

app.get("/registration", (req, res) => {
  res.render("registration");
});
app.get("/addToCart/:id", ensureLogin, addToCart);
app.get("/shoppingCart", ensureLogin, getShoppingCart);
app.get("/checkout/:planName", ensureLogin, checkout);
app.post("/registration", registerUser);
app.get("/logout", (req, res) => {
  req.session.reset();
  res.redirect("/login");
});

app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// This use() will add an error handler function to
// catch all errors.
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Define a port to listen to requests on.
const HTTP_PORT = process.env.PORT || 8080;

// Call this function after the http server starts listening for requests.
function onHttpStart() {
  console.log("Express http server listening on: " + HTTP_PORT);
}

// Listen on port 8080. The default port for http is 80, https is 443. We use 8080 here
// because sometimes port 80 is in use by other applications on the machine
app.listen(HTTP_PORT, onHttpStart);
