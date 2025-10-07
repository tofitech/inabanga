// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggleButton = document.querySelector('.nav-toggle');
const navElement = document.getElementById('primary-nav');
navToggleButton.addEventListener('click', () => {
  const expanded = navToggleButton.getAttribute('aria-expanded') === 'true';
  navToggleButton.setAttribute('aria-expanded', String(!expanded));
  navElement.classList.toggle('open');
});

// Dropdown toggling (click + keyboard)
const submenuParents = document.querySelectorAll('.menu-item.has-submenu');
submenuParents.forEach((parent) => {
  const trigger = parent.querySelector(':scope > .menu-link');
  trigger.addEventListener('click', (e) => {
    const isOpen = parent.classList.contains('open');
    closeAllSubmenus();
    if (!isOpen) {
      parent.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
    }
  });
  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      trigger.click();
    }
    if (e.key === 'Escape') {
      closeAllSubmenus();
      trigger.focus();
    }
    if (e.key === 'ArrowDown') {
      const firstItem = parent.querySelector(':scope > .submenu a, :scope > .submenu button');
      if (firstItem) {
        parent.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
        firstItem.focus();
      }
    }
  });
});

function closeAllSubmenus() {
  document.querySelectorAll('.menu-item.has-submenu').forEach((p) => {
    p.classList.remove('open');
    const t = p.querySelector(':scope > .menu-link');
    if (t) t.setAttribute('aria-expanded', 'false');
  });
}

document.addEventListener('click', (e) => {
  if (!e.target.closest('.menu')) {
    closeAllSubmenus();
  }
});

// Smooth scroll on internal links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId.length > 1) {
      const el = document.querySelector(targetId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (navElement.classList.contains('open')) {
          navElement.classList.remove('open');
          navToggleButton.setAttribute('aria-expanded', 'false');
        }
      }
    }
  });
});

// Back to top
document.querySelector('.back-to-top').addEventListener('click', (e) => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Basic scrollspy to highlight active section in menu
const sectionIds = ['#about','#history','#location','#contact','#officials','#population','#tourism','#tourist-spots','#events','#welfare','#drm','#senior-pwd','#citizen-patrol','#opportunities','#jobs','#business'];
const menuLinks = Array.from(document.querySelectorAll('.menu a, .menu button')).filter((el) => el.getAttribute('href'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const id = '#' + entry.target.id;
    if (!id) return;
    const link = document.querySelector(`.menu a[href='${id}']`);
    if (!link) return;
    const li = link.closest('li');
    if (entry.isIntersecting) {
      document.querySelectorAll('.menu li').forEach((n) => n.classList.remove('is-active'));
      if (li) li.classList.add('is-active');
      const parentWithSub = link.closest('.has-submenu');
      if (parentWithSub) parentWithSub.classList.add('is-active');
    }
  });
}, { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.2, 0.6] });

sectionIds.forEach((sid) => {
  const el = document.querySelector(sid);
  if (el) observer.observe(el);
});


