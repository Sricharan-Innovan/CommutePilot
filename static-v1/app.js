/* =========================================================
   CommutePilot — landing page interactions
   ========================================================= */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------------- year ---------------- */
  var yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();

  /* ---------------- nav state ---------------- */
  var nav = $('#nav');
  var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 24); };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------------- scroll reveal ---------------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  $$('.reveal').forEach(function (el) { io.observe(el); });

  /* ---------------- count up ---------------- */
  $$('[data-count]').forEach(function (el) {
    var target = parseInt(el.getAttribute('data-count'), 10);
    var seen = false;
    var ob = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting || seen) return;
        seen = true; ob.disconnect();
        if (reduced) { el.textContent = target; return; }
        var t0 = performance.now(), dur = 1100;
        (function tick(now) {
          var p = Math.min(1, (now - t0) / dur);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased);
          if (p < 1) requestAnimationFrame(tick);
        })(t0);
      });
    }, { threshold: 0.4 });
    ob.observe(el);
  });

  /* ---------------- lock screen clock ---------------- */
  (function () {
    var day = $('#lockDay');
    if (!day) return;
    var d = new Date();
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    day.textContent = days[d.getDay()] + ' ' + d.getDate() + ' ' + months[d.getMonth()];
  })();

  /* ---------------- hero: chat timeline + route rail ---------------- */
  (function heroDemo() {
    var chat = $('#chat');
    var rail = $('#railList');
    var alertCard = $('#floatAlert');
    if (!chat || !rail) return;

    var rows = $$('li', rail);
    var timers = [];
    var started = false;

    var script = [
      { t: 300,  type: 'bot',  html: 'Good morning. <b>Dilsukhnagar &rarr; HITEC City</b> today?<span class="tiny">8:15 am &middot; usual run, 48 min</span>', rail: -1 },
      { t: 1100, type: 'btns' },
      { t: 2000, type: 'me',   html: 'Start journey' },
      { t: 2700, type: 'bot',  html: 'Tracking on. Lock your phone &mdash; I have it from here.', rail: 0 },
      { t: 3900, rail: 1 },
      { t: 4700, rail: 2 },
      { t: 5400, rail: 3 },
      { t: 6100, rail: 4 },
      { t: 6700, type: 'alert', html: '<span class="tag"><i></i>1 stop before</span>Approaching <b>Punjagutta</b>. Next stop <b>Ameerpet</b> &mdash; change to the Blue Line.', rail: 5, float: true },
      { t: 8400, type: 'bot', html: 'Leg 2 of 2. Platform for <b>Raidurg</b>. Tracking towards <b>HITEC City</b>.', rail: 6, float: false },
      { t: 9600, rail: 7 },
      { t: 10400, type: 'alert', html: '<span class="tag"><i></i>1 stop before</span>Approaching <b>Durgam Cheruvu</b>. <b>Your stop is next.</b>', rail: 8 },
      { t: 12000, type: 'arrive', html: 'Arrived at <b>HITEC City</b>. Have a good day &mdash; see you at 6:45 pm.', rail: 9 }
    ];

    function add(type, html) {
      var el = document.createElement('div');
      if (type === 'btns') {
        el.className = 'msg';
        el.innerHTML = '<div class="msg-btns"><span class="hot">Start journey</span><span>WFH</span><span>On leave</span><span>Snooze 30</span></div>';
      } else {
        el.className = 'msg' + (type === 'me' ? ' me' : type === 'alert' ? ' alert' : type === 'arrive' ? ' arrive' : '');
        el.innerHTML = html;
      }
      chat.appendChild(el);
      while (chat.children.length > 5) chat.removeChild(chat.firstChild);
    }

    function setRail(i) {
      rows.forEach(function (r, n) {
        r.classList.toggle('is-on', n === i);
        r.classList.toggle('done', n < i);
      });
    }

    function run() {
      timers.forEach(clearTimeout);
      timers = [];
      chat.innerHTML = '';
      setRail(-1);
      if (alertCard) alertCard.classList.remove('show');

      script.forEach(function (s) {
        timers.push(setTimeout(function () {
          if (s.type) add(s.type, s.html);
          if (typeof s.rail === 'number') setRail(s.rail);
          if (s.float === true && alertCard) alertCard.classList.add('show');
          if (s.float === false && alertCard) alertCard.classList.remove('show');
          if (s.type === 'alert' && s.rail === 8 && alertCard) {
            alertCard.querySelector('.fa-main').innerHTML = 'Approaching <b>Durgam Cheruvu</b>';
            alertCard.querySelector('.fa-sub').innerHTML = 'Next stop: <b>HITEC City</b> &middot; your exit';
            alertCard.classList.add('show');
          }
        }, s.t));
      });
      timers.push(setTimeout(function () {
        if (alertCard) {
          alertCard.classList.remove('show');
          alertCard.querySelector('.fa-main').innerHTML = 'Approaching <b>Punjagutta</b>';
          alertCard.querySelector('.fa-sub').innerHTML = 'Next stop: <b>Ameerpet</b> &middot; change to Blue Line';
        }
        run();
      }, 15500));
    }

    if (reduced) {
      add('bot', 'Good morning. <b>Dilsukhnagar &rarr; HITEC City</b> today?');
      add('me', 'Start journey');
      add('alert', '<span class="tag"><i></i>1 stop before</span>Approaching <b>Punjagutta</b>. Next stop <b>Ameerpet</b>.');
      add('arrive', 'Arrived at <b>HITEC City</b>.');
      setRail(5);
      if (alertCard) alertCard.classList.add('show');
      return;
    }

    var ob = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !started) { started = true; run(); }
        if (!e.isIntersecting && started) { started = false; timers.forEach(clearTimeout); }
      });
    }, { threshold: 0.2 });
    ob.observe($('#phone'));
  })();

  /* ---------------- lock screen notification buttons ---------------- */
  (function notifDemo() {
    var wrap = $('#notifActions');
    var out = $('#notifResult');
    if (!wrap) return;

    var copy = {
      start: '<b>Tracking on.</b> Alerts set for Punjagutta and Durgam Cheruvu. You can lock the phone now.',
      wfh: '<b>Working from home.</b> Today is quiet &mdash; no evening prompt either.',
      leave: '<b>On leave.</b> Tracking paused for the day. Back tomorrow at 8:15.',
      snooze: '<b>Snoozed 30 minutes.</b> I will ask again at 8:45 am.'
    };

    wrap.addEventListener('click', function (e) {
      var b = e.target.closest('.na');
      if (!b) return;
      $$('.na', wrap).forEach(function (n) { n.classList.remove('is-on'); });
      if (b.dataset.act !== 'start') b.classList.add('is-on');
      out.innerHTML = copy[b.dataset.act];
      out.style.animation = 'none';
      void out.offsetWidth;
      out.style.animation = 'pop .4s cubic-bezier(.2,.7,.2,1)';
    });
  })();

  /* ---------------- line demo ---------------- */
  (function lineDemo() {
    var track = $('#ldTrack');
    if (!track) return;

    var stopsEl = $('#ldStops'), fill = $('#ldFill'), train = $('#ldTrain');
    var sayBox = $('#ldSay'), sayText = $('#ldSayText'), etaEl = $('#ldEta'), nextEl = $('#ldNext');

    var LINES = {
      red: {
        stops: ['Malakpet', 'MGBS', 'Nampally', 'Lakdikapul', 'Khairatabad', 'Punjagutta', 'Ameerpet'],
        target: 6, note: 'change to the Blue Line towards Raidurg'
      },
      blue: {
        stops: ['Ameerpet', 'Yousufguda', 'Jubilee Hills', 'Madhapur', 'Durgam Cheruvu', 'HITEC City'],
        target: 5, note: 'this is your stop'
      },
      green: {
        stops: ['Parade Ground', 'Gandhi Hospital', 'Musheerabad', 'RTC X Roads', 'Chikkadpally', 'Narayanguda', 'MGBS'],
        target: 6, note: 'this is your stop'
      }
    };

    var key = 'red', timer = null, idx = 0, live = false;

    function build() {
      var cfg = LINES[key];
      track.setAttribute('data-line', key);
      stopsEl.innerHTML = '';
      cfg.stops.forEach(function (name, i) {
        var li = document.createElement('li');
        li.style.left = (i / (cfg.stops.length - 1)) * 100 + '%';
        li.innerHTML = '<span class="d"></span><span class="lbl">' + name + '</span>';
        stopsEl.appendChild(li);
      });
      idx = 0;
      paint();
    }

    function paint() {
      var cfg = LINES[key];
      var last = cfg.stops.length - 1;
      var pct = (idx / last) * 100;
      fill.style.width = pct + '%';
      train.style.left = pct + '%';

      $$('li', stopsEl).forEach(function (li, i) {
        li.classList.toggle('passed', i < idx);
        li.classList.toggle('cur', i === idx);
        li.classList.toggle('pre', i === cfg.target - 1);
        li.classList.toggle('target', i === cfg.target);
      });

      var left = cfg.target - idx;
      etaEl.textContent = left <= 0 ? 'here' : (left * 2) + ' min';
      nextEl.textContent = idx >= last ? '—' : cfg.stops[idx + 1];

      if (idx === cfg.target - 1) {
        sayBox.classList.add('hot');
        sayText.innerHTML = '&ldquo;Approaching ' + cfg.stops[idx] + '. <b>' + cfg.stops[cfg.target] + '</b> is next &mdash; ' + cfg.note + '.&rdquo;';
      } else if (idx === cfg.target) {
        sayBox.classList.remove('hot');
        sayText.innerHTML = '&ldquo;' + cfg.stops[cfg.target] + '. You are off the train.&rdquo;';
      } else {
        sayBox.classList.remove('hot');
        sayText.innerHTML = idx === 0 ? 'Tracking from ' + cfg.stops[0] + '. Nothing to do until your alert.' : 'Quiet. ' + (cfg.target - idx) + ' stops to go.';
      }
    }

    function play() {
      stop();
      idx = 0; paint();
      if (reduced) { idx = LINES[key].target - 1; paint(); return; }
      timer = setInterval(function () {
        if (idx >= LINES[key].target) { stop(); setTimeout(function () { if (live) play(); }, 2600); return; }
        idx++; paint();
      }, 1500);
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    $$('.ld-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        $$('.ld-tab').forEach(function (t) { t.classList.remove('is-on'); t.setAttribute('aria-selected', 'false'); });
        tab.classList.add('is-on'); tab.setAttribute('aria-selected', 'true');
        key = tab.dataset.line;
        build(); play();
      });
    });
    var replay = $('#ldReplay');
    if (replay) replay.addEventListener('click', play);

    build();
    var ob = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        live = e.isIntersecting;
        if (live) play(); else stop();
      });
    }, { threshold: 0.25 });
    ob.observe(track);
  })();

  /* ---------------- steps ---------------- */
  (function steps() {
    var btns = $$('.step');
    if (!btns.length) return;
    var auto = null;

    function show(n) {
      btns.forEach(function (b) { b.classList.toggle('is-on', b.dataset.step === String(n)); });
      $$('.sv').forEach(function (v) {
        var on = v.dataset.view === String(n);
        v.classList.toggle('is-on', on);
        if (on) { // restart the message animation
          $$('.b', v).forEach(function (b) { b.style.animation = 'none'; void b.offsetWidth; b.style.animation = ''; });
        }
      });
    }

    btns.forEach(function (b) {
      b.addEventListener('click', function () { show(b.dataset.step); clearInterval(auto); auto = null; });
    });

    if (reduced) return;
    var n = 1;
    var ob = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting && !auto) {
          auto = setInterval(function () { n = n % 3 + 1; show(n); }, 5200);
        } else if (!e.isIntersecting && auto) { clearInterval(auto); auto = null; }
      });
    }, { threshold: 0.3 });
    ob.observe($('.steps-grid'));
  })();

  /* ---------------- marquee: duplicate + speed ---------------- */
  $$('.mq-row').forEach(function (row) {
    var tr = $('.mq-track', row);
    // the second copy exists only to make the loop seamless — hide it from screen readers
    Array.prototype.slice.call(tr.children).forEach(function (card) {
      var copy = card.cloneNode(true);
      copy.setAttribute('aria-hidden', 'true');
      tr.appendChild(copy);
    });
    tr.style.setProperty('--sp', (row.dataset.speed || 46) + 's');
  });

  /* ---------------- faq: one open at a time ---------------- */
  $$('.faq details').forEach(function (d) {
    d.addEventListener('toggle', function () {
      if (!d.open) return;
      $$('.faq details').forEach(function (o) { if (o !== d) o.open = false; });
    });
  });
})();
