// Экспортируем функцию enableValidation под именем validation
export { enableValidation as validation, clearValidationErrors };


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
    if (!inputElement.validity.valid) {
        let errorMessage = '';
        
        if (inputElement.validity.valueMissing) {
            errorMessage = inputElement.dataset.errorEmpty;
        } else if (inputElement.validity.tooShort || inputElement.validity.tooLong) {
            errorMessage = inputElement.dataset.errorLength;
        } else if (inputElement.validity.patternMismatch || inputElement.validity.typeMismatch) {
            errorMessage = inputElement.dataset.errorMessage;
        }
        
        inputElement.setCustomValidity(errorMessage);
        showingInputError(formElement, inputElement, validationConfig);
    } else {
        inputElement.setCustomValidity('');
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