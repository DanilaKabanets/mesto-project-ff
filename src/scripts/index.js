import '../pages/index.css';
import { createCard, handleLikeCard, handleDeleteCard } from '../components/card.js';
import { openPopup, closePopup, handleOverlayClick, handleEditProfileClick, handleAddCardClick, handleEditAvatarClick, handleEditFormSubmit, handleAvatarFormSubmit, handleAddCardFormSubmit } from '../components/modal.js';
import { validationConfig, validation } from '../components/validation.js';
import { getInitialData } from '../components/api.js';

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
let cardToDelete;
let cardIdToDelete;

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
    placesList.prepend(cardElement);
}

function handleImageClick(cardData) {
    imagePopupPicture.src = cardData.link;
    imagePopupPicture.alt = cardData.name;
    imagePopupCaption.textContent = cardData.name;
    openPopup(imagePopup);
}



// Инициализация обработчиков
function setEventListeners() {
    // Обработчики кнопок открытия попапов
    editProfileButton.addEventListener('click', () => 
        handleEditProfileClick(nameInput, jobInput, profileTitle, profileDescription, editPopup, editForm, validationConfig)
    );
    addCardButton.addEventListener('click', () => 
        handleAddCardClick(addCardForm, addCardPopup, validationConfig)
    );
    profileImage.addEventListener('click', () => 
        handleEditAvatarClick(avatarInput, editAvatarPopup, editAvatarForm, validationConfig)
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
        cards.forEach(card => renderCard(card));
    })
    .catch((err) => {
        console.log(`Ошибка при инициализации страницы: ${err}`);
    });

// Включаем валидацию и обработчики
setEventListeners();
validation(validationConfig);