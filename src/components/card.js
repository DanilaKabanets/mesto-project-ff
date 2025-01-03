// Шаблон карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция обработки лайка
export function handleLikeCard(evt) {
    evt.target.classList.toggle('card__like-button_is-active');
}

// Функция создания карточки
export function createCard(cardData, { handleDeleteCard, handleLikeCard, handleImageClick }) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardTitle = cardElement.querySelector('.card__title');

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;

    cardImage.addEventListener('click', () => handleImageClick(cardData));
    deleteButton.addEventListener('click', () => handleDeleteCard(cardElement));
    likeButton.addEventListener('click', handleLikeCard);

    return cardElement;
}

// Функция удаления карточки
export function handleDeleteCard(cardElement) {
    cardElement.remove();
}