'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const header = document.querySelector('.header');

const btnToscroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');


const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// cookies message
const message = document.createElement('div'); 
message.innerHTML =  "we use coockies for improved functionality and analytics. <button class ='btn btn--close-coockie'>Got it</button>";
message.classList.add('cookie-message');

header.prepend(message);
header.after(message);

document
  .querySelector('.cookie-message')
  .addEventListener('click', ()=> message.remove());

// message.style.backgroundColor = '#37383d';

// scroll smoothly to the section
btnToscroll.addEventListener('click', function(e) {
  section1.scrollIntoView({behavior: 'smooth'});
});

// page navigation
// using event delegation and event bubling
document.querySelector('.nav__links').addEventListener('click', function(e) {
  e.preventDefault();

  // matching stratgy
  if(e.target.classList.contains('nav__link')) {
    console.log(e.target);
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  };
});


// Tabbed component
tabsContainer.addEventListener('click', function(e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard clause
  if(!clicked) return;

  // Remove active classes
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  // Removing active class from contents
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  //Acive tab
  clicked.classList.add('operations__tab--active');

  // Active content area
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});