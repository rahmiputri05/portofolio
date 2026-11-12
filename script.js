const root = document.documentElement;
const savedTheme = localStorage.getItem('portfolio-theme');
if (savedTheme) root.dataset.theme = savedTheme;

document.querySelector('[data-theme-toggle]')?.addEventListener('click', () => {
  const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
  root.dataset.theme = theme;
  localStorage.setItem('portfolio-theme', theme);
});

const menuToggle = document.querySelector('[data-menu-toggle]');
const menu = document.querySelector('[data-menu]');
menuToggle?.addEventListener('click', () => {
  const isOpen = menu.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menu.classList.remove('is-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}));

document.querySelectorAll('[data-project-filters] .filter').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-project-filters] .filter').forEach((item) => item.classList.remove('active'));
    button.classList.add('active');
    const filter = button.dataset.filter;
    document.querySelectorAll('[data-project-category]').forEach((project) => {
      project.hidden = filter !== 'all' && project.dataset.projectCategory !== filter;
    });
  });
});

document.querySelector('[data-contact-form]')?.addEventListener('submit', (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  const subject = encodeURIComponent(data.get('subject') || 'Pesan dari portfolio Rahmi Putri');
  const body = encodeURIComponent(`Nama: ${data.get('name')}\nEmail: ${data.get('email')}\n\n${data.get('message')}`);
  window.location.href = `mailto:rahmip920@gmail.com?subject=${subject}&body=${body}`;
  form.querySelector('[data-form-note]').textContent = 'Aplikasi email sedang dibuka...';
});

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});
