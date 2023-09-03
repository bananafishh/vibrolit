const slider = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    breakpoints: {
        // when window width is >= 710px
        710: {
          slidesPerView: 2,
        },
        // when window width is >= 1300px
        1300: {
          slidesPerView: 3,
        },
    },
    navigation: {
        nextEl: '.slider__button-next',
        prevEl: '.slider__button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
        dynamicMainBullets: 3,
    },
});