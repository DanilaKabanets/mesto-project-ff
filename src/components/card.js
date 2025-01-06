import { addLike, removeLike, deleteCard } from './api.js';
import { openPopup, closePopup } from './modal.js';

// Шаблон карточки
const cardTemplate = document.querySelector('#card-template').content;

// Функция обработки лайка
export function handleLikeCard(evt) {
    const likeButton = evt.target;
    const cardElement = likeButton.closest('.card');
    const cardId = cardElement.dataset.cardId;
    const likeCount = cardElement.querySelector('.card__like-count');
    const isLiked = likeButton.classList.contains('card__like-button_is-active');

    (isLiked ? removeLike(cardId) : addLike(cardId))
        .then((updatedCard) => {
            likeButton.classList.toggle('card__like-button_is-active');
            likeCount.textContent = updatedCard.likes.length;
        })
        .catch((err) => console.log(`Ошибка при обработке лайка: ${err}`));
}

// Функция создания карточки
export function createCard(cardData, { handleDeleteCard, handleLikeCard, handleImageClick }) {
    const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
    const cardImage = cardElement.querySelector('.card__image');
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCount = cardElement.querySelector('.card__like-count');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardTitle = cardElement.querySelector('.card__title');

    cardElement.dataset.cardId = cardData._id;
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
    likeCount.textContent = cardData.likes.length;

    // Проверяем, есть ли наш лайк на карточке
    if (cardData.likes.some(user => user._id === cardData.currentUserId)) {
        likeButton.classList.add('card__like-button_is-active');
    }

    cardImage.addEventListener('click', () => handleImageClick(cardData));
    likeButton.addEventListener('click', handleLikeCard);

    // Показываем кнопку удаления только для своих карточек
    if (cardData.owner._id !== cardData.currentUserId) {
        deleteButton.style.display = 'none';
    } else {
        deleteButton.addEventListener('click', () => handleDeleteCard(cardElement, cardData._id));
    }

    return cardElement;
}

export function handleDeleteCard(cardElement, cardId) {
    const deletePopup = document.querySelector('.popup_type_delete-card');
    const deleteForm = deletePopup.querySelector('.popup__form');
    const submitButton = deletePopup.querySelector('.popup__button_type_confirm');
    
    function handleSubmit(evt) {
        evt.preventDefault();
        submitButton.textContent = 'Удаление...';
        
        deleteCard(cardId)
            .then(() => {
                cardElement.remove();
                closePopup(deletePopup);
            })
            .catch((err) => console.log(`Ошибка при удалении карточки: ${err}`))
            .finally(() => {
                submitButton.textContent = 'Да';
            });
    }

    deleteForm.addEventListener('submit', handleSubmit, { once: true });
    openPopup(deletePopup);
}
