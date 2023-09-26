'use strict';

(function () {
    const mainNav = document.querySelector('.js-main-nav');

    function addActiveClass(currentMainNavLink) {
        const activeMainNavLink = document.querySelector('.main-nav__link--active');
        
        if (!currentMainNavLink.classList.contains('main-nav__link--active')) {
            if (activeMainNavLink) {
                activeMainNavLink.classList.remove('main-nav__link--active');
            }

            currentMainNavLink.classList.add('main-nav__link--active');
        }
    }
    
    mainNav.addEventListener('click', event => {
        const currentMainNavLink = event.target;

        addActiveClass(currentMainNavLink);
        scrollToTargetSection(event, currentMainNavLink);
    });
})();