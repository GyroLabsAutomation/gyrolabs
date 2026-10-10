/* Gyro Labs — main.js: mobile menu, footer year, copy-email button. */
(function () {
  'use strict';

  var btn = document.getElementById('menuBtn');
  var nav = document.getElementById('nav');
  if (btn && nav) {
    var setOpen = function (open) {
      nav.classList.toggle('open', open);
      btn.setAttribute('aria-expanded', String(open));
    };
    btn.addEventListener('click', function () { setOpen(!nav.classList.contains('open')); });
    nav.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
  }

  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  var copy = document.getElementById('copyMail');
  if (copy) {
    var email = (window.GYRO_CONFIG && window.GYRO_CONFIG.email) || copy.getAttribute('data-email');
    copy.addEventListener('click', function () {
      var done = function (ok) {
        copy.textContent = ok ? 'Copied' : 'Select and copy the address above';
        setTimeout(function () { copy.textContent = 'Copy address'; }, 2200);
      };
      try { navigator.clipboard.writeText(email).then(function () { done(true); }, function () { done(false); }); }
      catch (e) { done(false); }
    });
  }
})();
