import { addLike, removeLike } from './api.js';

// Находим template элемент карточки
const cardTemplate = document.querySelector('#card-template').content;

export function handleLikeCard(likeButton, cardElement, likeCount) {
    const cardId = cardElement.dataset.cardId;
    const isLiked = likeButton.classList.contains('card__like-button_is-active');

    // Отправляем запрос на добавление/удаление лайка
    (isLiked ? removeLike(cardId) : addLike(cardId))
        .then((updatedCard) => {
            likeButton.classList.toggle('card__like-button_is-active');
            likeCount.textContent = updatedCard.likes.length;
        })
        .catch((err) => console.log(`Ошибка при обработке лайка: ${err}`));
}


export function createCard(cardData, { handleDeleteCard, handleLikeCard, handleImageClick }) {
    // Клонируем template карточки
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    
    // Находим все элементы карточки
    const cardImage = cardElement.querySelector('.card__image');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCount = cardElement.querySelector('.card__like-count');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardTitle = cardElement.querySelector('.card__title');

    // Устанавливаем данные карточки
    cardElement.dataset.cardId = cardData._id;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    likeCount.textContent = cardData.likes.length;

    // Проверяем, поставил ли текущий пользователь лайк
    if (cardData.likes.some(user => user._id === cardData.currentUserId)) {
        likeButton.classList.add('card__like-button_is-active');
    }

    // Добавляем обработчики событий
    cardImage.addEventListener('click', () => handleImageClick(cardData));
    likeButton.addEventListener('click', () => handleLikeCard(likeButton, cardElement, likeCount));

    // Показываем кнопку удаления только для карточек текущего пользователя
    if (cardData.owner._id !== cardData.currentUserId) {
        deleteButton.style.display = 'none';
    } else {
        deleteButton.addEventListener('click', () => handleDeleteCard(cardElement, cardData._id));
    }

    return cardElement;
}

