'use strict';

const dataBase = JSON.parse(localStorage.getItem('awito')) || [];

const modalAdd = document.querySelector('.modal__add'),
  addAd = document.querySelector('.add__ad'),
  modalBtnSubmit = document.querySelector('.modal__btn-submit'),
  modalSubmit = document.querySelector('.modal__submit'),
  modalItem = document.querySelector('.modal__item'),
  catalog = document.querySelector('.catalog'),
  modalBtnWarning = document.querySelector('.modal__btn-warning'),
  modalFileInput = document.querySelector('.modal__file-input'),
  modalFileBtn = document.querySelector('.modal__file-btn'),
    // Modal
  modalImageAdd = document.querySelector('.modal__image-add'),
  modalHeaderItem = document.querySelector('.modal__header-item'),
  modalImageItem = document.querySelector('.modal__image-item'),
  modalStatusItem = document.querySelector('.modal__status-item'),
  modalDescriptionItem = document.querySelector('.modal__description-item'),
  modalCostItem = document.querySelector('.modal__cost-item');


    const textFileBtn = modalFileBtn.textContent;
    const srcModalImage = modalImageAdd.src;
// спред оператор ...elementsModalSubmit
const elementsModalSubmit = [...modalSubmit.elements].filter( (elem) => elem.tagName !== 'BUTTON' && elem.type !== 'submit');
// console.log(dataBase);
const infoPhoto = {};
// console.log(localStorage.getItem('awito'));
const saveDB = () => localStorage.setItem('awito', JSON.stringify(dataBase));

const checkForm = () => {
  const validForm = elementsModalSubmit.every((elem) => elem.value);
//   console.log(validForm);
  modalBtnSubmit.disabled = !validForm;
  modalBtnWarning.style.display = validForm ? 'none' : '';
};

const closeModal = function (e) {
  const target = e.target;
  if (
    target.closest('.modal__close') ||
    target.classList.contains('modal') ||
    e.code === 'Escape' ) {
    modalAdd.classList.add('hide');
    modalItem.classList.add('hide');
    document.removeEventListener('keydown', closeModal);
    modalSubmit.reset();
    modalImageAdd.src = srcModalImage;
    modalFileBtn.textContent = textFileBtn;
    checkForm();
  }
};

const renderModalItem = (e) => {
  modalItem.textContent = '';

  dataBase.forEach((item, i) => {
    if (i === +e) {      
      modalItem.insertAdjacentHTML('beforeend', `   
        <div class="modal__block">
          <h2 class="modal__header">Купить</h2>
          <div class="modal__content">
            <div>
              <img class="modal__image modal__image-item" src="data:image/jpeg;base64,${item.image}" alt="test"/>
            </div>
            <div class="modal__description">
              <h3 class="modal__header-item">${item.nameItem}</h3>
              <p>
                Состояние:
                <span class="modal__status-item">${item.status}</span>
              </p>
              <p>
                Описание:
                <span class="modal__description-item">${item.descriptionItem}</span>
              </p>
              <p>
                Цена:
                <span class="modal__cost-item">${item.costItem} ₽</span>
              </p>
              <button class="btn">Купить</button>
            </div>
          </div>
          <button class="modal__close">&#10008;</button>
        </div>   
      `);
    }
  });
};

const renderCard = () => {
    catalog.textContent = '';
    dataBase.forEach((item, i) => {
        catalog.insertAdjacentHTML('beforeend', `
        <li class="card" data-id="${i}">
            <img class="card__image" src="data:image/jpeg;base64,${item.image}" alt="test" />
            <div class="card__description">
              <h3 class="card__header">${item.nameItem}</h3>
              <div class="card__price">${item.costItem} ₽</div>
            </div>
          </li>        
        `);
    });
};

modalFileInput.addEventListener('change', (event) => {
    const target = event.target;
    const reader = new FileReader();
    const file = target.files[0];

    infoPhoto.filename = file.name;
    infoPhoto.size = file.size;

    reader.readAsBinaryString(file);

    reader.addEventListener('load', (event) => {
        if (infoPhoto.size < 300000) {
            modalFileBtn.textContent = infoPhoto.filename;
            infoPhoto.base64 = btoa(event.target.result);
            modalImageAdd.src = `data:image/jpeg;base64,${infoPhoto.base64}`;
        } else {
            modalFileBtn.textContent = 'Размер файла не должен превыщать 200кб';
            modalFileInput.value = '';
            checkForm();
        }
    });

});

modalSubmit.addEventListener('input', checkForm);

modalSubmit.addEventListener('submit', (event) => {
  event.preventDefault();
  const itemObj = {};
  for (const elem of elementsModalSubmit) {
    itemObj[elem.name] = elem.value;
  }
  itemObj.image = infoPhoto.base64;
  dataBase.push(itemObj);
  closeModal({ target: modalAdd });
  saveDB();
    renderCard();
});

addAd.addEventListener('click', () => {
  modalAdd.classList.remove('hide');
  modalBtnSubmit.disabled = true;
  document.addEventListener('keydown', closeModal);
});
catalog.addEventListener('click', (e) => {
  const target = e.target;
  if (target.closest('.card')) {
    renderModalItem(target.closest('.card').dataset.id);
    modalItem.classList.remove('hide');
    document.addEventListener('keydown', closeModal);
  }
});

modalAdd.addEventListener('click', closeModal);
modalItem.addEventListener('click', closeModal);
renderCard();