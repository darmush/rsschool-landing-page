const WORKS_URL = '../assets/works.json';
const PAGE_SIZE = 4;

const state = {
    works: [],
    type: 'all',
    visible: PAGE_SIZE,
};

const list = document.querySelector('.work-list');
const cardTemplate = document.querySelector('#work-card-template');
const filters = document.querySelector('.work-filters');
const moreBtn = document.querySelector('[data-show-more]');

async function loadWorks() {
    const response = await fetch(WORKS_URL);
    if (!response.ok)
        throw new Error(
            `Не удалось загрузить работы в портфолио: ${response.status}`,
        );

    return response.json();
}

function createCard(work, index) {
    const card = cardTemplate.content.firstElementChild.cloneNode(true);

    card.querySelector('.label').textContent = work.name;
    card.querySelector('.work-card__text').textContent = work.description;

    const time = card.querySelector('.work-card__date');
    const date = formatDate(work.date);
    time.textContent = date;
    time.dateTime = work.date;

    const img = card.querySelector('img');
    img.src = work.cover;
    img.alt = work.alt;
    img.style.scale = work.scale;
    img.style.objectPosition = work.position;

    if (index < 2) img.loading = 'eager';

    return card;
}

function formatDate(date) {
    const [year, month] = date.split('-');
    return `${month} / ${year.slice(2)}`;
}

function render() {
    const filtered = state.type === 'all'
        ? state.works
        : state.works.filter((work) => work.type === state.type);

    if (filtered.length === 0) {
        list.innerHTML =
            '<li>Пока нет работ в этой категории</li>';
        moreBtn.hidden = true;
        return;
    }

    list.replaceChildren(...filtered.slice(0, state.visible).map((work, index) => createCard(work, index)));

    moreBtn.hidden = state.visible >= filtered.length;
}

filters.addEventListener('click', (event) => {
    const btn = event.target.closest('button[data-type]');
    // if click is not on the button
    if (!btn) return;

    filters.querySelectorAll('button').forEach((item) => {
        item.setAttribute('aria-pressed', String(item === btn));
    });

    state.type = btn.dataset.type;
    state.visible = PAGE_SIZE;
    render();
});

moreBtn.addEventListener('click', () => {
    state.visible += PAGE_SIZE;
    render();
});

async function init() {
    try {
        state.works = await loadWorks();
        render();
    } catch (error) {
        console.error(error);
        list.innerHTML =
            '<li>Ошибка загрузки работ в портфолио. Попробуйте обновить страницу</li>';
        moreBtn.hidden = true;
    }
}

init();
