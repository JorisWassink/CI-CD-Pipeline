// ── CONSTANTS ──────────────────────────────────────────────────────────────
const INT_MAX = 3999;

const VALS = [
  [1000000000, 'M̄'],
  [900000000,  'C̄M̄'],
  [500000000,  'D̄'],
  [400000000,  'C̄D̄'],
  [100000000,  'C̄'],
  [90000000,   'X̄C̄'],
  [50000000,   'L̄'],
  [40000000,   'X̄L̄'],
  [10000000,   'X̄'],
  [9000000,    'MX̄'],
  [5000000,    'V̄'],
  [4000000,    'MV̄'],
  [1000000,    'M̄̄'],  // vinculm over M = 1,000,000
  // Standard
  [1000, 'M'],
  [900,  'CM'],
  [500,  'D'],
  [400,  'CD'],
  [100,  'C'],
  [90,   'XC'],
  [50,   'L'],
  [40,   'XL'],
  [10,   'X'],
  [9,    'IX'],
  [5,    'V'],
  [4,    'IV'],
  [1,    'I'],
];

// For large numbers, use parenthesis notation which is more displayable
const VALS_DISPLAY = [
  [1000000000, '(M)'],
  [900000000,  '(CM)'],
  [500000000,  '(D)'],
  [400000000,  '(CD)'],
  [100000000,  '(C)'],
  [90000000,   '(XC)'],
  [50000000,   '(L)'],
  [40000000,   '(XL)'],
  [10000000,   '(X)'],
  [9000000,    'M(X)'],
  [5000000,    '(V)'],
  [4000000,    'M(V)'],
  [1000000,    '(M)'],
  [1000, 'M'],
  [900,  'CM'],
  [500,  'D'],
  [400,  'CD'],
  [100,  'C'],
  [90,   'XC'],
  [50,   'L'],
  [40,   'XL'],
  [10,   'X'],
  [9,    'IX'],
  [5,    'V'],
  [4,    'IV'],
  [1,    'I'],
];

// ── STATE ──────────────────────────────────────────────────────────────────
let mode = 'int'; // 'int' | 'rom'
let lastResult = '';

// ── MODE ───────────────────────────────────────────────────────────────────
function setMode(m) {
  mode = m;
  const inp = document.getElementById('main-input');
  const lbl = document.getElementById('input-label');
  const hint = document.getElementById('hint-text');
  const btnInt = document.getElementById('btn-int');
  const btnRom = document.getElementById('btn-rom');

  inp.value = '';
  setResult('', true);
  clearError();

  if (m === 'int') {
    inp.type = 'number';
    inp.placeholder = 'e.g. 2147483647';
    inp.setAttribute('min', '1');
    lbl.textContent = 'Enter Integer';
    hint.textContent = 'Accepts 1 to 2,147,483,647';
    hint.className = 'hint';
    btnInt.classList.add('active');
    btnRom.classList.remove('active');
    btnInt.setAttribute('aria-selected', 'true');
    btnRom.setAttribute('aria-selected', 'false');
    document.getElementById('output-label').textContent = 'Roman Numeral';
  } else {
    inp.type = 'text';
    inp.placeholder = 'e.g. MMXXVI';
    inp.removeAttribute('min');
    lbl.textContent = 'Enter Roman Numeral';
    hint.textContent = 'Use standard notation: I V X L C D M';
    hint.className = 'hint';
    btnRom.classList.add('active');
    btnInt.classList.remove('active');
    btnRom.setAttribute('aria-selected', 'true');
    btnInt.setAttribute('aria-selected', 'false');
    document.getElementById('output-label').textContent = 'Integer Value';
  }
  inp.focus();
}

// ── INPUT HANDLER ──────────────────────────────────────────────────────────
function onInput() {
  clearError();
  const raw = document.getElementById('main-input').value.trim();
  if (!raw) { setResult('', true); return; }

  if (mode === 'int') {
    convertToRoman(raw);
  } else {
    convertToInt(raw);
  }
}

function suppressE(e) {
  if (mode === 'int' && ['e','E','+','-','.'].includes(e.key)) e.preventDefault();
}

// ── INT → ROMAN ────────────────────────────────────────────────────────────
function convertToRoman(raw, test = false) {
  const n = Math.floor(Number(raw));
  if (!Number.isFinite(n) || n < 1) {
    throw new Error('No valid roman equivalent.');
  }
  if (n > INT_MAX) {
    throw new Error('Input too large.');
  }

  let num = n;
  let result = '';
  for (const [val, sym] of VALS_DISPLAY) {
    while (num >= val) {
      result += sym;
      num -= val;
    }
  }

  if(!test)
    setResult(result);
  else
    return result;

}

// ── ROMAN → INT ────────────────────────────────────────────────────────────
// Supports standard Roman numerals I V X L C D M (case-insensitive)
const ROMAN_MAP = {
  I:1, V:5, X:10, L:50, C:100, D:500, M:1000
};

function convertToInt(raw, test = false) {
  if (typeof raw !== 'string')
    throw new Error('Input must be a valid Roman numeral.');

  const s = raw.toUpperCase().replace(/\s/g, '');

  if (!/^[IVXLCDM]+$/.test(s)) {
    throw new Error('Input must be a valid Roman numeral.');
  }

  if (/VV|LL|DD/.test(s)) {
    throw new Error('Input must be a valid Roman numeral.');
  }

  if (/IIII|XXXX|CCCC|MMMM/.test(s)) {
    throw new Error('Input must be a valid Roman numeral.');
  }

  const VALID_SUBTRACTIVE = new Set(['IV','IX','XL','XC','CD','CM']);
  for (let i = 0; i < s.length - 1; i++) {
    const curr = ROMAN_MAP[s[i]];
    const next = ROMAN_MAP[s[i + 1]];
    if (curr < next) {
      if (!VALID_SUBTRACTIVE.has(s[i] + s[i + 1])) {
        throw new Error('Input must be a valid Roman numeral.');
      }
    }
  }

  for (let i = 0; i < s.length - 2; i++) {
    const curr = ROMAN_MAP[s[i]];
    const next = ROMAN_MAP[s[i + 1]];
    if (curr < next) {
      const after = ROMAN_MAP[s[i + 2]];
      if (after && after >= curr) {
        throw new Error('Input must be a valid Roman numeral.');
      }
      i++;
    }
  }

  const values = [];
  for (let i = 0; i < s.length; i++) {
    const curr = ROMAN_MAP[s[i]];
    const next = ROMAN_MAP[s[i + 1]];
    if (next && curr < next) {
      values.push(next - curr);
      i++;
    } else {
      values.push(curr);
    }
  }

  for (let i = 0; i < values.length - 1; i++) {
    if (values[i] < values[i + 1]) {
      throw new Error('Input must be a valid Roman numeral.');
    }
  }

  const total = values.reduce((a, b) => a + b, 0);

  if (total < 1)
    throw new Error('Could not parse a valid numeral.');
  if (total > INT_MAX)
    throw new Error('Input too large.');

  if (!test)
    setResult(total.toLocaleString());
  else
    return total;
}

// ── DISPLAY ────────────────────────────────────────────────────────────────
function setResult(val, empty = false) {
  const el = document.getElementById('result-text');
  lastResult = val;

  if (empty || !val) {
    el.textContent = 'awaiting input…';
    el.className = 'result-value result-placeholder';
    return;
  }

  el.textContent = val;
  el.className = 'result-value updating';
  setTimeout(() => el.classList.remove('updating'), 400);
}

function showError(msg) {
  const hint = document.getElementById('hint-text');
  const inp = document.getElementById('main-input');
  hint.textContent = msg;
  hint.className = 'hint error-msg';
  inp.classList.add('error');
  setResult('', true);
}

function clearError() {
  const hint = document.getElementById('hint-text');
  const inp = document.getElementById('main-input');
  inp.classList.remove('error');
  hint.className = 'hint';
  hint.textContent = mode === 'int'
    ? 'Accepts 1 to 2,147,483,647'
    : 'Use standard notation: I V X L C D M';
}

// ── COPY ───────────────────────────────────────────────────────────────────
function copyResult() {
  if (!lastResult) return;
  navigator.clipboard.writeText(lastResult).then(() => {
    const btn = document.getElementById('copy-btn');
    btn.textContent = 'Copied!';
    btn.classList.add('copied');
    setTimeout(() => {
      btn.textContent = 'Copy';
      btn.classList.remove('copied');
    }, 1800);
  });
}

// ── REFERENCE TABLE ────────────────────────────────────────────────────────
const REF_PAIRS = [
  ['I','1'], ['IV','4'], ['V','5'], ['IX','9'],
  ['X','10'], ['XL','40'], ['L','50'], ['XC','90'],
  ['C','100'], ['CD','400'], ['D','500'], ['CM','900'],
  ['M','1,000'], ['(V)','5,000'], ['(X)','10,000'], ['(L)','50,000'],
  ['(C)','100,000'], ['(D)','500,000'], ['(M)','1,000,000'], ['(M̄)','10⁹'],
];

function buildReference() {
  const grid = document.getElementById('ref-grid');
  REF_PAIRS.forEach(([r, n]) => {
    const cell = document.createElement('div');
    cell.className = 'ref-cell';
    cell.innerHTML = `<span class="ref-roman">${r}</span><span class="ref-sep">=</span><span class="ref-num">${n}</span>`;
    // Click to fill input
    cell.style.cursor = 'pointer';
    cell.title = `Use ${r} / ${n}`;
    cell.addEventListener('click', () => {
      const inp = document.getElementById('main-input');
      if (mode === 'int') {
        const num = n.replace(/[^0-9]/g, '');
        if (num) { inp.value = num; onInput(); }
      } else {
        inp.value = r.replace(/[()]/g, '');
        onInput();
      }
      inp.focus();
    });
    grid.appendChild(cell);
  });
}

buildReference();
document.getElementById('main-input').focus();
