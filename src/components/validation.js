// Экспортируем функцию enableValidation под именем validation
export { enableValidation as validation, clearValidationErrors };

// Объект с настройками валидации - содержит все необходимые селекторы и классы
export const validationConfig = {
    formSelector: '.popup__form',           // селектор для форм
    inputSelector: '.popup__input',         // селектор для полей ввода
    submitButtonSelector: '.popup__button', // селектор для кнопки отправки
    inactiveButtonClass: 'popup__button_disabled', // класс для неактивной кнопки
    inputErrorClass: 'popup__input_type_error',    // класс для поля с ошибкой
    errorClass: 'popup__error_visible'      // класс для отображения сообщения об ошибке
};

// Функция создания элемента ошибки
const createErrorElement = (formElement, inputElement) => {
    const errorElement = document.createElement('span');
    errorElement.classList.add('popup__error');
    errorElement.id = `${inputElement.name}-error`;
    // Вставляем после input
    inputElement.after(errorElement);
    return errorElement;
};

// Функция для отображения ошибки ввода
const showingInputError = (formElement, inputElement, validationConfig) => {
    // Находим элемент для отображения ошибки по имени поля
    let errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    // Если элемент не существует, создаем его
    if (!errorElement) {
        errorElement = createErrorElement(formElement, inputElement);
    }
    // Добавляем класс ошибки к полю ввода
    inputElement.classList.add(validationConfig.inputErrorClass);
    // Добавляем класс для отображения ошибки
    errorElement.classList.add(validationConfig.errorClass);
    // Устанавливаем текст ошибки
    errorElement.textContent = inputElement.validationMessage;
};

// Функция для скрытия ошибки ввода
const hidingInputError = (formElement, inputElement, validationConfig) => {
    // Находим элемент для отображения ошибки по имени поля
    const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
    // Проверяем существование элемента ошибки
    if (errorElement) {
        // Убираем класс ошибки с поля ввода
        inputElement.classList.remove(validationConfig.inputErrorClass);
        // Убираем класс для отображения ошибки
        errorElement.classList.remove(validationConfig.errorClass);
        // Очищаем текст ошибки
        errorElement.textContent = "";
    }
};

// Функция для проверки валидности поля ввода
const checkInputValidity = (formElement, inputElement, validationConfig) => {
    const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s\-]+$/;
    const urlRegex = /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

    const validationRules = {
        'edit-profile': {
            'name': {
                minLength: 2,
                maxLength: 40,
                regex: nameRegex,
                messages: {
                    empty: 'Вы пропустили это поле.',
                    length: 'Имя должно быть от 2 до 40 символов.',
                    pattern: 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы.'
                }
            },
            'description': {
                minLength: 2,
                maxLength: 200,
                regex: nameRegex,
                messages: {
                    empty: 'Вы пропустили это поле.',
                    length: 'Описание должно быть от 2 до 200 символов.',
                    pattern: 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы.'
                }
            }
        },
        'new-place': {
            'place-name': {
                minLength: 2,
                maxLength: 30,
                regex: nameRegex,
                messages: {
                    empty: 'Вы пропустили это поле.',
                    length: 'Название должно быть от 2 до 30 символов.',
                    pattern: 'Разрешены только латинские, кириллические буквы, знаки дефиса и пробелы.'
                }
            },
            'link': {
                regex: urlRegex,
                messages: {
                    empty: 'Введите адрес сайта.',
                    pattern: 'Введите адрес сайта.'
                }
            }
        },
        'edit-avatar': {
            'avatar': {
                regex: urlRegex,
                messages: {
                    empty: 'Вы пропустили это поле.',
                    pattern: 'Введите корректный адрес изображения изображения.'
                }
            }
        }
    };

    const formName = formElement.getAttribute('name');
    const inputName = inputElement.name;
    const rules = validationRules[formName]?.[inputName];

    if (rules) {
        inputElement.setCustomValidity('');

        if (inputElement.value.length === 0) {
            inputElement.setCustomValidity(rules.messages.empty);
        } else if (rules.minLength && (inputElement.value.length < rules.minLength || inputElement.value.length > rules.maxLength)) {
            inputElement.setCustomValidity(rules.messages.length);
        } else if (!rules.regex.test(inputElement.value)) {
            inputElement.setCustomValidity(rules.messages.pattern);
        }
    }

    if (!inputElement.validity.valid) {
        showingInputError(formElement, inputElement, validationConfig);
    } else {
        hidingInputError(formElement, inputElement, validationConfig);
    }
};

// Переключает состояние кнопки отправки
const toggleButtonState = (inputList, buttonElement, validationConfig) => {
    // Проверяем валидность всех полей
    const hasInvalidInput = inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });

    if (hasInvalidInput) {
        buttonElement.disabled = true;
        buttonElement.classList.add(validationConfig.inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(validationConfig.inactiveButtonClass);
    }
};

// Установка слушателей событий для всех инпутов формы
const setFormValidationListeners = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    // Устанавливаем начальное состояние кнопки
    toggleButtonState(inputList, buttonElement, validationConfig);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, validationConfig);
            toggleButtonState(inputList, buttonElement, validationConfig);
        });
    });
};

// Включает валидацию для всех форм на странице
const enableValidation = (validationConfig) => {
    // Находим все формы на странице
    const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
    // Для каждой формы устанавливаем слушатели
    formList.forEach((formElement) => {
        setFormValidationListeners(formElement, validationConfig);
    });
};

const clearValidationErrors = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    inputList.forEach((inputElement) => {
        hidingInputError(formElement, inputElement, validationConfig);
    });
};