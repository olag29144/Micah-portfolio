document.getElementById('footerYear').textContent = new Date().getFullYear();

const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const mobileLinks = mobileMenu.querySelectorAll('.mobile-nav-link');

function closeMobileMenu() {
  hamburgerBtn.classList.remove('open');
  mobileMenu.classList.remove('open');
  hamburgerBtn.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

hamburgerBtn.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('open');
  if (isOpen) {
    closeMobileMenu();
  } else {
    hamburgerBtn.classList.add('open');
    mobileMenu.classList.add('open');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
});

mobileLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
    closeMobileMenu();
  }
});

const allNavLinks = document.querySelectorAll('a[href^="#"]');
allNavLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const navH = document.getElementById('navbar').offsetHeight;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => observer.observe(el));

const skillFills = document.querySelectorAll('.skill-bar-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      fill.style.width = fill.dataset.width + '%';
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.3 });

skillFills.forEach(fill => skillObserver.observe(fill));

const cvBtn = document.getElementById('cvDownloadBtn');
if (cvBtn) {
  cvBtn.addEventListener('click', (e) => {
    const link = document.createElement('a');
    link.href = 'files/cv.pdf';
    fetch('files/cv.pdf', { method: 'HEAD' })
      .then(res => {
        if (!res.ok) throw new Error('not found');
      })
      .catch(() => {
        e.preventDefault();
        alert('CV file not yet available. Add your CV as files/cv.pdf to enable the download.');
      });
  });
}

const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn = document.getElementById('submitBtn');
const submitLabel = document.getElementById('submitLabel');

function setError(groupId, errId, show) {
  const group = document.getElementById(groupId);
  group.classList.toggle('error', show);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('contactName').value.trim();
  const email = document.getElementById('contactEmail').value.trim();
  const subject = document.getElementById('contactSubject').value.trim();
  const message = document.getElementById('contactMessage').value.trim();

  let valid = true;

  if (!name) { setError('fgName', 'errName', true); valid = false; } else { setError('fgName', 'errName', false); }
  if (!email || !validateEmail(email)) { setError('fgEmail', 'errEmail', true); valid = false; } else { setError('fgEmail', 'errEmail', false); }
  if (!subject) { setError('fgSubject', 'errSubject', true); valid = false; } else { setError('fgSubject', 'errSubject', false); }
  if (!message || message.length < 10) { setError('fgMessage', 'errMessage', true); valid = false; } else { setError('fgMessage', 'errMessage', false); }

  if (!valid) return;

  submitBtn.disabled = true;
  submitLabel.textContent = 'Sending...';

  setTimeout(() => {
    contactForm.style.display = 'none';
    formSuccess.style.display = 'block';
    submitBtn.disabled = false;
    submitLabel.textContent = 'Send Message';
  }, 900);
});

['contactName','contactEmail','contactSubject','contactMessage'].forEach(id => {
  const el = document.getElementById(id);
  const fgMap = { contactName:'fgName', contactEmail:'fgEmail', contactSubject:'fgSubject', contactMessage:'fgMessage' };
  el.addEventListener('input', () => setError(fgMap[id], '', false));
});

window.addEventListener('scroll', () => {
  const nav = document.getElementById('navbar');
  if (window.scrollY > 40) {
    nav.style.background = 'rgba(23, 21, 29, 0.96)';
  } else {
    nav.style.background = 'rgba(23, 21, 29, 0.85)';
  }
}, { passive: true });

