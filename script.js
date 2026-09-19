document.querySelectorAll('.mobile-menu a').forEach(link=>link.addEventListener('click',()=>{link.closest('details').open=false}));
document.addEventListener('keydown',event=>{if(event.key==='Escape'){document.querySelectorAll('.mobile-menu[open]').forEach(menu=>{menu.open=false;menu.querySelector('summary').focus()})}});
document.querySelectorAll('img:not(.gallery-image):not(.review-dialog-image)').forEach(img => {
  const fail = () => img.parentElement.classList.add('photo-failed');
  const recover = () => img.parentElement.classList.remove('photo-failed');
  img.addEventListener('error', fail);
  img.addEventListener('load', recover);
  if (img.getAttribute('src') && img.complete && !img.naturalWidth) fail();
});


const tabs = [...document.querySelectorAll('.service-tabs [role="tab"]')];
const cards = [...document.querySelectorAll('#service-gallery .service-card')];
const gallery = document.querySelector('#service-gallery');
const tablist = document.querySelector('.service-tabs');
gallery.setAttribute('role', 'tabpanel');
gallery.setAttribute('aria-labelledby', tabs[0].id);
gallery.tabIndex = 0;
tablist.hidden = false;
function selectCategory(tab) {
  tabs.forEach(item => {
    item.setAttribute('aria-selected', String(item === tab));
    item.tabIndex = item === tab ? 0 : -1;
  });
  cards.forEach(card => { card.hidden = tab.dataset.category !== '0' && card.dataset.category !== tab.dataset.category; });
  gallery.classList.toggle('is-filtered', tab.dataset.category !== '0');
  gallery.setAttribute('aria-labelledby', tab.id);
}
selectCategory(tabs[0]);
tabs.forEach((tab, i) => {
  tab.addEventListener('click', () => selectCategory(tab));
  tab.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (i + 1) % tabs.length;
    if (event.key === 'ArrowLeft') next = (i - 1 + tabs.length) % tabs.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabs.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    selectCategory(tabs[next]);
    tabs[next].focus();
    tabs[next].scrollIntoView({block:'nearest', inline:'nearest'});
  });
});
const viewer = document.querySelector('.gallery-dialog');
const fullImage = viewer.querySelector('.gallery-image');
const caption = viewer.querySelector('figcaption');
const count = viewer.querySelector('.gallery-count');
const previous = viewer.querySelector('.gallery-prev');
const next = viewer.querySelector('.gallery-next');
const error = viewer.querySelector('.gallery-error');
let photos = [], position = 0, opener;
function showPhoto(index) {
  position = (index + photos.length) % photos.length;
  const photo = photos[position];
  error.hidden = true;
  fullImage.parentElement.classList.remove('photo-failed');
  fullImage.hidden = false;
  fullImage.alt = photo.alt;
  fullImage.src = photo.src;
  caption.textContent = photo.alt;
  count.textContent = `${position + 1} / ${photos.length}`;
  previous.hidden = next.hidden = photos.length < 2;
}
fullImage.addEventListener('error', () => { fullImage.hidden = true; error.hidden = false; });
document.querySelectorAll('[data-photos] .gallery-open').forEach(button => button.addEventListener('click', event => {
  opener = event.currentTarget;
  photos = JSON.parse(button.closest('[data-photos]').dataset.photos);
  showPhoto(0);
  viewer.showModal();
  document.body.classList.add('lightbox-open');
}));
viewer.querySelector('.gallery-close').addEventListener('click', () => viewer.close());
previous.addEventListener('click', () => showPhoto(position - 1));
next.addEventListener('click', () => showPhoto(position + 1));
viewer.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault(); showPhoto(position + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
viewer.addEventListener('click', event => {
  const bounds = viewer.getBoundingClientRect();
  if (event.target === viewer && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) viewer.close();
});
viewer.addEventListener('close', () => {
  document.body.classList.remove('lightbox-open');
  opener?.focus();
});

// Draft: never submit personal data until a delivery endpoint is configured.
document.querySelector('.request-form')?.addEventListener('submit', event => event.preventDefault());

const contactWidget = document.querySelector('.contact-widget');
if (contactWidget) {
  const contactToggle = contactWidget.querySelector('summary');
  const closeContact = (restoreFocus = false) => {
    contactWidget.open = false;
    if (restoreFocus) contactToggle.focus();
  };
  document.addEventListener('click', event => {
    if (contactWidget.open && !contactWidget.contains(event.target)) closeContact();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && contactWidget.open) closeContact(true);
  });
  document.addEventListener('focusin', event => {
    if (contactWidget.open && !contactWidget.contains(event.target)) closeContact();
  });
  contactWidget.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => closeContact(true));
  });
}

// Original conversation screenshots, shown at readable width with vertical scrolling.
const reviewDialog = document.querySelector('.review-dialog');
const reviewImage = reviewDialog.querySelector('.review-dialog-image');
const reviewError = reviewDialog.querySelector('.review-dialog-error');
const reviewPrev = reviewDialog.querySelector('.review-dialog-prev');
const reviewNext = reviewDialog.querySelector('.review-dialog-next');
let reviewPhotos = [], reviewPosition = 0, reviewOpener;
function showReviewScreenshot(index) {
  reviewPosition = (index + reviewPhotos.length) % reviewPhotos.length;
  const photo = reviewPhotos[reviewPosition];
  reviewError.hidden = true;
  reviewImage.hidden = false;
  reviewImage.alt = photo.alt;
  reviewImage.src = photo.src;
  reviewDialog.querySelector('.review-dialog-count').textContent = `${reviewPosition + 1} / ${reviewPhotos.length}`;
  reviewPrev.hidden = reviewNext.hidden = reviewPhotos.length < 2;
  reviewDialog.scrollTop = 0;
}
reviewImage.addEventListener('error', () => { reviewImage.hidden = true; reviewError.hidden = false; });
document.querySelectorAll('[data-review-images]').forEach(link => link.addEventListener('click', event => {
  if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
  event.preventDefault();
  reviewOpener = link;
  reviewPhotos = JSON.parse(link.dataset.reviewImages);
  showReviewScreenshot(0);
  reviewDialog.showModal();
  reviewDialog.scrollTop = 0;
  document.body.classList.add('lightbox-open');
}));
reviewDialog.querySelector('.review-dialog-close').addEventListener('click', () => reviewDialog.close());
reviewPrev.addEventListener('click', () => showReviewScreenshot(reviewPosition - 1));
reviewNext.addEventListener('click', () => showReviewScreenshot(reviewPosition + 1));
reviewDialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    showReviewScreenshot(reviewPosition + (event.key === 'ArrowRight' ? 1 : -1));
  }
});
reviewDialog.addEventListener('click', event => {
  const bounds = reviewDialog.getBoundingClientRect();
  if (event.target === reviewDialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) reviewDialog.close();
});
reviewDialog.addEventListener('close', () => {
  document.body.classList.remove('lightbox-open');
  reviewOpener?.focus();
});
