var cards = document.querySelectorAll(".summary-card");
cards.forEach((card) => {
  if (card.classList.contains("active")) {
    var months = card.children[0].children[0].innerHTML;
    var price = card.children[1].children[1].innerHTML;
    var promo = document.getElementById("promo").innerHTML;
    var pkg = months * price;
    var total = pkg - promo;
    document.getElementById("pkg").innerHTML = pkg.toFixed(2);
    document.getElementById("checkout-months").innerHTML = months;
    document.getElementById("total").innerHTML = total.toFixed(2);
  }
});

function toggle(e) {
  var elems = document.querySelector(".active");
  if (elems !== null) {
    elems.classList.remove("active");
  }
  e.target.classList.add("active");

  var cards = document.querySelectorAll(".summary-card");
  cards.forEach((card) => {
    if (card.classList.contains("active")) {
      var months = card.children[0].children[0].innerHTML;
      var price = card.children[1].children[1].innerHTML;
      var promo = document.getElementById("promo").innerHTML;
      var pkg = months * price;
      var total = pkg - promo;
      document.getElementById("pkg").innerHTML = pkg.toFixed(2);
      document.getElementById("checkout-months").innerHTML = months;
      document.getElementById("total").innerHTML = total.toFixed(2);
    }
  });
}
