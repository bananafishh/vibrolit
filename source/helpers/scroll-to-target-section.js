function scrollToTargetSection(event, eventTarget) {
    event.preventDefault();

    const targetSectionPosition = document.querySelector(`${eventTarget.hash}`).getBoundingClientRect().top + window.scrollY;
    const stickyPageHeaderHeight = document.querySelector('.js-page-header').clientHeight;

    window.scrollTo({
        top: targetSectionPosition - stickyPageHeaderHeight,
        behavior: 'smooth',
    });
}
