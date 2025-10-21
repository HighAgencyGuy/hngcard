(function () {
    const form = document.getElementById('contact-form');
    const nameEl = document.getElementById('contact-name');
    const emailEl = document.getElementById('contact-email');
    const subjEl = document.getElementById('contact-subject');
    const msgEl = document.getElementById('contact-message');

    const errName = document.getElementById('test-contact-error-name');
    const errEmail = document.getElementById('test-contact-error-email');
    const errSubj = document.getElementById('test-contact-error-subject');
    const errMsg = document.getElementById('test-contact-error-message');
    const success = document.getElementById('contact-success');

    function showError(input, node, text) {
      input.setAttribute('aria-invalid', 'true');
      node.textContent = text;
      node.hidden = false;
    }
    function clearError(input, node) {
      input.setAttribute('aria-invalid', 'false');
      node.textContent = '';
      node.hidden = true;
    }
    function validEmail(v) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
    }

    function checkName(){ const v=nameEl.value.trim(); if(!v){showError(nameEl,errName,'Enter your full name.'); return false;} clearError(nameEl,errName); return true; }
    function checkEmail(){ const v=emailEl.value.trim(); if(!v){showError(emailEl,errEmail,'Enter your email.'); return false;} if(!validEmail(v)){showError(emailEl,errEmail,'Use a valid email (name@example.com).'); return false;} clearError(emailEl,errEmail); return true; }
    function checkSubject(){ const v=subjEl.value.trim(); if(!v){showError(subjEl,errSubj,'Enter a subject.'); return false;} clearError(subjEl,errSubj); return true; }
    function checkMessage(){ const v=msgEl.value.trim(); if(!v){showError(msgEl,errMsg,'Enter a message.'); return false;} if(v.length<10){showError(msgEl,errMsg,'Message must be at least 10 characters.'); return false;} clearError(msgEl,errMsg); return true; }

    [nameEl, emailEl, subjEl, msgEl].forEach((el) => {
      el.addEventListener('blur', () => {
        if (el === nameEl) checkName();
        if (el === emailEl) checkEmail();
        if (el === subjEl) checkSubject();
        if (el === msgEl) checkMessage();
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const ok = checkName() & checkEmail() & checkSubject() & checkMessage();
      if (ok) {
        success.hidden = false;
        form.reset();
        [nameEl, emailEl, subjEl, msgEl].forEach(el => el.setAttribute('aria-invalid','false'));
        [errName, errEmail, errSubj, errMsg].forEach(n => { n.textContent=''; n.hidden=true; });
      } else {
        success.hidden = true;
        const first = [nameEl,emailEl,subjEl,msgEl].find(el => el.getAttribute('aria-invalid')==='true');
        if (first) first.focus();
      }
    });
  }());