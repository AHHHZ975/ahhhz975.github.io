// Year injection
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Theme toggle (persist)
const themeToggle = document.getElementById('theme-toggle');
function setTheme(name){
  if(name === 'light') {
    document.documentElement.style.setProperty('--bg','#f6f7f9');
    document.documentElement.style.setProperty('--panel','#ffffff');
    document.documentElement.style.setProperty('--page-bg','#f6f7f9');
    document.documentElement.style.setProperty('--muted','#6b7280');
    document.documentElement.style.setProperty('--text','#0b1220');
    document.documentElement.style.setProperty('--accent','#2b6cb0');
    localStorage.setItem('site-theme','light');
    themeToggle.setAttribute('aria-pressed','true');
  } else {
    // restore default dark (we rely on CSS defaults)
    localStorage.setItem('site-theme','dark');
    themeToggle.setAttribute('aria-pressed','false');
    // For simplicity we reload the page variables by removing inline overrides:
    document.documentElement.style.removeProperty('--bg');
    document.documentElement.style.removeProperty('--panel');
    document.documentElement.style.removeProperty('--page-bg');
    document.documentElement.style.removeProperty('--muted');
    document.documentElement.style.removeProperty('--text');
    document.documentElement.style.removeProperty('--accent');
  }
}

if(themeToggle){
  const saved = localStorage.getItem('site-theme') || 'dark';
  setTheme(saved === 'light' ? 'light' : 'dark');
  themeToggle.addEventListener('click', () => {
    const current = localStorage.getItem('site-theme') === 'light' ? 'light' : 'dark';
    setTheme(current === 'light' ? 'dark' : 'light');
  });
}

// Search overlay
const searchBtn = document.getElementById('search-btn');
const searchOverlay = document.getElementById('search-overlay');
const closeSearch = document.getElementById('close-search');
const searchInput = document.getElementById('search-input');

if(searchBtn && searchOverlay){
  searchBtn.addEventListener('click', () => {
    searchOverlay.hidden = false;
    // focus input after a short delay
    setTimeout(()=> searchInput && searchInput.focus(), 80);
  });
}
if(closeSearch){
  closeSearch.addEventListener('click', ()=> searchOverlay.hidden = true);
}
if(searchOverlay){
  searchOverlay.addEventListener('click', (e)=>{
    if(e.target === searchOverlay) searchOverlay.hidden = true;
  });
}

// Smooth scroll for page anchors
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(!href || href === '#') return;
    if(href.startsWith('#')){
      const el = document.querySelector(href);
      if(el){
        e.preventDefault();
        el.scrollIntoView({behavior:'smooth', block:'start'});
      }
    }
  });
});
