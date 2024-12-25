// Функции для работы с модальными окнами
export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscClose);
}

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscClose);
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