import images from './gallery-items.js'

const galleryContaier = document.querySelector('.js-gallery'); // місце під галерею
const lightboxEl = document.querySelector('.js-lightbox'); // overlay
const lightboxImageEl = document.querySelector('.lightbox__image'); // картинка на overlay

let currentItem = null; // вибраний елемент галереї

const galleryMarkup = createGalleryMarkup(images); // створення галереї

galleryContaier.insertAdjacentHTML('beforeend', galleryMarkup); // рендер галереї

galleryContaier.addEventListener('click', onImageClick);

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

    lightboxEl.addEventListener('click', onLightboxClick);

    window.addEventListener('keydown', onKeyDowned);

    lightboxEl.classList.add('is-open');

    currentItem = evt.target.closest('.gallery__item');  // знаходимо поточний елемент списку

    lightboxImageEl.setAttribute('src', evt.target.dataset.source);
    lightboxImageEl.setAttribute('alt', evt.target.attributes?.alt.value);
}

function onLightboxClick(evt) {
    if (evt.target.dataset.action === 'close-lightbox'            // закриття кнопкою
        || evt.target.classList.contains('lightbox__overlay')) {  // закриття при кліку на overlay
        closeLightbox();
    }
}

function onKeyDowned(evt) {
    if (evt.code === 'Escape') {  // закриття Esc
        closeLightbox();
    }

    if (evt.code === 'ArrowRight') {

        currentItem = currentItem.nextElementSibling === null
        ? currentItem.parentNode.firstElementChild
        : currentItem.nextElementSibling;

        changeImage();        
    }

    if (evt.code === 'ArrowLeft') {

        currentItem = currentItem.previousElementSibling === null
        ? currentItem.parentNode.lastElementChild
        : currentItem.previousElementSibling;
        
        changeImage();        
    }
}

function closeLightbox() {
    lightboxEl.classList.remove('is-open');
    setImageAttributes('', '');
    lightboxEl.removeEventListener('click', onLightboxClick);
    window.removeEventListener('keydown', onKeyDowned);
}

function changeImage() {
    let newImage = currentItem.querySelector('.gallery__image');
    setImageAttributes(newImage.dataset.source, newImage.attributes?.alt.value);
}

function setImageAttributes(src, alt) {
    lightboxImageEl.setAttribute('src', src);
    lightboxImageEl.setAttribute('alt', alt);
}