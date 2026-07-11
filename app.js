/* =========================================================
   RÉJEWELS — interactivity
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Catalogue data ---------- */
  function imgs(slug, n){ var a = []; for (var i = 1; i <= n; i++) a.push("assets/catalogue/" + slug + "-" + i + ".jpg"); return a; }
  var CAT_IMGS = {
    "Baju Band":    imgs("bajuband", 4),
    "Bangles":      imgs("bangles", 4),
    "Bracelets":    imgs("bracelets", 4),
    "Couple Bands": imgs("couple-bands", 8),
    "Earrings":     imgs("earrings", 4),
    "Jhumkas":      imgs("jhumkas", 4),
    "Ladies Rings": imgs("ladies-rings", 4),
    "Men's Rings":  imgs("mens-rings", 4),
    "Necklaces":    imgs("necklaces", 4),
    "Pendant Sets": [], "Pendants": [], "Tanmani": []
  };
  var CATS = [
    { name: "Baju Band" }, { name: "Bangles" }, { name: "Bracelets" },
    { name: "Couple Bands" }, { name: "Earrings" }, { name: "Jhumkas" },
    { name: "Ladies Rings" }, { name: "Men's Rings" }, { name: "Necklaces" },
    { name: "Pendant Sets" }, { name: "Pendants" }, { name: "Tanmani" }
  ];
  // Homepage lookbook — a curated jewel-box mosaic drawn from the catalogue
  var LOOK = [
    { src: CAT_IMGS["Necklaces"][2],    cat: "Necklaces",    cls: "gitem__big" },
    { src: CAT_IMGS["Jhumkas"][0],      cat: "Jhumkas",      cls: "gitem__tall" },
    { src: CAT_IMGS["Earrings"][0],     cat: "Earrings",     cls: "" },
    { src: CAT_IMGS["Ladies Rings"][1], cat: "Ladies Rings", cls: "" },
    { src: CAT_IMGS["Bracelets"][0],    cat: "Bracelets",    cls: "" },
    { src: CAT_IMGS["Bangles"][1],      cat: "Bangles",      cls: "gitem__wide" },
    { src: CAT_IMGS["Men's Rings"][0],  cat: "Men's Rings",  cls: "" }
  ];

  var VALUES = [
    { no: "01", t: "Vertically Integrated Manufacturing", d: "Design, casting, setting and finishing under one roof — control over every gram and every grade.",
      icon: '<path d="M12 3 3 8v8l9 5 9-5V8l-9-5Z"/><path d="m3 8 9 5 9-5"/><path d="M12 13v8"/>' },
    { no: "02", t: "IGI Certified Jewellery", d: "Independently graded stones with documentation your buyers can trust at every price point.",
      img: "assets/igi-logo.png" },
    { no: "03", t: "Customisable Pieces", d: "We can customise any piece according to any design you have in mind.",
      icon: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/>' },
    { no: "04", t: "On-Time Delivery", d: "Reliable production timelines and secured export logistics to retail partners across continents.",
      icon: '<circle cx="12" cy="12" r="9"/><path d="M2.5 9h19M2.5 15h19M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>' }
  ];

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var make = function (html) { var t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstChild; };

  /* ---------- Build: mega menu ---------- */
  var mega = $("#megaGrid");
  if (mega) {
    CATS.forEach(function (c) {
      mega.appendChild(make('<a class="menu__link" href="#collections"><span class="dot"></span>' + c.name + '</a>'));
    });
  }

  /* ---------- Build: collection cards ---------- */
  var grid = $("#cardsGrid");
  if (grid) {
    CATS.forEach(function (c) {
      var list = CAT_IMGS[c.name] || [];
      if (list.length) {
        grid.appendChild(make(
          '<a class="card" data-cat="' + c.name + '" href="#collections">' +
            '<div class="card__media"><span class="card__count">' + list.length + ' designs</span>' +
            '<img src="' + list[0] + '" alt="' + c.name + '" loading="lazy" /></div>' +
            '<div class="card__body"><span class="card__name">' + c.name + '</span>' +
            '<span class="card__go">View <span class="arr">→</span></span></div>' +
          '</a>'
        ));
      } else {
        grid.appendChild(make(
          '<a class="card" href="#contact">' +
            '<div class="card__media ph" data-ph="' + c.name + ' — add photography"></div>' +
            '<div class="card__body"><span class="card__name">' + c.name + '</span>' +
            '<span class="card__go">Enquire <span class="arr">→</span></span></div>' +
          '</a>'
        ));
      }
    });
  }

  /* ---------- Build: value tiles ---------- */
  var vg = $("#valuesGrid");
  if (vg) {
    VALUES.forEach(function (v, i) {
      var iconMarkup = v.img
        ? '<span class="value__icon value__icon--logo"><img src="' + v.img + '" alt="IGI" /></span>'
        : '<span class="value__icon"><svg viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">' + v.icon + '</svg></span>';
      var el = make(
        '<div class="value reveal reveal-d' + ((i % 4) + 1) + '">' +
          '<span class="value__no">' + v.no + '</span>' +
          iconMarkup +
          '<h3>' + v.t + '</h3><p>' + v.d + '</p>' +
        '</div>'
      );
      vg.appendChild(el);
    });
  }

  /* ---------- Build: lookbook gallery ---------- */
  var gal = $("#gallery");
  if (gal) {
    LOOK.forEach(function (g, i) {
      gal.appendChild(make(
        '<div class="gitem ' + g.cls + '" data-look="' + i + '">' +
          '<img src="' + g.src + '" alt="' + g.cat + '" loading="lazy" />' +
          '<span class="gitem__plus">+</span>' +
          '<div class="gitem__over"></div>' +
        '</div>'
      ));
    });
  }

  /* ---------- Build: mobile menu ---------- */
  var mob = $("#mobileMenu");
  if (mob) {
    var catLinks = CATS.map(function (c) { return '<a href="#collections">' + c.name + '</a>'; }).join("");
    mob.innerHTML =
      '<div class="mobile__group">' +
        '<button class="mobile__head" type="button">About Us<span class="pm"></span></button>' +
        '<div class="mobile__sub"><div class="mobile__sub-inner">' +
          '<a href="#why">Our Strengths</a><a href="#about">Manufacturing</a><a href="#about">IGI Certificate</a>' +
        '</div></div>' +
      '</div>' +
      '<div class="mobile__group">' +
        '<button class="mobile__head" type="button">Catalogue<span class="pm"></span></button>' +
        '<div class="mobile__sub"><div class="mobile__sub-inner">' + catLinks + '</div></div>' +
      '</div>' +
      '<a class="mobile__simple" href="#collections">Jewellery Guide</a>' +
      '<a class="mobile__simple" href="#customise">Customization</a>' +
      '<a class="mobile__simple" href="#contact">Get in Touch</a>' +
      '<div class="mobile__cta">' +
        '<a href="#contact" class="btn btn--gold">Request Catalogue <span class="arr">→</span></a>' +
      '</div>' +
      '<div class="mobile__contact">' +
        '<span>602/A Panchratna Building, Opera House, Mumbai 400 004</span>' +
        '<a href="mailto:info@rejewels.com">info@rejewels.com</a>' +
        '<a href="tel:+912240042828">+91-22-4004 2828</a>' +
      '</div>';

    // accordion
    Array.prototype.forEach.call(mob.querySelectorAll(".mobile__head"), function (h) {
      h.addEventListener("click", function () { h.parentNode.classList.toggle("open"); });
    });
    // close on link tap
    Array.prototype.forEach.call(mob.querySelectorAll("a"), function (a) {
      a.addEventListener("click", closeMobile);
    });
  }

  /* ---------- Header scroll state ---------- */
  var header = $("#header");
  var hero = $("#top");
  function onScroll() {
    var solid = window.scrollY > 40;
    header.classList.toggle("is-solid", solid);
    // light (over hero) only while hero is in view and not solid
    var heroBottom = hero ? hero.offsetTop + hero.offsetHeight - 120 : 0;
    header.classList.toggle("is-light", !solid && window.scrollY < heroBottom);
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile toggle ---------- */
  var toggle = $("#navToggle");
  function openMobile() { mob.classList.add("is-open"); toggle.classList.add("is-x"); toggle.setAttribute("aria-expanded", "true"); document.body.style.overflow = "hidden"; }
  function closeMobile() { mob.classList.remove("is-open"); toggle.classList.remove("is-x"); toggle.setAttribute("aria-expanded", "false"); document.body.style.overflow = ""; }
  if (toggle) {
    toggle.addEventListener("click", function () {
      mob.classList.contains("is-open") ? closeMobile() : openMobile();
    });
    // Escape closes the mobile menu and returns focus to the toggle (keyboard a11y)
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && mob.classList.contains("is-open")) {
        closeMobile();
        toggle.focus();
      }
    });
  }
  // logo always returns home and closes the mobile menu
  var brand = $("#brandHome");
  if (brand) brand.addEventListener("click", function () { if (mob.classList.contains("is-open")) closeMobile(); });
  // animate hamburger to X
  var style = document.createElement("style");
  style.textContent = ".nav__toggle.is-x span:nth-child(1){transform:translateY(6.6px) rotate(45deg)}.nav__toggle.is-x span:nth-child(2){opacity:0}.nav__toggle.is-x span:nth-child(3){transform:translateY(-6.6px) rotate(-45deg)}";
  document.head.appendChild(style);

  /* ---------- Smooth-scroll close on anchor (desktop too) ---------- */
  document.addEventListener("click", function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a || a.hasAttribute("data-cat")) return;
    var id = a.getAttribute("href");
    if (id.length < 2) return;
    var target = document.querySelector(id);
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: "smooth", block: "start" }); }
  });

  /* ---------- Scroll reveal ---------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
  Array.prototype.forEach.call(document.querySelectorAll(".reveal"), function (el) { io.observe(el); });

  /* ---------- Lightbox / category galleries ---------- */
  var lb = $("#lightbox"), lbImg = $("#lbImg"), lbCap = $("#lbCap");
  var lbItems = [], lbTitle = "", lbI = 0, lbReturnFocus = null;
  function pad2(n){ return n < 10 ? "0" + n : "" + n; }
  function showLb(i) {
    if (!lbItems.length) return;
    lbI = (i + lbItems.length) % lbItems.length;
    lbImg.src = lbItems[lbI];
    lbImg.alt = lbTitle;
    lbCap.textContent = lbTitle + "   ·   " + pad2(lbI + 1) + " / " + pad2(lbItems.length);
  }
  function openGallery(items, start, title) {
    if (!items || !items.length) return;
    lbReturnFocus = document.activeElement;   // remember trigger so focus isn't lost
    lbItems = items; lbTitle = title || "";
    lb.classList.toggle("lightbox--solo", items.length < 2);
    showLb(start || 0);
    lb.classList.add("is-open"); lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    $("#lbClose").focus();                    // move focus into the dialog
  }
  function closeLb() {
    lb.classList.remove("is-open"); lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lbReturnFocus && lbReturnFocus.focus) lbReturnFocus.focus();  // restore focus
  }
  // category card → that category's gallery
  if (grid) {
    grid.addEventListener("click", function (e) {
      var card = e.target.closest(".card[data-cat]");
      if (!card) return;
      e.preventDefault();
      openGallery(CAT_IMGS[card.getAttribute("data-cat")], 0, card.getAttribute("data-cat"));
    });
  }
  // lookbook tile → mixed gallery
  if (gal) {
    gal.addEventListener("click", function (e) {
      var it = e.target.closest("[data-look]");
      if (!it) return;
      var i = +it.getAttribute("data-look");
      openGallery(LOOK.map(function (l) { return l.src; }), i, LOOK[i].cat);
    });
  }
  $("#lbClose").addEventListener("click", closeLb);
  $("#lbPrev").addEventListener("click", function () { showLb(lbI - 1); });
  $("#lbNext").addEventListener("click", function () { showLb(lbI + 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLb();
    if (e.key === "ArrowLeft") showLb(lbI - 1);
    if (e.key === "ArrowRight") showLb(lbI + 1);
    if (e.key === "Tab") {
      // keep focus inside the dialog (only the visible controls are focusable)
      var focusable = Array.prototype.filter.call(
        lb.querySelectorAll("button"),
        function (b) { return b.offsetParent !== null; }
      );
      if (!focusable.length) return;
      var first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      else if (focusable.indexOf(document.activeElement) === -1) { e.preventDefault(); first.focus(); }
    }
  });

  /* ---------- Form validation ---------- */
  var form = $("#enquiryForm");
  if (form) {
    var fields = {
      name:    { el: $("#f-name"),    test: function (v) { return v.trim().length >= 2; } },
      company: { el: $("#f-company"), test: function (v) { return v.trim().length >= 2; } },
      email:   { el: $("#f-email"),   test: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()); } },
      phone:   { el: $("#f-phone"),   test: function (v) { return v.trim() === "" || /[0-9][0-9\s().+-]{6,}/.test(v.trim()); } },
      message: { el: $("#f-message"), test: function (v) { return v.trim().length >= 5; } }
    };
    function validate(key) {
      var f = fields[key], wrap = f.el.closest(".field"), ok = f.test(f.el.value);
      wrap.classList.toggle("invalid", !ok);
      return ok;
    }
    Object.keys(fields).forEach(function (k) {
      fields[k].el.addEventListener("blur", function () { validate(k); });
      fields[k].el.addEventListener("input", function () {
        if (fields[k].el.closest(".field").classList.contains("invalid")) validate(k);
      });
    });
    var errBox = $("#formError");
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var allOk = true, firstBad = null;
      Object.keys(fields).forEach(function (k) {
        var ok = validate(k);
        if (!ok && !firstBad) firstBad = fields[k].el;
        allOk = allOk && ok;
      });
      if (!allOk) { if (firstBad) firstBad.focus(); return; }

      // Real submission: POST the form to Formspree, which emails it to us.
      // NOTE: the form's action must hold a real Formspree form ID before this
      // works in production — see the TODO comment on #enquiryForm in index.html.
      var btn = form.querySelector('button[type="submit"]');
      var btnHtml = btn.innerHTML;
      if (errBox) { errBox.classList.remove("show"); errBox.textContent = ""; }
      btn.disabled = true;
      btn.innerHTML = "Sending…";

      fetch(form.action, {
        method: "POST",
        body: new FormData(form),
        headers: { "Accept": "application/json" }
      }).then(function (res) {
        if (res.ok) {
          btn.style.display = "none";
          form.querySelector(".form__note").style.display = "none";
          $("#formSuccess").classList.add("show");
          form.querySelectorAll("input, textarea").forEach(function (el) { el.value = ""; el.disabled = true; });
        } else {
          return res.json().then(function (data) {
            var msg = data && data.errors && data.errors.length
              ? data.errors.map(function (er) { return er.message; }).join(" ")
              : "";
            throw new Error(msg);
          });
        }
      }).catch(function () {
        // Visible inline failure state — never fail silently.
        btn.disabled = false;
        btn.innerHTML = btnHtml;
        if (errBox) {
          errBox.textContent = "Sorry — we couldn’t send your enquiry just now. Please try again, or email us directly at info@rejewels.com.";
          errBox.classList.add("show");
        }
      });
    });
  }

  /* ---------- Necklace slideshows (hero + What We Do frame) ---------- */
  Array.prototype.forEach.call(document.querySelectorAll(".slides[data-slideshow]"), function (show) {
    var imgs = Array.prototype.slice.call(show.querySelectorAll("img"));
    if (imgs.length < 2) { if (imgs[0]) imgs[0].classList.add("is-active"); return; }
    var interval = parseInt(show.getAttribute("data-slideshow"), 10) || 5000;
    var i = 0;
    imgs[0].classList.add("is-active");
    setInterval(function () {
      imgs[i].classList.remove("is-active");
      i = (i + 1) % imgs.length;
      imgs[i].classList.add("is-active");
    }, interval);
  });
})();
