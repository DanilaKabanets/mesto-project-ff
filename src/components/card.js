// Шаблон карточки
const cardTemplate = document.querySelector('#card-template').content;

// DOM узлы
export const placesList = document.querySelector('.places__list');

// Функция обработки лайка
export function handleLike(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

// Функция создания карточки
export function createCard(cardData, { handleDelete, handleLike, handleImageClick }) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardTitle = cardElement.querySelector('.card__title');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    cardImage.addEventListener('click', () => handleImageClick(cardData));
    deleteButton.addEventListener('click', () => handleDelete(cardElement));
    likeButton.addEventListener('click', handleLike);

    return cardElement;
}

// Функция удаления карточки
export function handleDelete(cardElement) {
    cardElement.remove();
}

// Функция рендеринга карточки
export function renderCard(cardData) {
    const cardElement = createCard(cardData, handleDelete, handleLike);
    placesList.append(cardElement);
}
