/* ===========================
   RO Care India — Scripts
   =========================== */
(function () {
  'use strict';

  // Mobile nav toggle
  var navToggle = document.getElementById('navToggle');
  var nav = document.getElementById('nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      navToggle.classList.toggle('open');
    });

    // Close menu when a link is clicked
    nav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        navToggle.classList.remove('open');
      });
    });
  }

  // Sticky header shadow on scroll
  var header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', function () {
      header.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  // Current year in footer
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Build a WhatsApp message from form data and open chat
  var WHATSAPP_NUMBER = '919999999999';

  function sendToWhatsApp(data, headline) {
    var lines = [headline];
    Object.keys(data).forEach(function (key) {
      if (data[key]) {
        var label = key.charAt(0).toUpperCase() + key.slice(1);
        lines.push(label + ': ' + data[key]);
      }
    });
    var url = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(lines.join('\n'));
    window.open(url, '_blank');
  }

  function collect(form) {
    var data = {};
    new FormData(form).forEach(function (value, key) {
      data[key] = ('' + value).trim();
    });
    return data;
  }

  // Hero callback form
  var heroForm = document.getElementById('heroForm');
  if (heroForm) {
    heroForm.addEventListener('submit', function (e) {
      e.preventDefault();
      sendToWhatsApp(collect(heroForm), '*New Callback Request — RO Care India*');
      heroForm.reset();
    });
  }

  // Contact form
  var contactForm = document.getElementById('contactForm');
  var formNote = document.getElementById('formNote');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      sendToWhatsApp(collect(contactForm), '*New Service Request — RO Care India*');
      if (formNote) {
        formNote.hidden = false;
      }
      contactForm.reset();
      setTimeout(function () {
        if (formNote) formNote.hidden = true;
      }, 6000);
    });
  }

  // Simple reveal-on-scroll animation
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.card, .step, .why-box, .brand-chip').forEach(function (el) {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity .5s ease, transform .5s ease';
      observer.observe(el);
    });
  }
})();
