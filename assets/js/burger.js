const burger = document.querySelector('.burger');
const body = document.querySelector('body')
const nav = document.querySelector('.navigation');

const isMenuOpen = () => nav.classList.contains('is-open');
const toggleMenu = () => isMenuOpen() ? closeMenu() : openMenu();

function openMenu() {
    burger.classList.add('is-active');
    burger.setAttribute('aria-expanded', 'true');
    nav.classList.add('is-open');
    body.classList.add('no-scroll');
}

function closeMenu() {
    burger.classList.remove('is-active');
    burger.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
    body.classList.remove('no-scroll');
}

burger.addEventListener('click', toggleMenu);

nav.addEventListener('click', (ev) => {
    if (ev.target.closest('a') && isMenuOpen()) closeMenu();
})

document.addEventListener('keydown', (ev) => {
    if (ev.key === 'Escape' && isMenuOpen()) closeMenu();
})

const desktopMatch = window.matchMedia('(min-width: 769px)');

desktopMatch.addEventListener('change', (ev) => {
    if (ev.matches) {
        if (isMenuOpen()) closeMenu();
        return;
    }

    nav.classList.add('no-transition');
    // remove animation
    requestAnimationFrame(() => {
        requestAnimationFrame(() => nav.classList.remove('no-transition'))
    });
})
