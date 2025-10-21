(function () {
    const timeEl = document.getElementById('time-ms');

    const tick = () => { timeEl.textContent = String(Date.now()); };
    tick();
    const timer = setInterval(tick, 1000);
    window.addEventListener('beforeunload', () => clearInterval(timer));


  }());