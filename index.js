const formFeedbackElement = document.querySelector("#popup__form-feedback");

const phoneInput = document.querySelector("#input_phone");
const emailInput = document.querySelector("#input_email");
const nameInput = document.querySelector("#input_name");
const checkboxInput = document.querySelector("#input_checkbox");
const customCheckbox = document.querySelector("#custom-checkbox");

const openPopup = document.querySelector("#button-order-call");
const closePopup = document.querySelector("#popup_button-close");
const overlayPopup = document.querySelector("#overlay_popup");

const popupOrderCall = document.querySelector("#popup_order-call");
const popupContainer = document.querySelector("#popup__container");

const sendButton = document.querySelector("#send-button");

// Маска для номера телефона
$("#input_phone").mask("+7 (999) 999-99-99");

// Открытие модального окна
openPopup.onclick = () => {
  popupOrderCall.classList.add("popup_open");
};

// Закрытие модального окна
closePopup.onclick = () => {
  popupOrderCall.classList.remove("popup_open");
};

overlayPopup.onclick = () => {
  popupOrderCall.classList.remove("popup_open");
};

// Валидация инпутов

phoneInput.onfocus = (e) => {
  if (e.target.value === "") e.target.value = "+7";
};

phoneInput.onblur = (e) => {
  const value = e.target.value;
  if (!/[+]+[7]+ [(][0-9]{3}[)] +[0-9]{3}-[0-9]{2}-[0-9]{2}/i.test(value)) {
    phoneInput.classList.add("popup__input_error");
  } else {
    phoneInput.classList.remove("popup__input_error");
  }
  if (value === "+7") e.target.value = "";
};

emailInput.onblur = (e) => {
  const value = e.target.value;
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
    emailInput.classList.add("popup__input_error");
  } else {
    emailInput.classList.remove("popup__input_error");
  }
};

nameInput.onblur = (e) => {
  const value = e.target.value;
  if (!/^[A-ZА-Я]{2,20}$/i.test(value)) {
    nameInput.classList.add("popup__input_error");
  } else {
    nameInput.classList.remove("popup__input_error");
  }
};

formFeedbackElement.onsubmit = (e) => {
  e.preventDefault();
  console.log(serializeForm(formFeedbackElement));
};

function serializeForm(formNode) {
  const { elements } = formNode;
  const data = {};
  Array.from(elements)
    .filter((item) => !!item.name)
    .map((element) => {
      data[element.name] = element.value;
    });
  return data;
}

popupContainer.onmousedown = function (event) {
  event.stopPropagation();
  // Запоминаем позицию клика и контейнера
  const posClick = event.clientY;
  const posStart = popupContainer.getBoundingClientRect().top;

  // Вычисляем смещение от клика до контейнера
  let shiftY = event.clientY - popupContainer.getBoundingClientRect().top;

  // Доюавляем абсолютное позиционирование
  popupContainer.style.position = "absolute";

  // Функция перемещения контейнера
  function onMouseMove(event) {
    if (event.pageY - posClick > 0)
      popupContainer.style.top = event.pageY - shiftY + "px";
  }

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);

  // popupContainer.onmouse

  // После отжатия мыши, удаляем слушатель, возвращаем все на первоночальную позицию
  function onMouseUp(event) {
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);

    if (event.pageY - posClick > 100) {
      popupOrderCall.classList.remove("popup_open");
      setTimeout(() => {
        popupContainer.style.top = posStart + "px";
      }, 500);
    } else {
      popupContainer.style.top = posStart + "px";
    }
  }
};

[phoneInput, emailInput, nameInput, sendButton].map((elem) => {
  elem.onmousedown = (event) => event.stopPropagation();
});
