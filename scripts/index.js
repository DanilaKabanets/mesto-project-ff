// Шаблон карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const placesList = document.querySelector('.places__list');

// Функция создания карточки
function createCard(cardData, removeCard) {
    const cardElement = cardTemplate.cloneNode(true).querySelector('.places__item');

    cardElement.querySelector('.card__image').src = cardData.link;
    cardElement.querySelector('.card__image').alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', removeCard);

    return cardElement;
}

// Функция удаления карточки
function removeCard(event) {
    event.target.closest('.places__item').remove();
}

// Функция рендеринга карточки
function renderCard(cardData) {
    const cardElement = createCard(cardData, removeCard);
    placesList.append(cardElement);
}

// Вывод всех карточек на страницу
initialCards.forEach(renderCard);