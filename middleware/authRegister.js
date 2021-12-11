const authRegister = (req, res) => {
  const error = "Fields must not be empty";
  return new Promise((resolve, reject) => {
    if (req.body.email === "") {
      reject(res.render("registration", { error }));
    } else if (req.body.password === "") {
      reject(res.render("registration", { error }));
    } else if (req.body.confirmPassword === "") {
      reject(res.render("registration", { error }));
    } else if (req.body.firstName === "") {
      reject(res.render("registration", { error }));
    } else if (req.body.lastName === "") {
      reject(res.render("registration", { error }));
    } else if (req.body.phone === "") {
      reject(res.render("registration", { error }));
    } else if (req.body.companyAddress === "") {
      reject(res.render("registration", { error }));
    } else if (req.body.address === "") {
      reject(res.render("registration", { error }));
    } else if (req.body.postalCode === "") {
      reject(res.render("registration", { error }));
    } else if (req.body.city === "") {
      reject(res.render("registration", { error }));
    } else if (req.body.country === "") {
      reject(res.render("registration", { error }));
    } else if (isNaN(req.body.phone)) {
      reject(
        res.render("registration", {
          error: "Phone Number must contain digits",
        })
      );
    } else if (!/^[a-zA-Z0-9]{6,12}$/.test(req.body.password)) {
      reject(
        res.render("registration", {
          error: "Password must contain 6-12 alphanumeric characters",
        })
      );
    }
    resolve();
  });
};

module.exports = authRegister;
