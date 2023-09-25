'use strict';

(function () {
    const mainNav = document.querySelector('.js-main-nav');
    
    mainNav.addEventListener('click', event => {
        const activeMainNavLink = document.querySelector('.main-nav__link--active');
        const currentMainNavLink = event.target;

        if (!currentMainNavLink.classList.contains('main-nav__link--active')) {
            if (activeMainNavLink) {
                activeMainNavLink.classList.remove('main-nav__link--active');
            }

            currentMainNavLink.classList.add('main-nav__link--active');
        }
    });
})();