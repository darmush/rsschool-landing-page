const PRICING = {
    individual: { pricePerHour: 300, photosPerHour: 60, defaultHours: 1 },
    pair: { pricePerHour: 330, photosPerHour: 60, defaultHours: 1 },
    wedding: { pricePerHour: 500, photosPerHour: 60, defaultHours: 2 },
    group: { pricePerHour: 350, photosPerHour: 60, defaultHours: 1 },
};
// const RETOUCH_PER_HOUR = 60;
// const EXTRA_PHOTOS = 10;

const modal = document.querySelector('.modal');
const bookingTemplate = document.querySelector('#booking-template');

// const hourForms = { one: 'час', few: 'часа', many: 'часов' };
// const pluralRules = new Intl.PluralRules('ru-RU');

// function formatHours(hours) {
//     return `${hours} ${hourForms[pluralRules.select(hours)]}`;
// }

export function openModal(work) {
    const content = bookingTemplate.content.cloneNode(true);

    content.querySelector('.modal-title').textContent = work.name;
    content.querySelector('.modal-description').textContent = work.description;

    const photos = getPhotoUrls(work);
    content.querySelector('.modal-gallery').append(...photos.map((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.alt = `${work.name}, фото ${index + 1}`;
        img.width = 600;
        img.height = 800;
        if (index > 3) img.loading = 'lazy';
        return img;
    }));

    const form = content.querySelector('.modal-form');
    const { defaultHours } = PRICING[work.type];

    form.querySelector(`input[name="duration"][value="${defaultHours}"]`).checked = true;

    form.addEventListener('input', () => createFormResult(work, form));
    createFormResult(work, form);

    modal.replaceChildren(content);
    modal.showModal();
    document.body.classList.add('no-scroll');
}

function getPhotoUrls(work) {
    if (!work.photosCount) return [work.cover];

    return Array.from({ length: work.photosCount }, (_, index) =>
        `${work.url}${String(index + 1).padStart(2, '0')}-thumb.webp`);
}


function createFormResult(work, form) {
    const { pricePerHour, photosPerHour } = PRICING[work.type];
    const { elements } = form;

    const hours = Number(elements.duration.value);
    const price = pricePerHour * hours;
    const photos = photosPerHour * hours;

    const extra = elements.makeup.checked || elements.secondLocation.checked;

    elements.price.value = extra
        ? `от ${price} GEL`
        : `${price} GEL`;
    elements.photos.value = photos;
};

let pressedOnBackdrop = false;

modal.addEventListener('pointerdown', (event) => {
    pressedOnBackdrop = event.target === modal;
});

modal.addEventListener('click', (event) => {
    const isBackdrop = pressedOnBackdrop && event.target === modal;
    if (isBackdrop || event.target.closest('.modal-close')) modal.close();
});

modal.addEventListener('close', () => {
    document.body.classList.remove('no-scroll');
    modal.replaceChildren();
});
