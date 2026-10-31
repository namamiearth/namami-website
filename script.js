/* NamamiEarth: menu, product filter, enquiry form. Plain JavaScript, no dependencies. */
(function () {
  "use strict";
  var NUMBER = "918295950901"; // WhatsApp number used by the enquiry form
  var wa = function (m) { return "https://wa.me/" + NUMBER + "?text=" + encodeURIComponent(m); };

  // Header shadow on scroll
  var hdr = document.querySelector(".hdr");
  if (hdr) { var on = function () { hdr.classList.toggle("scrolled", window.scrollY > 8); }; on(); window.addEventListener("scroll", on, { passive: true }); }

  // Mobile menu
  var btn = document.querySelector(".menu"), nav = document.getElementById("nav");
  if (btn && nav) {
    var close = function () { nav.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); };
    btn.addEventListener("click", function () { var o = nav.classList.toggle("open"); btn.setAttribute("aria-expanded", String(o)); });
    nav.addEventListener("click", function (e) { if (e.target.tagName === "A") close(); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(); });
  }

  // Products page: filter the server-rendered cards (works with crawlers; JS only hides or shows)
  var grid = document.getElementById("catalogue");
  if (grid) {
    var chips = [].slice.call(document.querySelectorAll(".chip")), cards = [].slice.call(grid.children);
    var apply = function (f) {
      cards.forEach(function (c) { c.hidden = !(f === "all" || c.dataset.cat === f); });
      chips.forEach(function (c) { c.setAttribute("aria-pressed", String(c.dataset.filter === f)); });
    };
    chips.forEach(function (c) { c.addEventListener("click", function () { apply(c.dataset.filter); history.replaceState(null, "", c.dataset.filter === "all" ? location.pathname : "#" + c.dataset.filter); }); });
    var h = location.hash.slice(1); apply(["hamper", "fruit", "custom"].indexOf(h) > -1 ? h : "all");
  }

  // Enquiry form: opens WhatsApp with the message pre-filled (no backend)
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
