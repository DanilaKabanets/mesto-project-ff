import '../pages/index.css';
import { createCard, handleLikeCard } from '../components/card.js';
import { openPopup, closePopup, handleOverlayClick } from '../components/modal.js';
import { validation, clearValidationErrors } from '../components/validation.js';
import { getInitialData, deleteCard, addCard, updateUserInfo, updateUserAvatar } from '../components/api.js';

// Конфигурация валидации
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

// DOM элементы попапов
const editPopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const editAvatarPopup = document.querySelector('.popup_type_edit-avatar');
const editAvatarForm = editAvatarPopup.querySelector('.popup__form');
const avatarInput = editAvatarForm.querySelector('.popup__input_type_url');
const profileImage = document.querySelector('.profile__image');
const deleteCardPopup = document.querySelector('.popup_type_delete-card');
const popups = [editPopup, addCardPopup, imagePopup, editAvatarPopup, deleteCardPopup];

// DOM элементы форм
const editForm = editPopup.querySelector('.popup__form');
const addCardForm = addCardPopup.querySelector('.popup__form');
const nameInput = editForm.querySelector('.popup__input_type_name');
const jobInput = editForm.querySelector('.popup__input_type_description');
const placeNameInput = addCardForm.querySelector('.popup__input_type_card-name');
const placeLinkInput = addCardForm.querySelector('.popup__input_type_url');

// DOM элементы профиля
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const editProfileButton = document.querySelector('.profile__edit-button');
const addCardButton = document.querySelector('.profile__add-button');

// DOM элементы изображения
const imagePopupPicture = imagePopup.querySelector('.popup__image');
const imagePopupCaption = imagePopup.querySelector('.popup__caption');

// DOM элемент списка карточек
const placesList = document.querySelector('.places__list');

let userId;

// Функции работы с карточками
function renderCard(cardData) {
    const cardElement = createCard({
        ...cardData,
        currentUserId: userId
    }, {
        handleDeleteCard,
        handleLikeCard,
        handleImageClick
    });
    return cardElement;
}

function handleImageClick(cardData) {
    imagePopupPicture.src = cardData.link;
    imagePopupPicture.alt = cardData.name;
    imagePopupCaption.textContent = cardData.name;
    openPopup(imagePopup);
}

// Функция обработки отправки формы удаления карточки
function handleDeleteFormSubmit(evt, cardElement, cardId, deletePopup) {
    evt.preventDefault();
    const submitButton = evt.submitter;
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

// Функция открытия попапа удаления карточки
function handleDeleteCard(cardElement, cardId) {
    const deletePopup = document.querySelector('.popup_type_delete-card');
    const deleteForm = deletePopup.querySelector('.popup__form');
    
    deleteForm.onsubmit = (evt) => {
        handleDeleteFormSubmit(evt, cardElement, cardId, deletePopup);
        deleteForm.onsubmit = null; // очищаем обработчик после использования
        return false; // предотвращаем стандартное поведение формы
    };
    
    openPopup(deletePopup);
}

// Инициализация обработчиков
function setEventListeners() {
    // Обработчики кнопок открытия попапов
    editProfileButton.addEventListener('click', () => 
        handleEditProfileClick(nameInput, jobInput, profileTitle, profileDescription, editPopup, editForm, clearValidationErrors)
    );
    addCardButton.addEventListener('click', () => 
        handleAddCardClick(addCardForm, addCardPopup, clearValidationErrors)
    );
    profileImage.addEventListener('click', () => 
        handleEditAvatarClick(avatarInput, editAvatarPopup, editAvatarForm, clearValidationErrors)
    );

    // Обработчики форм
    editForm.addEventListener('submit', (evt) => handleEditFormSubmit(evt, { nameInput, jobInput, profileTitle, profileDescription, editPopup }));
    addCardForm.addEventListener('submit', (evt) => 
        handleAddCardFormSubmit(evt, {
            placeNameInput,
            placeLinkInput,
            addCardPopup,
            addCardForm,
            renderCard
        })
    );
    editAvatarForm.addEventListener('submit', (evt) => handleAvatarFormSubmit(evt, { avatarInput, profileImage, editAvatarPopup, editAvatarForm }));

    // Обработчики закрытия попапов
    popups.forEach(popup => {
        const closeButton = popup.querySelector('.popup__close');
        closeButton.addEventListener('click', () => closePopup(popup));
        popup.addEventListener('mousedown', handleOverlayClick);
    });
}

// Инициализация страницы
getInitialData()
    .then(({ userData, cards }) => {
        userId = userData._id;
        profileTitle.textContent = userData.name;
        profileDescription.textContent = userData.about;
        profileImage.style.backgroundImage = `url('${userData.avatar}')`;
        cards.forEach(cardData => {
            const cardElement = renderCard(cardData);
            placesList.append(cardElement);
        });
    })
    .catch((err) => {
        console.log(`Ошибка при инициализации страницы: ${err}`);
    });

// Включаем валидацию и обработчики
setEventListeners();
validation(validationConfig);

function handleEditFormSubmit(evt, { nameInput, jobInput, profileTitle, profileDescription, editPopup }) {
    evt.preventDefault();
    const submitButton = evt.submitter;
    submitButton.textContent = 'Сохранение...';
    
    updateUserInfo({
        name: nameInput.value,
        about: jobInput.value
    })
        .then((userData) => {
            profileTitle.textContent = userData.name;
            profileDescription.textContent = userData.about;
            closePopup(editPopup);
        })
        .catch((err) => {
            console.log(`Ошибка при обновлении профиля: ${err}`);
        })
        .finally(() => {
            submitButton.textContent = 'Сохранить';
        });
}

function handleEditProfileClick(nameInput, jobInput, profileTitle, profileDescription, editPopup, editForm, clearErrors) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    clearErrors(editForm, validationConfig);
    openPopup(editPopup);
}

function handleAddCardClick(addCardForm, addCardPopup, clearErrors) {
    const submitButton = addCardForm.querySelector(validationConfig.submitButtonSelector);
    addCardForm.reset();
    clearErrors(addCardForm, validationConfig);
    submitButton.classList.add(validationConfig.inactiveButtonClass);
    submitButton.disabled = true;
    openPopup(addCardPopup);
}

function handleEditAvatarClick(avatarInput, editAvatarPopup, editAvatarForm, clearErrors) {
    const submitButton = editAvatarForm.querySelector(validationConfig.submitButtonSelector);
    avatarInput.value = '';
    clearErrors(editAvatarForm, validationConfig);
    submitButton.classList.add(validationConfig.inactiveButtonClass);
    submitButton.disabled = true;
    openPopup(editAvatarPopup);
}

function handleAddCardFormSubmit(evt, { placeNameInput, placeLinkInput, addCardPopup, addCardForm, renderCard }) {
    evt.preventDefault();
    const submitButton = evt.submitter;
    submitButton.textContent = 'Сохранение...';
    
    addCard({
        name: placeNameInput.value,
        link: placeLinkInput.value
    })
        .then((newCard) => {
            const cardElement = renderCard(newCard);
            placesList.prepend(cardElement);
            closePopup(addCardPopup);
            addCardForm.reset();
        })
        .catch((err) => {
            console.log(`Ошибка при добавлении карточки: ${err}`);
        })
        .finally(() => {
            submitButton.textContent = 'Создать';
        });
}
function handleAvatarFormSubmit(evt, { avatarInput, profileImage, editAvatarPopup, editAvatarForm }) {
    evt.preventDefault();
    const submitButton = evt.submitter;
    submitButton.textContent = 'Сохранение...';
    
    updateUserAvatar(avatarInput.value)
        .then((userData) => {
            profileImage.style.backgroundImage = `url('${userData.avatar}')`;
            closePopup(editAvatarPopup);
            editAvatarForm.reset();
        })
        .catch((err) => {
            console.log(`Ошибка при обновлении аватара: ${err}`);
        })
        .finally(() => {
            submitButton.textContent = 'Сохранить';
        });
}