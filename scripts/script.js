'use strict';

const modalAdd = document.querySelector('.modal__add'),
    addAd = document.querySelector('.add__ad'),
    modalBtnSubmit = document.querySelector('.modal__btn-submit'),
    modalSubmit = document.querySelector('.modal__submit'),
    modalItem = document.querySelector('.modal__item'),
    catalog = document.querySelector('.catalog');

addAd.addEventListener('click', () => {
    modalAdd.classList.remove('hide');
    modalBtnSubmit.disabled = true;
});
catalog.addEventListener('click', (e)=> {
    const target = e.target;
    if (target.closest('.card')) {
        modalItem.classList.remove('hide');
    }
});
modalItem.addEventListener('click', (e)=> {
    const target = e.target;
    if (target.classList.contains('modal__close') || target === modalItem) {
        modalItem.classList.add('hide');
    }
});
modalAdd.addEventListener('click', event => {
    // console.log(event.target);    
    const target = event.target;
    if (target.classList.contains('modal__close') || target === modalAdd ) {
        modalAdd.classList.add('hide');
        modalSubmit.reset();
    }
});

document.addEventListener('keydown', (e) => {
    const target = e.keyCode;
    if (target === 27) {
        modalAdd.classList.add('hide');
        modalItem.classList.add('hide');
        modalSubmit.reset();
    }
});