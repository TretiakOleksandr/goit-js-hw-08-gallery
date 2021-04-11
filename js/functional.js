import images from './gallery-items.js'

const galleryContaier = document.querySelector('.js-gallery'); // місце під галерею
const lightboxEl = document.querySelector('.js-lightbox'); // overlay
const lightboxImageEl = document.querySelector('.lightbox__image'); // картинка на overlay
const lightboxBtnEl = document.querySelector('.lightbox__button'); // кнопка закриття

const galleryMarkup = createGalleryMarkup(images);

galleryContaier.insertAdjacentHTML('beforeend', galleryMarkup);

galleryContaier.addEventListener('click', onImageClick);

lightboxBtnEl.addEventListener('click', onCloseBtnClick);

function createGalleryMarkup(images) {
    return images.map(({preview, original, description}) => {
        return `
            <li class="gallery__item">
                <a
                    class="gallery__link"
                    href="${original}"
                >
                    <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                    />
                </a>
            </li>
        `;
    })
    .join(' ');
}

function onImageClick(evt) {
    evt.preventDefault();  // зупиняємо перехід на посилання (забраження)
    if (!evt.target.classList.contains('gallery__image')) {
        return;
    }

    lightboxEl.classList.add('is-open');

    lightboxImageEl.setAttribute('src', evt.target.dataset.source);
    lightboxImageEl.setAttribute('alt', evt.target.attributes?.alt.value);

}

function onCloseBtnClick() {
    lightboxEl.classList.remove('is-open');
    lightboxImageEl.setAttribute('src', '');
    lightboxImageEl.setAttribute('alt', '');
}