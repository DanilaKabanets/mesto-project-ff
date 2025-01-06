import { updateUserInfo, updateUserAvatar, addCard } from './api.js';
import { clearValidationErrors } from './validation.js';

// Функции для работы с модальными окнами
export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscClose);
}

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscClose);
}

// Функция для открытия попапов с формами
export function openFormPopup(popup, form, validationConfig) {
    clearValidationErrors(form, validationConfig);
    openPopup(popup);
}

// Обработчики форм
export function handleEditFormSubmit(evt, { nameInput, jobInput, profileTitle, profileDescription, editPopup }) {
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

export function handleAvatarFormSubmit(evt, { avatarInput, profileImage, editAvatarPopup, editAvatarForm }) {
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

// Обработчики открытия попапов
export function handleEditProfileClick(nameInput, jobInput, profileTitle, profileDescription, editPopup, editForm, validationConfig) {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;
    openFormPopup(editPopup, editForm, validationConfig);
}

export function handleAddCardClick(addCardForm, addCardPopup, validationConfig) {
    addCardForm.reset();
    openFormPopup(addCardPopup, addCardForm, validationConfig);
}

export function handleEditAvatarClick(avatarInput, editAvatarPopup, editAvatarForm, validationConfig) {
    avatarInput.value = '';
    openFormPopup(editAvatarPopup, editAvatarForm, validationConfig);
}

export function handleAddCardFormSubmit(evt, { placeNameInput, placeLinkInput, addCardPopup, addCardForm, renderCard }) {
    evt.preventDefault();
    const submitButton = evt.submitter;
    submitButton.textContent = 'Сохранение...';
    
    addCard({
        name: placeNameInput.value,
        link: placeLinkInput.value
    })
        .then((newCard) => {
            renderCard(newCard);
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

// Обработчик закрытия попапа
function handleEscClose(evt) {
    if (evt.key === 'Escape') {
        const openedPopup = document.querySelector('.popup_is-opened');
        if (openedPopup) {
            closePopup(openedPopup);
        }
    }
}

export function handleOverlayClick(evt) {
    if (evt.target.classList.contains('popup')) {
        closePopup(evt.target);
    }
} 