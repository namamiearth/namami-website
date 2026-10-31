/* NamamiEarth: menu, product catalogue, WhatsApp ordering and enquiries. No dependencies. */
(function () {
  "use strict";
  var NUMBER = "917042385828"; // change here to update every WhatsApp link rendered by JS
  var wa = function (m) { return "https://wa.me/" + NUMBER + "?text=" + encodeURIComponent(m); };

  var PRODUCTS = [
    { id: "classic", cat: "hamper", name: "Classic Diwali Hamper", desc: "Almonds, cashews and pistachios in a gift-ready pack.", price: 899, was: 1099, shape: "almond", tone: "" },
    { id: "festive", cat: "hamper", name: "Festive Bucket Hamper", desc: "Cashews, almonds, pistachios and raisins in a festive bucket.", price: 1299, was: 1599, shape: "cashew", tone: "tone-b", tag: "Most gifted" },
    { id: "premium", cat: "hamper", name: "Premium Dry Fruit Set", desc: "Almonds, cashews, pistachios and dates, curated as a set.", price: 699, was: 899, shape: "pista", tone: "tone-c" },
    { id: "almonds", cat: "fruit", name: "Almonds", desc: "Handpicked, crunchy and naturally sweet.", shape: "almond", tone: "tone-d" },
    { id: "cashews", cat: "fruit", name: "Cashews", desc: "Creamy whole cashews, hygienically packed.", shape: "cashew", tone: "" },
    { id: "pistachios", cat: "fruit", name: "Pistachios", desc: "Lightly roasted, rich in flavour.", shape: "pista", tone: "tone-b" },
    { id: "raisins", cat: "fruit", name: "Raisins", desc: "Plump, juicy and naturally sweet.", shape: "pista", tone: "tone-c" },
    { id: "walnuts", cat: "fruit", name: "Walnuts", desc: "Fresh kernels with a mild, buttery taste.", shape: "almond", tone: "tone-d" },
    { id: "mix", cat: "fruit", name: "Mix dry fruits", desc: "A balanced mix of our most-loved dry fruits.", shape: "cashew", tone: "" },
    { id: "bucket", cat: "custom", name: "Build your own bucket", desc: "Pick your dry fruits and we will pack a custom bucket for you.", shape: "pista", tone: "tone-b", tag: "Custom" },
    { id: "corporate", cat: "custom", name: "Corporate gifting", desc: "Hampers for teams, partners and clients, in bulk quantities.", shape: "almond", tone: "tone-c", tag: "Bulk" }
  ];

  function fmt(n) { return "\u20B9" + n.toLocaleString("en-IN"); }

  function tile(p, i) {
    var s = "";
    for (var k = 0; k < 6; k++) {
      var x = 18 + ((k * 37 + i * 13) % 84), y = 16 + ((k * 29 + i * 17) % 50), r = (k * 47 + i * 23) % 180;
      var f = k % 2 ? "#2f8f5b" : "#1f7a4c", t = "translate(" + x + " " + y + ") rotate(" + r + ")";
      if (p.shape === "cashew") s += '<path transform="' + t + '" d="M-11 -3C-6 -12 8 -10 11 0C12 6 6 9 3 5C1 2 -3 3 -5 6C-9 10 -14 4 -11 -3Z" fill="' + f + '" opacity=".85"/>';
      else if (p.shape === "pista") s += '<ellipse transform="' + t + '" rx="7.5" ry="9" fill="' + (k % 2 ? "#8fbf7a" : "#5fa36b") + '"/><path transform="' + t + '" d="M0 -9V-1" stroke="#e6f0e3" stroke-width="1.4"/>';
      else s += '<path transform="' + t + '" d="M-12 0C-7 -10 7 -10 12 0C7 10 -7 10 -12 0Z" fill="' + f + '" opacity=".85"/>';
    }
    return '<div class="tile ' + p.tone + '"><svg viewBox="0 0 120 80" aria-hidden="true">' + s + "</svg>" + (p.tag ? '<span class="badge">' + p.tag + "</span>" : "") + "</div>";
  }

  function card(p, i) {
    var price = p.price
      ? '<div class="price">' + fmt(p.price) + "<s>" + fmt(p.was) + '</s><span class="off">' + Math.round((1 - p.price / p.was) * 100) + "% off</span></div>"
      : '<div class="price ask">Price on request</div>';
    var order = p.price
      ? "Hi NamamiEarth, I'd like to order the " + p.name + " (" + fmt(p.price) + "). Please share the next steps."
      : "Hi NamamiEarth, I'd like to order " + p.name.toLowerCase() + ". Please share the available pack sizes and prices.";
    var ask = "Hi NamamiEarth, I have a question about: " + p.name + ".";
    return '<article class="card" data-cat="' + p.cat + '">' + tile(p, i) + '<div class="body"><h3>' + p.name + "</h3><p>" + p.desc + "</p>" + price +
      '<div class="acts"><a class="btn sm" href="' + wa(order) + '" target="_blank" rel="noopener">Order on WhatsApp</a><a class="link" href="' + wa(ask) + '" target="_blank" rel="noopener">Enquire</a></div></div></article>';
  }

  function render(el, list) { el.innerHTML = list.map(card).join(""); }

  // Home: featured hampers
  var featured = document.getElementById("featured");
  if (featured) render(featured, PRODUCTS.filter(function (p) { return p.cat === "hamper"; }));

  // Products page: filterable catalogue
  var grid = document.getElementById("catalogue");
  if (grid) {
    var chips = [].slice.call(document.querySelectorAll(".chip"));
    var apply = function (f) {
      render(grid, PRODUCTS.filter(function (p) { return f === "all" || p.cat === f; }));
      chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c.dataset.filter === f)); });
    };
    chips.forEach(function (c) { c.addEventListener("click", function () { apply(c.dataset.filter); history.replaceState(null, "", c.dataset.filter === "all" ? "#" : "#" + c.dataset.filter); }); });
    var h = location.hash.slice(1);
    apply(["hamper", "fruit", "custom"].indexOf(h) > -1 ? h : "all");
  }

  // Mobile menu
  var btn = document.querySelector(".menu"), nav = document.getElementById("nav");
  if (btn && nav) {
    btn.addEventListener("click", function () { var o = nav.classList.toggle("open"); btn.setAttribute("aria-expanded", String(o)); });
    nav.addEventListener("click", function (e) { if (e.target.tagName === "A") { nav.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); } });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") { nav.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); } });
  }

  // Enquiry form: opens WhatsApp with the message pre-filled (no backend needed)
  var form = document.getElementById("enquiry");
  if (form) form.addEventListener("submit", function (e) {
    e.preventDefault();
    var f = form.elements, err = document.getElementById("err");
    if (!f.name.value.trim() || !f.message.value.trim()) { err.textContent = "Please add your name and a short message."; return; }
    err.textContent = "";
    var m = "Hi NamamiEarth, I'm " + f.name.value.trim() + (f.city.value.trim() ? " from " + f.city.value.trim() : "") + ".\nInterested in: " + f.topic.value + "\n" + f.message.value.trim();
    window.open(wa(m), "_blank", "noopener");
  });

  var y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear();
})();
