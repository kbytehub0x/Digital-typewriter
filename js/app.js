/* ============================================
   TYPE — Digital Typewriter
   Application Logic
   ============================================ */

'use strict';

// ── Storage Keys ──────────────────────────────
const KEY_BODY  = 'typewriter__body';
const KEY_TITLE = 'typewriter__title';
const KEY_DATE  = 'typewriter__date';

// ── DOM References ────────────────────────────
const writer      = document.getElementById('writer');
const docTitle    = document.getElementById('doc-title');
const paperDate   = document.getElementById('paper-date');

const charCount   = document.getElementById('char-count');
const wordCount   = document.getElementById('word-count');
const lineCount   = document.getElementById('line-count');
const readTime    = document.getElementById('read-time');

const saveBadge   = document.getElementById('save-badge');
const saveLabel   = document.getElementById('save-label');
const saveDot     = document.getElementById('save-dot');

const btnClear    = document.getElementById('btn-clear');
const btnDownload = document.getElementById('btn-download');

const modalOverlay = document.getElementById('modal-overlay');
const modalCancel  = document.getElementById('modal-cancel');
const modalConfirm = document.getElementById('modal-confirm');

// ── State ─────────────────────────────────────
let saveTimer   = null;
let isSaving    = false;

// ── Init ──────────────────────────────────────
(function init() {
  loadFromStorage();
  updateDate();
  updateStats();
  autoResizeTextarea();
})();

// ── LocalStorage: Load ────────────────────────
function loadFromStorage() {
  const savedBody  = localStorage.getItem(KEY_BODY);
  const savedTitle = localStorage.getItem(KEY_TITLE);
  const savedDate  = localStorage.getItem(KEY_DATE);

  if (savedBody  !== null) writer.value    = savedBody;
  if (savedTitle !== null) docTitle.value  = savedTitle;

  // Restore date string or generate new
  if (savedDate) {
    paperDate.textContent = savedDate;
  } else {
    const dateStr = formatDate(new Date());
    paperDate.textContent = dateStr;
    localStorage.setItem(KEY_DATE, dateStr);
  }

  // After restoring, resize textarea
  setTimeout(autoResizeTextarea, 0);
}

// ── LocalStorage: Save ────────────────────────
function scheduleSave() {
  // Show "saving…" state immediately
  setSavingState(true);

  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    localStorage.setItem(KEY_BODY,  writer.value);
    localStorage.setItem(KEY_TITLE, docTitle.value);
    setSavingState(false);
  }, 500); // debounce: 500ms after last keystroke
}

function setSavingState(saving) {
  isSaving = saving;
  if (saving) {
    saveBadge.classList.add('saving');
    saveLabel.textContent = 'Saving…';
  } else {
    saveBadge.classList.remove('saving');
    saveLabel.textContent = 'Saved';
  }
}

// ── Stats Counter ─────────────────────────────
function updateStats() {
  const text   = writer.value;
  const chars  = text.length;
  const words  = text.trim() === '' ? 0 : text.trim().split(/\s+/).filter(w => w.length > 0).length;
  const lines  = text === '' ? 0 : text.split('\n').length;
  const mins   = Math.max(1, Math.ceil(words / 200));

  charCount.textContent = chars.toLocaleString();
  wordCount.textContent = words.toLocaleString();
  lineCount.textContent = lines.toLocaleString();
  readTime.textContent  = words === 0 ? '0 min read' : `${mins} min read`;
}

// ── Auto-resize Textarea ──────────────────────
function autoResizeTextarea() {
  writer.style.height = 'auto';
  const minH = 520;
  writer.style.height = Math.max(minH, writer.scrollHeight) + 'px';
}

// ── Date Formatting ───────────────────────────
function formatDate(d) {
  const days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  const months = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];
  return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

function updateDate() {
  const savedDate = localStorage.getItem(KEY_DATE);
  if (!savedDate) {
    const dateStr = formatDate(new Date());
    paperDate.textContent = dateStr;
    localStorage.setItem(KEY_DATE, dateStr);
  }
}

// ── Event Listeners ───────────────────────────

// Writer input
writer.addEventListener('input', () => {
  updateStats();
  autoResizeTextarea();
  scheduleSave();
});

// Title input
docTitle.addEventListener('input', () => {
  scheduleSave();
  // Update page title
  document.title = (docTitle.value.trim() || 'Untitled') + ' — TYPE';
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
  // Cmd/Ctrl + S — force immediate save
  if ((e.metaKey || e.ctrlKey) && e.key === 's') {
    e.preventDefault();
    clearTimeout(saveTimer);
    localStorage.setItem(KEY_BODY,  writer.value);
    localStorage.setItem(KEY_TITLE, docTitle.value);
    setSavingState(false);
    // Flash confirmation
    flashSaved();
  }

  // Escape closes modal
  if (e.key === 'Escape') closeModal();
});

// Tab key → indent (insert 4 spaces in textarea)
writer.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    e.preventDefault();
    const start = writer.selectionStart;
    const end   = writer.selectionEnd;
    writer.value = writer.value.substring(0, start) + '    ' + writer.value.substring(end);
    writer.selectionStart = writer.selectionEnd = start + 4;
    updateStats();
    scheduleSave();
  }
});

// ── Flash "Saved!" ────────────────────────────
function flashSaved() {
  saveBadge.classList.remove('saving');
  saveLabel.textContent = '✓ Saved!';
  saveDot.style.background = '#26de81';
  setTimeout(() => {
    saveLabel.textContent = 'Saved';
  }, 1800);
}

// ── Clear Document ────────────────────────────
btnClear.addEventListener('click', openModal);

function openModal() {
  modalOverlay.hidden = false;
  modalConfirm.focus();
}

function closeModal() {
  modalOverlay.hidden = true;
  btnClear.focus();
}

modalCancel.addEventListener('click', closeModal);

modalOverlay.addEventListener('click', (e) => {
  if (e.target === modalOverlay) closeModal();
});

modalConfirm.addEventListener('click', () => {
  writer.value   = '';
  docTitle.value = '';
  updateStats();
  autoResizeTextarea();

  // Reset saved date to today
  const dateStr = formatDate(new Date());
  paperDate.textContent = dateStr;
  localStorage.setItem(KEY_DATE, dateStr);

  localStorage.setItem(KEY_BODY,  '');
  localStorage.setItem(KEY_TITLE, '');
  document.title = 'Untitled — TYPE';

  closeModal();
  setSavingState(false);
  flashSaved();
  writer.focus();
});

// ── Download as .txt ──────────────────────────
btnDownload.addEventListener('click', () => {
  const title   = docTitle.value.trim() || 'Untitled';
  const content = writer.value;

  if (!content.trim()) {
    animateEmpty();
    return;
  }

  const header = `${title}\n${'─'.repeat(Math.min(title.length, 60))}\n${paperDate.textContent}\n\n`;
  const blob   = new Blob([header + content], { type: 'text/plain;charset=utf-8' });
  const url    = URL.createObjectURL(blob);
  const a      = document.createElement('a');
  a.href     = url;
  a.download = sanitizeFilename(title) + '.txt';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

function sanitizeFilename(name) {
  return name.replace(/[^a-z0-9_\-\s]/gi, '').trim().replace(/\s+/g, '_') || 'document';
}

function animateEmpty() {
  const paper = document.getElementById('paper');
  paper.style.animation = 'shake 0.4s var(--ease)';
  paper.addEventListener('animationend', () => {
    paper.style.animation = '';
  }, { once: true });
}

// ── Inject shake keyframe ─────────────────────
(function injectShake() {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%  { transform: translateX(0); }
      20% { transform: translateX(-8px); }
      40% { transform: translateX(8px); }
      60% { transform: translateX(-5px); }
      80% { transform: translateX(5px); }
      100%{ transform: translateX(0); }
    }
  `;
  document.head.appendChild(style);
})();

// ── Dynamic page title on load ────────────────
(function setPageTitle() {
  const t = localStorage.getItem(KEY_TITLE);
  if (t && t.trim()) document.title = t.trim() + ' — TYPE';
})();

// ── Click paper to focus writer ───────────────
document.getElementById('paper').addEventListener('click', (e) => {
  if (e.target === document.getElementById('paper') ||
      e.target.classList.contains('ruled-lines') ||
      e.target.classList.contains('margin-line')) {
    writer.focus();
  }
});

// ── Restore caret position ────────────────────
// Place cursor at end of restored text
(function restoreCaret() {
  const len = writer.value.length;
  if (len > 0) {
    writer.focus();
    writer.setSelectionRange(len, len);
    // Scroll to top after restore
    writer.scrollTop = 0;
    writer.blur();
  }
})();
