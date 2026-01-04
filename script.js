// Year injection
const year = document.getElementById('year') || (function(){
  // Create fallback year element in footer if missing
  const footer = document.querySelector('.footer');
  if(footer){
    const span = document.createElement('span');
    span.id = 'year';
    footer.insertBefore(span, footer.firstChild);
    return span;
  }
  return null;
})();
if (year) year.textContent = new Date().getFullYear();

// Theme toggle (persist)
const themeToggle = document.getElementById('theme-toggle');
function setTheme(name){
  if(!themeToggle) return;
  if(name === 'light') {
    document.documentElement.style.setProperty('--bg','#f6f7f9');
    document.documentElement.style.setProperty('--panel','#ffffff');
    document.documentElement.style.setProperty('--muted','#6b7280');
    document.documentElement.style.setProperty('--text','#0b1220');
    document.documentElement.style.setProperty('--accent','#2b6cb0');
    localStorage.setItem('site-theme','light');
    themeToggle.setAttribute('aria-pressed','true');
  } else {
    localStorage.setItem('site-theme','dark');
    themeToggle.setAttribute('aria-pressed','false');
    document.documentElement.style.removeProperty('--bg');
    document.documentElement.style.removeProperty('--panel');
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
