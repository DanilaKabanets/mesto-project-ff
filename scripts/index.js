const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
const placesList = document.querySelector('.places__list');

//Функция создания карточки
function cardCreate(cardTitle, cardImg) {

    const cardElement = cardTemplate.cloneNode(true).querySelector('.places__item');

    cardElement.querySelector('.card__image').src = cardImg;
    cardElement.querySelector('.card__image').alt = cardTitle;
    cardElement.querySelector('.card__title').textContent = cardTitle;

    const deleteButton = cardElement.querySelector('.card__delete-button');
    deleteButton.addEventListener('click', function () {
        const listItem = deleteButton.closest('.places__item');
        listItem.remove();
    });
    
    placesList.append(cardElement);
};

// Вывести карточки на страницу
initialCards.forEach(function (elem) {
    cardCreate(elem.name, elem.link);
});
