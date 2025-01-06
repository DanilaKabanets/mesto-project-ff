const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-29',
    headers: {
        authorization: '382fc823-0b92-407b-a41f-addf43256902',
        'Content-Type': 'application/json'
    }
};

// Проверка ответа от сервера
const checkResponse = (res) => {
    if (res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
};

// Экспортируем функции
export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        headers: config.headers
    })
    .then(checkResponse);
};

export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        headers: config.headers
    })
    .then(checkResponse);
};

export const updateUserInfo = (userData) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            name: userData.name,
            about: userData.about
        })
    })
    .then(checkResponse);
};

// Функция проверки URL изображения
const checkImageUrl = (url) => {
    return fetch(url, {
        method: 'HEAD'
    })
    .then(res => {
        if (!res.ok) {
            return Promise.reject('URL недоступен');
        }
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.startsWith('image/')) {
            return Promise.reject('URL не является изображением');
        }
        return url;
    });
};

// Обновленная функция обновления аватара
export const updateUserAvatar = async (avatarUrl) => {
    await checkImageUrl(avatarUrl);
    
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: config.headers,
        body: JSON.stringify({
            avatar: avatarUrl
        })
    })
    .then(checkResponse);
};

// Функция загрузки и установки начальных данных
export const getInitialData = () => {
    return Promise.all([getUserInfo(), getInitialCards()])
        .then(([userData, cards]) => {
            // Возвращаем объект с данными пользователя и карточками
            return {
                userData: {
                    name: userData.name,
                    about: userData.about,
                    avatar: userData.avatar,
                    _id: userData._id
                },
                cards: cards.map(card => ({
                    name: card.name,
                    link: card.link,
                    likes: card.likes,
                    owner: card.owner,
                    _id: card._id
                }))
            };
        })
        .catch((err) => {
            console.log('Ошибка при получении начальных данных:', err);
            return Promise.reject(err);
        });
};

// Добавляем функцию создания карточки
export const addCard = (cardData) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: 'POST',
        headers: config.headers,
        body: JSON.stringify({
            name: cardData.name,
            link: cardData.link
        })
    })
    .then(checkResponse);
};

export const deleteCard = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(checkResponse);
};

export const addLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}/likes`, {
        method: 'PUT',
        headers: config.headers
    })
    .then(checkResponse);
};

export const removeLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}/likes`, {
        method: 'DELETE',
        headers: config.headers
    })
    .then(checkResponse);
};
