let input = document.querySelector("#phone-number");
let phoneNumberClass = document.querySelector(".phoneNumber");
let nameInput = document.querySelector("#name");
let surnameInput = document.querySelector("#surname");
let emailInput = document.querySelector("#email");

// Функция phoneInput создана для фильтрации Телефонного Кода

const phoneInput = intlTelInput(input, {
  separateDialCode: true, // это для отоброжение телефонного кода
  utilsScript:
    "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js", // Это для скрипты для библиотеки intlTelInput
  preferredCountries: ["us", "gb", "br", "ru", "kz", "cn", "jp"], // Здесь храняться рекомендуемые страны для ввода телефона
  initialCountry: "auto", //  Узнает у geoIpLookup и ставит автоматически телефонный код
  geoIpLookup: getIp, // Проверка ip
});
// let iti = window.intlTelInputGlobals.getInstance(phoneInput);

// Эта функция для отправки Данных формы

// ipinfo сайт для распознования айадресов пользователя ниже представленн код

function getIp(callback) {
  // https://ipinfo.io/json?token=ec6da7b603f3b6 вместо ec6da7b603f3b6 вставляете свой токен на сайте https://ipinfo.io/

  fetch("https://ipinfo.io/json?token=ec6da7b603f3b6", {
    headers: { Accept: "application/json" },
  })
    .then((resp) => resp.json())
    .catch(() => {
      return {
        country: "us",
      };
    })
    .then((resp) => callback(resp.country));
}

function isValidNameSurname(value) {
  let regex = /^[A-Za-zА-Яа-я\s]{2,}$/;
  return regex.test(value);
}

function isValidEmail(value) {
  let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(value);
}

const resInput = (e) => {
    e.preventDefault();
    const phoneNumber = phoneInput.getNumber();
    const valid = phoneInput.isValidNumber();
    
    // Удаляем все старые сообщения об ошибках
    document.querySelectorAll('.error-message').forEach(el => el.remove());

    let hasErrors = false;

    if (!valid) {
        phoneNumberClass.insertAdjacentHTML("afterend","<p class='error-message'>Некоректный номер телефона</p>");
        hasErrors = true;
    }
    if (!isValidNameSurname(nameInput.value)) {
        nameInput.insertAdjacentHTML("afterend", "<p class='error-message'>Имя должно быть не менее двух символов</p>");
        hasErrors = true;
    }
    if (!isValidNameSurname(surnameInput.value)) {
        surnameInput.insertAdjacentHTML("afterend", "<p class='error-message'>Фамилия должно быть не менее двух символов</p>");
        hasErrors = true;
    }
    if (!isValidEmail(emailInput.value)) {
        emailInput.insertAdjacentHTML("afterend","<p class='error-message'>Некоректная почта</p>");
        hasErrors = true;
    }

    if (hasErrors) {
        return;  // Прекратим выполнение функции, если есть ошибки
    }

    const data = `${nameInput.value},${surnameInput.value},${emailInput.value},${phoneNumber}`;
    let CheckDuble = localStorage.getItem("myDataKey");
    if(data !== CheckDuble){
        localStorage.setItem("myDataKey", data);
        alert("Поздравляем, вы отправили форму! >:D")
    } else {
        document.querySelector("button").insertAdjacentHTML("afterend", "<p class='error-message'>Дубликат данных уже существует!</p>");
    }
};
