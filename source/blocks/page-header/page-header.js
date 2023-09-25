'use strict';

(function () {
    const pageHeader = document.querySelector('.js-page-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            pageHeader.classList.add('page-header--sticky');
        } else {
            pageHeader.classList.remove('page-header--sticky');
        }
    });
})();