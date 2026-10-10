/* Gyro Labs — contact.js: validation, optional endpoint submit, email fallback. */
(function () {
  'use strict';

  var CFG = window.GYRO_CONFIG || {};
  var EMAIL = CFG.email || 'contact.gyrolabs@gmail.com';
  var form = document.getElementById('inquiry');
  if (!form) return;

  var slot = document.getElementById('resultSlot');
  var statusEl = document.getElementById('formStatus');
  var submitBtn = document.getElementById('submitBtn');
  var ids = { name: 'f-name', email: 'f-email', type: 'f-type', desc: 'f-desc' };

  var rules = {
    name: function (v) { return v.trim() ? '' : 'Enter your name.'; },
    email: function (v) {
      if (!v.trim()) return 'Enter your work email.';
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? '' : 'Use an address like name@company.com.';
    },
    type: function (v) { return v ? '' : 'Choose a project type.'; },
    desc: function (v) { return v.trim().length >= 15 ? '' : 'Add a sentence or two about the project.'; }
  };

  function val(id) { return document.getElementById(id).value.trim(); }

  function validate(key) {
    var el = document.getElementById(ids[key]);
    var msg = rules[key](el.value);
    el.closest('.field').setAttribute('data-invalid', msg ? 'true' : 'false');
    el.setAttribute('aria-invalid', msg ? 'true' : 'false');
    document.getElementById('e-' + key).textContent = msg;
    return !msg;
  }

  Object.keys(rules).forEach(function (key) {
    var el = document.getElementById(ids[key]);
    el.addEventListener('blur', function () { validate(key); });
    el.addEventListener('input', function () {
      if (el.closest('.field').getAttribute('data-invalid') === 'true') validate(key);
    });
  });

  // Pre-select project type from ?type=... (used by the service links).
  try {
    var wanted = new URLSearchParams(window.location.search).get('type');
    if (wanted) {
      var sel = document.getElementById('f-type');
      Array.prototype.forEach.call(sel.options, function (o) { if (o.value === wanted) sel.value = wanted; });
    }
  } catch (e) { /* ignore */ }

  function buildInquiry() {
    return [
      'Project inquiry for Gyro Labs', '',
      'Name: ' + val('f-name'),
      'Company: ' + (val('f-company') || 'Not given'),
      'Work email: ' + val('f-email'),
      'Project type: ' + val('f-type'),
      'Robot or controller model: ' + (val('f-robot') || 'Not given'),
      'Preferred contact method: ' + val('f-contact'), '',
      'Project description:', val('f-desc')
    ].join('\n');
  }

  function copyText(text, el, done) {
    var fallback = function () { try { el.focus(); el.select(); } catch (e) {} done(false); };
    try { navigator.clipboard.writeText(text).then(function () { done(true); }, fallback); }
    catch (e) { fallback(); }
  }

  function showEmailFallback(body, intro, failed) {
    var href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent('Project inquiry: ' + val('f-type')) +
      '&body=' + encodeURIComponent(body);
    slot.innerHTML = '';
    var box = document.createElement('div');
    box.className = 'result' + (failed ? ' fail' : '');
    box.innerHTML =
      '<h3>Ready to send by email</h3><p id="resultIntro"></p>' +
      '<textarea id="inqText" readonly aria-label="Inquiry text"></textarea>' +
      '<div class="btn-row"><button type="button" class="btn btn-primary btn-sm" id="copyInq">Copy inquiry</button>' +
      '<a class="btn btn-sm" href="' + href + '">Open in email app</a></div>' +
      '<p>Send it to <strong style="color:var(--fg)">' + EMAIL + '</strong>.</p>';
    slot.appendChild(box);
    document.getElementById('resultIntro').textContent = intro;
    var ta = document.getElementById('inqText');
    ta.value = body;
    document.getElementById('copyInq').addEventListener('click', function () {
      var b = this;
      copyText(body, ta, function (ok) {
        b.textContent = ok ? 'Copied' : 'Text selected: press copy';
        setTimeout(function () { b.textContent = 'Copy inquiry'; }, 2200);
      });
    });
    box.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    slot.innerHTML = '';
    statusEl.textContent = '';

    var firstBad = null;
    Object.keys(rules).forEach(function (key) {
      if (!validate(key) && !firstBad) firstBad = document.getElementById(ids[key]);
    });
    if (firstBad) { statusEl.textContent = 'Please fix the highlighted fields.'; firstBad.focus(); return; }

    var body = buildInquiry();

    if (!CFG.formEndpoint) {
      showEmailFallback(body, 'Nothing has been sent yet. Copy this inquiry or open it in your email app.', false);
      return;
    }

    submitBtn.disabled = true;
    statusEl.textContent = 'Sending…';
    fetch(CFG.formEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        name: val('f-name'), company: val('f-company'), email: val('f-email'), type: val('f-type'),
        robot: val('f-robot'), contact: val('f-contact'), description: val('f-desc')
      })
    })
      .then(function (r) { if (!r.ok) throw new Error('status ' + r.status); })
      .then(function () {
        submitBtn.disabled = false;
        statusEl.textContent = '';
        slot.innerHTML = '<div class="result"><h3>Inquiry received</h3><p>Thank you. Gyro Labs will review the details and reply to the email address you provided.</p></div>';
        form.reset();
      })
      .catch(function () {
        submitBtn.disabled = false;
        statusEl.textContent = '';
        showEmailFallback(body, 'The inquiry could not be sent from this page. You can still email it below.', true);
      });
  });
})();
