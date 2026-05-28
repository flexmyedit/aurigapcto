// Nav scroll state
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
window.addEventListener('scroll', onScroll, { passive: true });

// Mobile burger
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav__links');
burger.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// Scroll reveal
const revealEls = document.querySelectorAll([
  '.section__label', '.section__title', '.section__intro',
  '.split__head', '.split__body',
  '.card4', '.feature', '.loc', '.number-item',
  '.pooling-banner', '.world-quote',
  '.pcto__card', '.pcto__header',
  '.trends', '.security-items'
].join(','));

revealEls.forEach(el => el.classList.add('reveal'));

const ro = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const siblings = [...entry.target.parentElement.children].filter(c => c.classList.contains('reveal'));
    const idx = siblings.indexOf(entry.target);
    entry.target.style.transitionDelay = Math.min(idx * 0.06, 0.3) + 's';
    entry.target.classList.add('in');
    ro.unobserve(entry.target);
  });
}, { threshold: 0.1 });

revealEls.forEach(el => ro.observe(el));

// Active nav link highlight
const sections = document.querySelectorAll('section[id], .hero');
const links = navLinks.querySelectorAll('a[href^="#"]');
const sectionObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    links.forEach(l => {
      l.style.color = '';
      if (l.getAttribute('href') === '#' + e.target.id) l.style.color = 'var(--gold)';
    });
  });
}, { threshold: 0.4 });
sections.forEach(s => sectionObs.observe(s));
