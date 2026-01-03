// inject year
document.getElementById('year').textContent = new Date().getFullYear();

// smooth scrolling + active link highlight
const menuLinks = Array.from(document.querySelectorAll('.menu a'));

function onScroll(){
  const fromTop = window.scrollY + 40;
  menuLinks.forEach(link => {
    const id = link.getAttribute('href');
    if(!id || id.length <= 1) return;
    const section = document.querySelector(id);
    if(!section) return;
    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;
    if(fromTop >= top && fromTop < bottom) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}
window.addEventListener('scroll', onScroll, {passive:true});

// smooth anchor behavior
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const hash = a.getAttribute('href');
    if(hash && hash.length > 1){
      e.preventDefault();
      const target = document.querySelector(hash);
      if(target) target.scrollIntoView({behavior:'smooth', block:'start'});
    }
  });
});
// initial highlight
onScroll();
