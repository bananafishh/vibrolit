'use strict';

(function () {
    const htmlElement = document.querySelector('html');
    const menuButton = document.querySelector('.js-menu-button');
    const mainNav = document.querySelector('.js-main-nav');
    
    menuButton.addEventListener('click', event => {
        event.target.classList.toggle('menu-button_opened');
        mainNav.classList.toggle('main-nav_opened');
        htmlElement.classList.toggle('document_prevented-from-scrolling');
    });

    const mainNavLinks = document.querySelectorAll('.js-main-nav-link');

    mainNavLinks.forEach(mainNavLink => mainNavLink.addEventListener('click', () => {
        menuButton.classList.remove('menu-button_opened');
        mainNav.classList.remove('main-nav_opened');
        htmlElement.classList.remove('document_prevented-from-scrolling');
    }));
})();