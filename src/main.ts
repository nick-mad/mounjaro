import './index.css';

// ---------------------------------------------------------------------------
// Smooth scroll to consultation form for every "call to action" button/link
// ---------------------------------------------------------------------------
document.querySelectorAll<HTMLElement>('.js-scroll-to-form').forEach((el) => {
  el.addEventListener('click', (e) => {
    e.preventDefault();
    document
      .getElementById('consultation-form-section')
      ?.scrollIntoView({behavior: 'smooth', block: 'start'});
  });
});

// ---------------------------------------------------------------------------
// Footer year
// ---------------------------------------------------------------------------
document.querySelectorAll<HTMLElement>('.js-current-year').forEach((el) => {
  el.textContent = String(new Date().getFullYear());
});

// ---------------------------------------------------------------------------
// Consultation form: client-side anti-spam protection.
//   1) Honeypot field ("website") — real users never see or fill it,
//      simple bots that auto-fill every input usually do.
//   2) Time-trap — the form records the moment it was rendered; submissions
//      that arrive faster than a human could realistically fill the form
//      (< 2s) are treated as automated and rejected.
//   3) Basic client-side validation of name/phone as an extra safety net.
// NOTE: this is a static landing page without a backend, so this protects
// against naive bots only. For full protection a server-side check
// (or a service like reCAPTCHA/hCaptcha) should validate the same signals.
// ---------------------------------------------------------------------------
const form = document.getElementById('consultation-form') as HTMLFormElement | null;
const successBlock = document.getElementById('consultation-success');
const resetBtn = document.getElementById('consultation-reset-btn');
const errorEl = document.getElementById('form-error');
const submitBtn = document.getElementById('form-submit-btn') as HTMLButtonElement | null;
const submitLabel = form?.querySelector('.js-submit-label');
const loadedAtInput = document.getElementById('form-loaded-at') as HTMLInputElement | null;

const MIN_SUBMIT_DELAY_MS = 2000;

if (loadedAtInput) {
  loadedAtInput.value = String(Date.now());
}

function showError(message: string) {
  if (!errorEl) return;
  errorEl.textContent = message;
  errorEl.classList.remove('hidden');
}

function hideError() {
  if (!errorEl) return;
  errorEl.classList.add('hidden');
}

form?.addEventListener('submit', (e) => {
  e.preventDefault();
  hideError();

  const data = new FormData(form);
  const name = String(data.get('name') || '').trim();
  const phone = String(data.get('phone') || '').trim();
  const honeypot = String(data.get('website') || '').trim();
  const loadedAt = Number(data.get('loadedAt') || 0);

  // 1) Honeypot triggered — silently drop the submission as spam.
  if (honeypot !== '') {
    showError('Не вдалося надіслати заявку. Спробуйте пізніше.');
    return;
  }

  // 2) Submitted too fast to be a human — likely a bot.
  if (loadedAt && Date.now() - loadedAt < MIN_SUBMIT_DELAY_MS) {
    showError('Будь ласка, заповніть форму ще раз.');
    return;
  }

  // 3) Basic validation.
  if (name.length < 2) {
    showError("Введіть, будь ласка, ваше ім'я.");
    return;
  }
  if (!/^[0-9+()\s-]{7,20}$/.test(phone)) {
    showError('Введіть коректний номер телефону.');
    return;
  }

  if (submitBtn) submitBtn.disabled = true;
  if (submitLabel) submitLabel.textContent = 'Надсилання...';

  // Simulate submission delay (replace with a real API call when backend is available).
  window.setTimeout(() => {
    if (submitBtn) submitBtn.disabled = false;
    if (submitLabel) submitLabel.textContent = 'Дізнатися, чи підходить вам';

    form.classList.add('hidden');
    successBlock?.classList.remove('hidden');
  }, 1200);
});

resetBtn?.addEventListener('click', () => {
  form?.reset();
  if (loadedAtInput) {
    loadedAtInput.value = String(Date.now());
  }
  hideError();
  successBlock?.classList.add('hidden');
  form?.classList.remove('hidden');
});
