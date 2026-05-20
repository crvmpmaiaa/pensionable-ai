/* ============================================================
   Maiaa AI Assistant — SEO / AEO / Ad Copy tools
   Get a free key: console.cloud.google.com → enable PageSpeed Insights API
   Restrict it to your domain for safety, then paste it below.
   ============================================================ */
var PAGESPEED_KEY = 'AIzaSyBlE6HwnRwq-FYbv49tllijFlRWhHyZVh4'; // paste your free Google API key here

(function () {
  'use strict';

  /* ---- DOM ---- */
  const trigger = document.getElementById('chatbotTrigger');
  const panel   = document.getElementById('chatbotPanel');
  const msgs    = document.getElementById('cbMessages');
  const input   = document.getElementById('cbInput');
  const sendBtn = document.getElementById('cbSend');
  if (!trigger || !panel) return;

  /* ---- Prevent Lenis hijacking scroll inside the panel ---- */
  ['wheel', 'touchstart', 'touchmove'].forEach(evt => {
    msgs.addEventListener(evt, e => e.stopPropagation(), { passive: true });
  });

  /* ---- State ---- */
  let isOpen    = false;
  let awaitMode = null; // 'seo-url' | 'aeo-url' | 'ad-copy'

  /* ---- Toggle ---- */
  trigger.addEventListener('click', () => {
    isOpen = !isOpen;
    panel.classList.toggle('is-open', isOpen);
    trigger.classList.toggle('is-open', isOpen);
    if (isOpen && msgs.children.length === 0) greet();
  });

  /* ---- Helpers ---- */
  function scrollBottom() {
    msgs.scrollTop = msgs.scrollHeight;
  }

  function botBubble(html, extraClass = '') {
    const wrap = document.createElement('div');
    wrap.className = 'cb-msg bot' + (extraClass ? ' ' + extraClass : '');
    wrap.innerHTML = `<div class="cb-bubble">${html}</div>`;
    msgs.appendChild(wrap);
    scrollBottom();
    return wrap;
  }

  function userBubble(text) {
    const wrap = document.createElement('div');
    wrap.className = 'cb-msg user';
    wrap.innerHTML = `<div class="cb-bubble">${escHtml(text)}</div>`;
    msgs.appendChild(wrap);
    scrollBottom();
  }

  function typing() {
    const wrap = document.createElement('div');
    wrap.className = 'cb-msg bot cb-typing';
    wrap.innerHTML = '<div class="cb-bubble"><span class="cb-dot"></span><span class="cb-dot"></span><span class="cb-dot"></span></div>';
    msgs.appendChild(wrap);
    scrollBottom();
    return wrap;
  }

  function chips(labels, onClick) {
    const wrap = document.createElement('div');
    wrap.className = 'cb-chips';
    labels.forEach(label => {
      const btn = document.createElement('button');
      btn.className = 'cb-chip';
      btn.textContent = label;
      btn.addEventListener('click', () => onClick(label, btn));
      wrap.appendChild(btn);
    });
    return wrap;
  }

  function escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function scoreColor(pct) {
    if (pct >= 75) return 'score-great';
    if (pct >= 50) return 'score-ok';
    return 'score-poor';
  }

  function barColor(pct) {
    if (pct >= 75) return '#16a34a';
    if (pct >= 50) return '#d97706';
    return '#dc2626';
  }

  function scoreEmoji(pct) {
    if (pct >= 85) return '🟢';
    if (pct >= 60) return '🟡';
    return '🔴';
  }

  /* ---- Greet ---- */
  function greet() {
    botBubble(`👋 Hey! I'm Maiaa's AI marketing assistant.<br><br>
      I can run <strong>three free audits</strong> for you — pick one to get started:`);

    setTimeout(() => {
      const wrap = botBubble('');
      const bubble = wrap.querySelector('.cb-bubble');
      bubble.appendChild(chips(
        ['🔍 SEO Audit', '🤖 AEO Audit', '📝 Ad Copy Grader'],
        handleChip
      ));
      scrollBottom();
    }, 300);
  }

  function handleChip(label) {
    userBubble(label);
    if (label.includes('SEO'))      startTool('seo');
    else if (label.includes('AEO')) startTool('aeo');
    else                             startTool('ad');
  }

  function startTool(tool) {
    const t = typing();
    setTimeout(() => {
      t.remove();
      if (tool === 'seo') {
        awaitMode = 'seo-url';
        botBubble(`Great! Paste the full URL you'd like to audit (e.g. <em>https://yoursite.com</em>) and I'll check it for SEO health right away.`);
      } else if (tool === 'aeo') {
        awaitMode = 'aeo-url';
        botBubble(`On it. AEO (Answer Engine Optimisation) checks how well a page is understood by AI search tools like ChatGPT and Perplexity.<br><br>Paste the URL you want to audit:`);
      } else {
        awaitMode = 'ad-copy';
        botBubble(`Paste your ad headline or full ad copy below and I'll grade it on hook strength, clarity, CTA and emotional pull.`);
      }
      input.focus();
    }, 700);
  }

  /* ---- Send ---- */
  function send() {
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    input.style.height = '';
    userBubble(text);

    if (!awaitMode) {
      // Intent detection
      const lower = text.toLowerCase();
      if (lower.includes('seo'))       startTool('seo');
      else if (lower.includes('aeo') || lower.includes('ai') || lower.includes('answer engine')) startTool('aeo');
      else if (lower.includes('ad') || lower.includes('copy') || lower.includes('headline'))    startTool('ad');
      else {
        botBubble(`I can help with three things — pick one:`);
        setTimeout(() => {
          const wrap = botBubble('');
          wrap.querySelector('.cb-bubble').appendChild(chips(
            ['🔍 SEO Audit', '🤖 AEO Audit', '📝 Ad Copy Grader'],
            handleChip
          ));
          scrollBottom();
        }, 300);
      }
      return;
    }

    if (awaitMode === 'seo-url' || awaitMode === 'aeo-url') {
      const url = extractUrl(text);
      if (!url) {
        botBubble(`Hmm, that doesn't look like a valid URL. Try something like <em>https://example.com</em>`);
        return;
      }
      const mode = awaitMode;
      awaitMode = null;
      const t = typing();
      runPageSpeed(url).then(data => {
        t.remove();
        if (mode === 'seo-url') renderSEO(data, url);
        else                    renderAEO(data, url);
      }).catch(err => {
        t.remove();
        if (err.message === 'rate_limit') {
          botBubble(`⏱️ Google's API rate limit hit — this happens without an API key.<br><br>The chatbot works great on the live site once a free key is added. For now, try the <strong>Ad Copy Grader</strong> — that one needs no API!`);
        } else {
          botBubble(`❌ Couldn't reach that URL — make sure it's publicly accessible and try again.`);
        }
        anotherAudit();
      });
    } else if (awaitMode === 'ad-copy') {
      awaitMode = null;
      const t = typing();
      setTimeout(() => { t.remove(); renderAdCopy(text); }, 900);
    }
  }

  sendBtn.addEventListener('click', send);
  input.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  });
  input.addEventListener('input', () => {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 96) + 'px';
  });

  /* ---- URL utils ---- */
  function extractUrl(text) {
    const match = text.match(/https?:\/\/[^\s]+/i);
    if (match) return match[0].replace(/[.,;!?]$/, '');
    const bare = text.trim();
    if (/^[\w-]+\.[a-z]{2,}/.test(bare)) return 'https://' + bare;
    return null;
  }

  /* ---- PageSpeed API ---- */
  function runPageSpeed(url) {
    const base = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';
    const cats = 'category=performance&category=seo&category=accessibility&category=best-practices';
    const key  = window.PAGESPEED_KEY ? `&key=${window.PAGESPEED_KEY}` : '';
    const apiUrl = `${base}?url=${encodeURIComponent(url)}&strategy=mobile&${cats}${key}`;
    return fetch(apiUrl).then(r => {
      if (r.status === 429) throw new Error('rate_limit');
      if (!r.ok) throw new Error(`API returned ${r.status}`);
      return r.json();
    });
  }

  function pct(score) { return Math.round((score || 0) * 100); }

  /* ---- SEO Result ---- */
  function renderSEO(data, url) {
    const lh     = data.lighthouseResult;
    const cats   = lh.categories;
    const audits = lh.audits;

    const seoScore  = pct(cats.seo?.score);
    const perfScore = pct(cats.performance?.score);
    const a11y      = pct(cats.accessibility?.score);

    const metaOk    = audits['meta-description']?.score === 1;
    const titleOk   = audits['document-title']?.score === 1;
    const canonical = audits['canonical']?.score !== 0;
    const robotsOk  = audits['robots-txt']?.score !== 0;
    const fontOk    = audits['font-size']?.score === 1;
    const tapOk     = audits['tap-targets']?.score !== 0;

    const rows = [
      { label: 'SEO Score',      val: `${seoScore}/100`,  bar: seoScore },
      { label: 'Performance',    val: `${perfScore}/100`, bar: perfScore },
      { label: 'Accessibility',  val: `${a11y}/100`,      bar: a11y },
      { label: 'Meta Description', val: metaOk ? '✅ Present' : '❌ Missing' },
      { label: 'Title Tag',      val: titleOk   ? '✅ Good'   : '❌ Needs work' },
      { label: 'Canonical URL',  val: canonical ? '✅ Set'    : '⚠️ Not found' },
      { label: 'Robots.txt',     val: robotsOk  ? '✅ Valid'  : '⚠️ Check file' },
      { label: 'Mobile Font Size', val: fontOk  ? '✅ Readable' : '⚠️ Too small' },
    ];

    const card = buildResultCard('🔍 SEO Audit', new URL(url).hostname, seoScore, rows);
    const wrap = botBubble('');
    wrap.querySelector('.cb-bubble').appendChild(card);

    const tips = [];
    if (!metaOk)   tips.push('Write a compelling meta description (150–160 chars)');
    if (!titleOk)  tips.push('Add or improve your page title tag');
    if (perfScore < 70) tips.push('Page speed is affecting your ranking — optimise images and reduce JS');
    if (a11y < 80) tips.push('Fix accessibility issues — Google uses these as ranking signals');

    if (tips.length) {
      setTimeout(() => {
        botBubble(`<strong>Top fixes:</strong><br>${tips.map(t => `• ${t}`).join('<br>')}`);
        anotherAudit();
      }, 400);
    } else {
      setTimeout(() => { botBubble(`Solid results! This page is well-optimised. 🎉`); anotherAudit(); }, 400);
    }
    scrollBottom();
  }

  /* ---- AEO Result ---- */
  function renderAEO(data, url) {
    const lh     = data.lighthouseResult;
    const audits = lh.audits;
    const cats   = lh.categories;

    const perfScore  = pct(cats.performance?.score);
    const hasSD      = audits['structured-data']?.score === 1 ||
                       (audits['structured-data']?.details?.items?.length > 0);
    const metaOk     = audits['meta-description']?.score === 1;
    const titleOk    = audits['document-title']?.score === 1;
    const langOk     = audits['html-has-lang']?.score === 1;

    // Heuristic AEO score — strict baseline
    let aeoScore = 15;
    if (hasSD)           aeoScore += 25;
    if (metaOk)          aeoScore += 20;
    if (titleOk)         aeoScore += 15;
    if (langOk)          aeoScore += 10;
    if (perfScore >= 80) aeoScore += 15;
    else if (perfScore >= 60) aeoScore += 7;
    aeoScore = Math.min(aeoScore, 100);

    const rows = [
      { label: 'AEO Score (estimated)', val: `${aeoScore}/100`, bar: aeoScore },
      { label: 'Page Speed',     val: `${perfScore}/100`,        bar: perfScore },
      { label: 'Structured Data', val: hasSD  ? '✅ Detected' : '❌ None found' },
      { label: 'Meta Description', val: metaOk ? '✅ Present' : '❌ Missing — AI tools use this' },
      { label: 'Clear Page Title', val: titleOk ? '✅ Good'   : '❌ Needs work' },
      { label: 'Language Declared', val: langOk ? '✅ Set'    : '⚠️ Add lang attribute' },
    ];

    const card = buildResultCard('🤖 AEO Audit', new URL(url).hostname, aeoScore, rows);
    const wrap = botBubble('');
    wrap.querySelector('.cb-bubble').appendChild(card);

    const tips = [];
    if (!hasSD)   tips.push('Add Schema.org structured data (FAQ, Article, or Organization schema)');
    if (!metaOk)  tips.push('Write a clear, factual meta description — AI engines surface these directly');
    if (perfScore < 70) tips.push('Improve page speed — slow pages are crawled less frequently by AI bots');
    tips.push('Use clear headings (H1→H2→H3) with entity-rich language AI can extract');

    setTimeout(() => {
      botBubble(`<strong>AEO tips:</strong><br>${tips.map(t => `• ${t}`).join('<br>')}`);
      anotherAudit();
    }, 400);
    scrollBottom();
  }

  /* ---- Ad Copy Grader ---- */
  function renderAdCopy(copy) {
    const words     = copy.trim().split(/\s+/);
    const chars     = copy.length;
    const sentences = copy.split(/[.!?]+/).filter(Boolean);

    // Scoring
    const powerWords = ['free','proven','guaranteed','exclusive','instant','secret','boost','results',
      'limited','save','earn','grow','win','stop','imagine','discover','unlock','now','today','fast'];
    const ctaWords   = ['click','learn more','get started','book','call','try','buy','shop','sign up',
      'start','grab','download','join','schedule','contact'];

    const foundPower = powerWords.filter(w => copy.toLowerCase().includes(w));
    const foundCta   = ctaWords.filter(w => copy.toLowerCase().includes(w));
    const hasNumbers = /\d/.test(copy);
    const hasQuestion= /\?/.test(copy);
    const wordCount  = words.length;

    // Char warnings
    const metaOk    = chars <= 160;
    const headlineOk = wordCount <= 12;
    const avgWordLen = words.reduce((a,w) => a + w.length, 0) / words.length;
    const clarity   = avgWordLen <= 5.5;

    let score = 10;
    if (foundCta.length >= 1)    score += 25;
    if (foundPower.length >= 1)  score += 15;
    if (foundPower.length >= 3)  score += 10;
    if (hasNumbers)              score += 15;
    if (hasQuestion)             score += 10;
    if (clarity)                 score += 15;
    if (wordCount > 20)          score -= 10; // penalise waffle
    score = Math.min(Math.max(score, 0), 100);

    const rows = [
      { label: 'Overall Score',    val: `${score}/100`,                         bar: score },
      { label: 'Power Words',      val: foundPower.length ? `✅ ${foundPower.slice(0,3).join(', ')}` : '❌ None detected' },
      { label: 'Call to Action',   val: foundCta.length   ? `✅ "${foundCta[0]}"` : '❌ No CTA found' },
      { label: 'Uses Numbers',     val: hasNumbers ? '✅ Yes — great for credibility' : '⚠️ Consider adding stats' },
      { label: 'Asks a Question',  val: hasQuestion ? '✅ Engages curiosity' : '— Not used' },
      { label: 'Word Clarity',     val: clarity ? '✅ Plain language' : '⚠️ Simplify your wording' },
      { label: 'Length',           val: `${chars} chars / ${wordCount} words` },
    ];

    const card = buildResultCard('📝 Ad Copy Grader', `${wordCount} words`, score, rows);
    const wrap = botBubble('');
    wrap.querySelector('.cb-bubble').appendChild(card);

    const tips = [];
    if (!foundCta.length)  tips.push(`Add a clear CTA — "Book a free call", "Get started today", etc.`);
    if (!foundPower.length) tips.push('Use a power word to trigger emotion — "proven", "fast", "free", "results"');
    if (!hasNumbers)        tips.push('Add a specific number — "3x more leads" beats "more leads"');
    if (!clarity)           tips.push('Simplify your language — shorter words convert better');

    setTimeout(() => {
      botBubble(tips.length
        ? `<strong>Ways to punch it up:</strong><br>${tips.map(t => `• ${t}`).join('<br>')}`
        : `Strong copy! Clean, punchy and action-oriented. 🔥`
      );
      anotherAudit();
    }, 400);
    scrollBottom();
  }

  /* ---- Shared card builder ---- */
  function buildResultCard(title, subtitle, totalScore, rows) {
    const card = document.createElement('div');
    card.className = 'cb-result';

    const hdr = document.createElement('div');
    hdr.className = 'cb-result-header';
    hdr.style.background = totalScore >= 75 ? '#f0fdf4' : totalScore >= 50 ? '#fffbeb' : '#fef2f2';
    hdr.innerHTML = `<span>${title}</span><small style="color:#9ca3af;font-weight:500">${subtitle}</small>
      <span class="cb-score-badge ${scoreColor(totalScore)}">${scoreEmoji(totalScore)} ${totalScore}</span>`;
    card.appendChild(hdr);

    const rowsWrap = document.createElement('div');
    rowsWrap.className = 'cb-result-rows';

    rows.forEach((r, i) => {
      if (i > 0) {
        const div = document.createElement('div');
        div.className = 'cb-divider';
        rowsWrap.appendChild(div);
      }
      const row = document.createElement('div');
      row.className = 'cb-result-row';
      row.innerHTML = `<span class="cb-result-row-label">${r.label}</span>
        <span class="cb-result-row-val">${r.val}</span>`;
      if (r.bar !== undefined) {
        const barWrap = document.createElement('div');
        barWrap.className = 'cb-bar-wrap';
        const bar = document.createElement('div');
        bar.className = 'cb-bar';
        bar.style.background = barColor(r.bar);
        bar.style.width = '0%';
        barWrap.appendChild(bar);
        row.appendChild(barWrap);
        setTimeout(() => { bar.style.width = r.bar + '%'; }, 100 + i * 60);
      }
      rowsWrap.appendChild(row);
    });

    card.appendChild(rowsWrap);
    return card;
  }

  /* ---- Offer another audit ---- */
  function anotherAudit() {
    setTimeout(() => {
      const wrap = botBubble('Want to run another audit?');
      wrap.querySelector('.cb-bubble').appendChild(
        chips(['🔍 SEO Audit', '🤖 AEO Audit', '📝 Ad Copy Grader'], handleChip)
      );
      scrollBottom();
    }, 600);
  }

})();
