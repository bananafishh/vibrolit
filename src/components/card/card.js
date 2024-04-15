'use strict';

(function () {
  const cards = Array.prototype.slice.call(document.querySelectorAll('.js-card'));
  const cardBtns = document.querySelectorAll('.js-card-btn');
  const cardImages = Array.prototype.slice.call(document.querySelectorAll('.js-card-img'));

  waitForImgLoading(cardImages, equalizeCardsHeight);
  window.addEventListener('resize', equalizeCardsHeight);
  handleCardState();

  function waitForImgLoading(images, callback) {
    let loadedImagesCount = 0;

    images.forEach(function (img) {
      if (img.complete && img.naturalWidth > 0) {
        loadedImagesCount++;
      } else {
        img.addEventListener('load', function () {
          loadedImagesCount++;

          if (loadedImagesCount === images.length) {
            callback();
          }
        });
      }

      if (loadedImagesCount === images.length) {
        callback();
      }
    });
  }

  function equalizeCardsHeight() {
    let maxHeight = 0;

    cards.forEach((card) => {
      card.style.height = 'auto';
      const actualHeight = card.offsetHeight;

      if (actualHeight > maxHeight) {
        maxHeight = actualHeight;
      }
    });

    cards.forEach((card) => {
      card.style.height = `${maxHeight}px`;
    });
  }

  function handleCardState() {
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const cardCaption = card.parentNode.querySelector('.js-card-caption');
      const cardIngredient = card.querySelector('.js-card-ingredient').textContent;

      if (card.classList.contains('card--disabled')) {
        cardCaption.textContent = `Печалька, ${cardIngredient} закончился.`;
        cardCaption.classList.add('text-small--warning');
      }

      card.addEventListener('click', onCardClick);
      card.addEventListener('mouseleave', onCardMouseLeave);
      card.addEventListener('mouseenter', onCardMouseEnter);
      cardBtns[i].addEventListener('click', onCardBtnClick);
    }
  }

  /** @this onCardClick */
  function onCardClick() {
    const cardCaption = this.parentNode.querySelector('.js-card-caption');
    const cardDescr = this.parentNode.querySelector('.js-card-descr');
    const cardToggle = this.querySelector('[aria-pressed]');
    const cardState = cardToggle.getAttribute('aria-pressed') === 'true';

    if (this.classList.contains('card--abandoned')) {
      this.classList.remove('card--abandoned');
      cardCaption.classList.remove('is-hidden');
      cardDescr.classList.add('is-visually-hidden');
    } else if (!this.classList.contains('card--disabled')) {
      this.classList.toggle('card--selected');
      cardToggle.setAttribute('aria-pressed', String(!cardState));
      cardCaption.classList.toggle('is-hidden');
      cardDescr.classList.toggle('is-visually-hidden');
    }
  }

  /** @this onCardBtnClick */
  function onCardBtnClick() {
    const cardCaption = this.parentNode;
    const card = cardCaption.parentNode.querySelector('.js-card');
    const cardDescr = cardCaption.parentNode.querySelector('.js-card-descr');
    const cardToggle = card.querySelector('[aria-pressed]');

    if (!card.classList.contains('card--disabled')) {
      card.classList.remove('card--abandoned');
      card.classList.add('card--selected');
      cardToggle.setAttribute('aria-pressed', true);
      cardCaption.classList.add('is-hidden');
      cardDescr.classList.remove('is-visually-hidden');
    }
  }

  /** @this onCardMouseLeave */
  function onCardMouseLeave() {
    if (this.classList.contains('card--selected')) {
      this.classList.remove('card--selected');
      this.classList.add('card--abandoned');
    }
  }

  /** @this onCardMouseEnter */
  function onCardMouseEnter() {
    if (this.classList.contains('card--abandoned')) {
      this.classList.remove('card--abandoned');
      this.classList.add('card--selected');
    }
  }
})();
