(function () {
    const buttonGroup = document.querySelector('.js-button-group');

    buttonGroup.addEventListener('click', event => {
        event.preventDefault();
        console.log(scrollToTargetSection);
        scrollToTargetSection(event, event.target);
    });
})();
