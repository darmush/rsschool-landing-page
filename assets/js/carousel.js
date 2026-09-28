const indicator = document.querySelector('.format-indicator');
const btnLeft = document.querySelector('[data-btn-left]');
const btnRight = document.querySelector('[data-btn-right]');
const list = document.querySelector('.carousel-list');
const cards = document.querySelectorAll('.carousel-card');

const DURATION = 400;
let isAnime = false;
let current = 1;

function setIndicator() {
    const pad = (n) => String(n).padStart(2, '0');
    indicator.textContent = `${pad(current)} / ${pad(cards.length)}`;
}

function getStepSize() {
    const [first, second] = list.children;
    return second.getBoundingClientRect().left - first.getBoundingClientRect().left;
}

function slide(from, to) {
    return list.animate(
        [{ transform: `translateX(${from}px)` },
        { transform: `translateX(${to}px)` }],
        { duration: DURATION, easing: 'ease' }
    ).finished;
}

async function stepLeft() {
    if (isAnime) return;
    isAnime = true;

    current === 1
        ? current = cards.length
        : current -= 1;
    setIndicator();

    list.prepend(list.lastElementChild);
    await slide(-getStepSize(), 0);

    isAnime = false;
}

async function stepRight() {
    if (isAnime) return;
    isAnime = true;

    current < cards.length
        ? current += 1
        : current = 1;
    setIndicator();

    await slide(0, -getStepSize());
    list.append(list.firstElementChild);

    isAnime = false;
}

setIndicator();

btnLeft.addEventListener('click', stepLeft);
btnRight.addEventListener('click', stepRight);
