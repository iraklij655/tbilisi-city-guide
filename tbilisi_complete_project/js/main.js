'use strict';

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');

function closeMenu() {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'მენიუს გახსნა');
}

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'მენიუს დახურვა' : 'მენიუს გახსნა');
});

nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && nav.classList.contains('open')) {
    closeMenu();
    menuButton.focus();
  }
});

const form = document.querySelector('#guide-form');
const message = document.querySelector('#form-message');

form.addEventListener('submit', event => {
  event.preventDefault();
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (!name) {
    message.textContent = 'გთხოვ, შეიყვანე სახელი.';
    form.elements.name.focus();
    return;
  }
  if (!validEmail) {
    message.textContent = 'გთხოვ, შეიყვანე სწორი ელფოსტა.';
    form.elements.email.focus();
    return;
  }
  message.textContent = `მადლობა, ${name}! ფორმა წარმატებით შემოწმდა. ეს დემო ფორმაა და მონაცემები არ იგზავნება.`;
  form.reset();
});
