const root = document.documentElement;
const toggle = document.querySelector('.theme-toggle');

function setTheme(theme) {
  root.setAttribute('data-theme', theme);
  toggle.setAttribute('aria-checked', theme === 'dark');
  localStorage.setItem('theme', theme);
}

const saved = localStorage.getItem('theme');
const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(saved || (systemPrefersDark ? 'dark' : 'light'));

toggle.addEventListener('click', () => {
  const current = root.getAttribute('data-theme');
  setTheme(current === 'dark' ? 'light' : 'dark');
});
