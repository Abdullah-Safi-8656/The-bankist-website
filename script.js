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

const nav = document.querySelector('.nav');
const allSectoins = document.querySelectorAll('.section');
const targetImages = document.querySelectorAll('img[data-src]');

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

// Menue fade animation
const handleHover = function(e) {
  if (e.target.classList.contains('nav__link'))  {
    const link = e.target;
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    sibling.forEach(el => {
      if (el !== link) el.style.opacity = this
    });

    logo.style.opacity = this;
  };

}; 

// passing arguments into handler
nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky Nav using IntersectionObserver API
const navHeight = nav.getBoundingClientRect().height

const stickyNav = function(entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headObserver = new IntersectionObserver(stickyNav, 
  {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`
  }
);

headObserver.observe(header);


// Revale sections
const RevaleSection = function(entries, observer){

  const [entry] = entries;

  entries.forEach(entry => {
    
      if (!entry.isIntersecting) return
      entry.target.classList.remove('section--hidden');
      observer.unobserve(entry.target);
  });

};

const sectionObserver = new IntersectionObserver(RevaleSection, 
  {
    root: null,
    threshold: 0.15
  }  
);

allSectoins.forEach(function(section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy load images
const LoadImg = function(entries, observe) {
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function() {
    entry.target.classList.remove('lazy-img');
  });

  observe.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(LoadImg, 
  {
    root: null,
    threshold: 0,
    rootMargin: '200px'
  }
);

targetImages.forEach(img => imageObserver.observe(img));