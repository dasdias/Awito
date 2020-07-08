'use strict';

const dataBase = [];

const modalAdd = document.querySelector('.modal__add'),
    addAd = document.querySelector('.add__ad'),
    modalBtnSubmit = document.querySelector('.modal__btn-submit'),
    modalSubmit = document.querySelector('.modal__submit'),
    modalItem = document.querySelector('.modal__item'),
    catalog = document.querySelector('.catalog'),
    modalBtnWarning = document.querySelector('.modal__btn-warning');

    
// спред оператор ...elementsModalSubmit
const elementsModalSubmit = [...modalSubmit.elements].filter( elem => elem.tagName !== 'BUTTON' && elem.type !== 'submit');

const closeModal = function(e) {
    const target = e.target;
    if (target.closest('.modal__close') || target === this) {
        this.classList.add('hide');
        if (this === modalAdd) {
            modalSubmit.reset();
        }
    }
};
const closeModalEsc = function(e) {
    
    const target = e.code;
    if (target === 'Escape') {
        modalAdd.classList.add('hide');
        modalItem.classList.add('hide');
        modalSubmit.reset();
        document.removeEventListener('keydown', closeModalEsc);        
    }
   
};
modalSubmit.addEventListener('input', () => {
    const validForm = elementsModalSubmit.every(elem => elem.value);
    console.log(validForm);
    modalBtnSubmit.disabled = !validForm;
    modalBtnWarning.style.display = validForm ? 'none' : '';
});

modalSubmit.addEventListener('submit', (event) => {

    event.preventDefault();
    const itemObj = {};
    for (const elem of elementsModalSubmit) {
        itemObj[elem.name] = elem.value;
    }
    dataBase.push(itemObj);
    modalSubmit.reset();
    // console.log(itemObj);
});

addAd.addEventListener('click', () => {
    modalAdd.classList.remove('hide');
    modalBtnSubmit.disabled = true;
    document.addEventListener('keydown', closeModalEsc);
});
catalog.addEventListener('click', (e)=> {
    const target = e.target;
    if (target.closest('.card')) {+
        modalItem.classList.remove('hide');
        document.addEventListener('keydown', closeModalEsc);
    }
});

modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);

// modalItem.addEventListener('click', (e)=> {
//     const target = e.target;
//     if (target.classList.contains('modal__close') || target === modalItem) {
//         modalItem.classList.add('hide');
//     }
// });

// modalAdd.addEventListener('click', event => {
//     // console.log(event.target);    
//     const target = event.target;
//     if (target.classList.contains('modal__close') || target === modalAdd ) {
//         modalAdd.classList.add('hide');
//         modalSubmit.reset();
//     }
// });

// document.addEventListener('keydown',  closeModalEsc);