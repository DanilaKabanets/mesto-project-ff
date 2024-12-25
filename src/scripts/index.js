import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, handleDelete, handleLike } from '../components/card.js';
import { openPopup, closePopup, handleOverlayClick } from '../components/modal.js';

// DOM элементы попапов
const editPopup = document.querySelector('.popup_type_edit');
const addCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup = document.querySelector('.popup_type_image');
const popups = [editPopup, addCardPopup, imagePopup];

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

// Функции работы с карточками
function renderCard(cardData) {
    const cardElement = createCard(cardData, {
        handleDelete,
        handleLike,
        handleImageClick
    });
    placesList.prepend(cardElement);
}

function createNewCard(name, link) {
    return { name, link };
}

// Функции реализации попапа  изображением
export function handleImageClick(cardData) {
    imagePopupPicture.src = cardData.link;
    imagePopupPicture.alt = cardData.name;
    imagePopupCaption.textContent = cardData.name;
    openPopup(imagePopup);
}

// Функции работы с формой редактирования профиля
function fillEditProfileForm() {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
}

function handleEditProfileClick() {
    fillEditProfileForm();
    openPopup(editPopup);
}

function saveProfileData() {
    profileTitle.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
}

// Функции работы с формой добавления карточки
function resetAddCardForm() {
    addCardForm.reset();
}

function handleAddCardClick() {
    resetAddCardForm();
    openPopup(addCardPopup);
}

// Обработчики отправки форм
function handleEditFormSubmit(evt) {
    evt.preventDefault();
    saveProfileData();
    closePopup(editPopup);
}

function handleAddCardFormSubmit(evt) {
    evt.preventDefault();
    const cardData = createNewCard(placeNameInput.value, placeLinkInput.value);
    renderCard(cardData);
    closePopup(addCardPopup);
    resetAddCardForm();
}

// Добавление обработчиков
editProfileButton.addEventListener('click', handleEditProfileClick);
addCardButton.addEventListener('click', handleAddCardClick);
editForm.addEventListener('submit', handleEditFormSubmit);
addCardForm.addEventListener('submit', handleAddCardFormSubmit);

// Добавление обработчиков закрытия на все попапы
popups.forEach(popup => {
    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', () => closePopup(popup));
    popup.addEventListener('mousedown', handleOverlayClick);
});

// Инициализация карточек
initialCards.forEach(renderCard);