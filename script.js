document.querySelectorAll('.mobile-menu a').forEach(link=>link.addEventListener('click',()=>{link.closest('details').open=false}));
document.addEventListener('keydown',event=>{if(event.key==='Escape'){document.querySelectorAll('.mobile-menu[open]').forEach(menu=>{menu.open=false;menu.querySelector('summary').focus()})}});
document.querySelectorAll('img').forEach(img=>{const fail=()=>img.parentElement.classList.add('photo-failed');img.addEventListener('error',fail);if(img.complete&&!img.naturalWidth)fail()});


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
  const photo = photos[position].querySelector('img');
  error.hidden = true;
  fullImage.hidden = false;
  fullImage.alt = photo.alt;
  fullImage.src = photo.src;
  caption.textContent = photo.alt;
  count.textContent = `${position + 1} / ${photos.length}`;
  previous.hidden = next.hidden = photos.length < 2;
}
fullImage.addEventListener('error', () => { fullImage.hidden = true; error.hidden = false; });
cards.forEach(card => card.querySelector('.gallery-open').addEventListener('click', event => {
  opener = event.currentTarget;
  photos = cards.filter(item => !item.hidden);
  showPhoto(photos.indexOf(card));
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
