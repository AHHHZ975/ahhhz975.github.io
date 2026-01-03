// Inject current year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Profile photo preview (client-side only — does not upload)
const input = document.getElementById('upload-photo');
const img = document.getElementById('profile-pic');
if (input && img) {
  input.addEventListener('change', e => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => { img.src = reader.result; };
    reader.readAsDataURL(file);
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const hash = a.getAttribute('href');
    if (hash && hash.length > 1) {
      e.preventDefault();
      const target = document.querySelector(hash);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Highlight active nav link based on scroll
const sectionLinks = Array.from(document.querySelectorAll('.nav-links a'));
function onScroll() {
  const fromTop = window.scrollY + 80;
  sectionLinks.forEach(link => {
    const id = link.getAttribute('href');
    if (!id || id.length <= 1) return;
    const section = document.querySelector(id);
    if (!section) return;
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if (fromTop >= top && fromTop < bottom) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();
