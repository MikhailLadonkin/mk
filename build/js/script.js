let openFormButton = document.querySelector(".button__open-form");
let popup = document.querySelector(".popup");
let close = document.querySelector(".popup-close");
let closeExtra = document.querySelector(".popup-close-extra");
let emailInput = document.querySelector(".email__input");
let nicknameInput = document.querySelector(".nickname__input");
let passwordInput = document.querySelector(".password__input-first");
let confirmPasswordInput = document.querySelector(".password-confirm");
let itemsCountRule = document.querySelector(".first-rule");
let lettersRule = document.querySelector(".third-rule");
let numbersRule = document.querySelector(".second-rule");
let submitButton = document.querySelector(".button-send");
let extraInfoForm = document.querySelector(".popup__form-extra");
let json;
let jsonAll;

// Валидация поля email адреса

let validateEmail = function () {
	let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
	let emailAddress = emailInput.value;
	let errorMessage;

	if (reg.test(emailAddress) == false) {
	  errorMessage = "Адрес электронной почты должен содержать '@', а также доменное имя"
	} 

	if (errorMessage) {
		emailInput.setCustomValidity(errorMessage);
		emailInput.style.border = "1px solid red";
		emailInput.reportValidity();
	} else {
			emailInput.style.border = "1px solid #DDDDDD";
			emailInput.setCustomValidity('');
	}
}

emailInput.addEventListener("change", validateEmail);

// Валидация поля никнейма

let validateNickname = function () {
	let nicknameErrorMessage;
	let nicknameValue = nicknameInput.value;
	let symbolsArray = nicknameValue ? nicknameValue.split('') : [];
	let regNickname = /[A-Za-z0-9_;]/;
	let regFirstLetter = /[A-Za-z]/;

	symbolsArray.forEach(function (symbol) {
		if (symbolsArray.length > 40 || symbolsArray.length < 3) {
		nicknameErrorMessage = "Никнейм должен содержать от 3 до 40 символов";
		} else if (regFirstLetter.test(symbolsArray[0]) == false) {
		nicknameErrorMessage = "Никнейм может начинаться только с буквы";
		} else if (regNickname.test(symbol) == false) {
		nicknameErrorMessage = "Никнейм может содержать только латинские буквы, цифры, символ подчёркивания(_), символ (;)";
		}
	})

	if (nicknameErrorMessage) {
		nicknameInput.setCustomValidity(nicknameErrorMessage);
		nicknameInput.style.border = "1px solid red";
		nicknameInput.reportValidity();
	} else {
			nicknameInput.style.border = "1px solid #DDDDDD";
			nicknameInput.setCustomValidity('');
	}
}

nicknameInput.addEventListener("change", validateNickname);

let validateNicknameUnicity = function () {
	if (nicknameInput.value !== passwordInput.value) {
		document.querySelector(".password-error").classList.add("hidden");
	}
}

nicknameInput.addEventListener("input", validateNicknameUnicity);

// Валидация поля пароля

let validatePassword = function () {
	let passwordErrorMessage;
	let passwordValue = passwordInput.value;
	let passwordSymbols = passwordValue ? passwordValue.split('') : [];
	let regBigLetters = /[A-Z]/;
	let regSmallLetters = /[a-z]/;
	let regNumbers = /[0-9]/;

	passwordSymbols.forEach(function (item) {
		if (passwordSymbols.length < 6 || passwordSymbols.length > 32) {
			if (itemsCountRule.classList.contains("rule-ok")) {
				passwordErrorMessage = "Пароль должен содержать от 6 до 32 символов";
				itemsCountRule.classList.remove("rule-ok");
				itemsCountRule.classList.add("rule-error");
			}
		} else if (passwordSymbols.length > 6 || passwordSymbols.length < 32) {
			itemsCountRule.classList.remove("rule-error");
			itemsCountRule.classList.add("rule-ok");
		} 
	})

	if (regBigLetters.test(passwordValue) == false || regSmallLetters.test(passwordValue) == false) {
		if (lettersRule.classList.contains("rule-ok")) {
			passwordErrorMessage = "Пароль должен содержать минимум по одной заглавной и строчной букве";
			lettersRule.classList.remove("rule-ok");
			lettersRule.classList.add("rule-error");
		}
	} else if (regBigLetters.test(passwordValue) == true || regSmallLetters.test(passwordValue) == true) {
		lettersRule.classList.remove("rule-error");
		lettersRule.classList.add("rule-ok");
	} 

	if (regNumbers.test(passwordValue) == false) {
		if (numbersRule.classList.contains("rule-ok")) {
			passwordErrorMessage = "Пароль должен содержать минимум одну цифру";
			numbersRule.classList.remove("rule-ok");
			numbersRule.classList.add("rule-error");
		}
	} else if (regNumbers.test(passwordValue) == true) {
		numbersRule.classList.remove("rule-error");
		numbersRule.classList.add("rule-ok");
	} 

	if (passwordValue === emailInput.value && passwordValue.length > 1) {
		passwordErrorMessage = "Пароль не должен совпадать с почтовым адресом";
	}

	if (passwordValue === nicknameInput.value && passwordValue.length > 1) {
		document.querySelector(".password-error").classList.remove("hidden");
		passwordInput.style.border = "1px solid red";
		passwordInput.reportValidity();
	} else if (passwordValue !== nicknameInput.value && !document.querySelector(".password-error").classList.contains("hidden")) {
		document.querySelector(".password-error").classList.add("hidden");
		passwordInput.style.border = "1px solid #DDDDDD";
	}	

	if (passwordValue !== confirmPasswordInput.value && confirmPasswordInput.value.length >= 6) {
		document.querySelector(".password-match").classList.remove("hidden");
		confirmPasswordInput.style.border = "1px solid red";
		confirmPasswordInput.setCustomValidity('Пароли не совпадают');
		confirmPasswordInput.reportValidity();
	} else {
		document.querySelector(".password-match").classList.add("hidden");
		confirmPasswordInput.style.border = "1px solid #DDDDDD";
		confirmPasswordInput.setCustomValidity('');
	}

	if (passwordErrorMessage) {
			passwordInput.setCustomValidity(passwordErrorMessage);
			passwordInput.style.border = "1px solid red";
			passwordInput.reportValidity();
		} else {
			passwordInput.style.border = "1px solid #DDDDDD";
			passwordInput.setCustomValidity('');
	}
}

passwordInput.addEventListener("input", validatePassword);

let completePasswordCheck = function () {
	let passwordErrorMessage;
	let passwordValue = passwordInput.value;
	let passwordSymbols = passwordValue ? passwordValue.split('') : [];
	let regBigLetters = /[A-Z]/;
	let regSmallLetters = /[a-z]/;
	let regNumbers = /[0-9]/;

	if (passwordSymbols.length < 6 || passwordSymbols.length > 32 ||
	 regBigLetters.test(passwordValue) == false || regSmallLetters.test(passwordValue) == false ||
	 regNumbers.test(passwordValue) == false) {
		passwordErrorMessage = "Пароль должен содержать от 6 до 32 знаков, иметь минимум одну цифру и по одной букве верхнего и нижнего регистра";
	}

	if (passwordErrorMessage) {
		passwordInput.setCustomValidity(passwordErrorMessage);
		passwordInput.style.border = "1px solid red";
		passwordInput.reportValidity();
	} else {
		passwordInput.style.border = "1px solid #DDDDDD";
		passwordInput.setCustomValidity('');
	}
}

passwordInput.addEventListener("change", completePasswordCheck);

// Проверяем, введен ли один и тот же пароль

let confirmPassword = function () {
	if (passwordInput.value !== confirmPasswordInput.value) {
		document.querySelector(".password-match").classList.remove("hidden");
		confirmPasswordInput.style.border = "1px solid red";
		confirmPasswordInput.setCustomValidity('Пароли не совпадают');
		confirmPasswordInput.reportValidity();
	} else if (passwordInput.value === confirmPasswordInput.value && !document.querySelector(".password-match").classList.contains("hidden")) {
		document.querySelector(".password-match").classList.add("hidden");
		confirmPasswordInput.style.border = "1px solid #DDDDDD";
		confirmPasswordInput.setCustomValidity('');
	}
}

confirmPasswordInput.addEventListener("change", confirmPassword);

// Активируем кнопку отправки формы

let activateSubmit = function () {
	if (emailInput.validity.valid && nicknameInput.validity.valid && passwordInput.validity.valid && confirmPasswordInput.validity.valid && document.querySelector("input[name=license]").checked) {
  	submitButton.removeAttribute("disabled");
  	submitButton.classList.add("button");
  } else {
  	submitButton.setAttribute("disabled", true);
  }
}

popup.addEventListener("change", activateSubmit);

// Переходим к дополнительной части формы

popup.addEventListener("submit", function(event) {
  event.preventDefault();
  let formData = new FormData(this);
  let object = {};
  formData.forEach((value, key) => {
    object[key] = value
  });
  json = object;
  popup.classList.add("hidden");
  extraInfoForm.classList.remove("hidden");
}, false);

// Отправляем данные в консоль

extraInfoForm.addEventListener("submit", function(event) {
	event.preventDefault();
	let extraFormData = new FormData(this);
  let object = {};
  extraFormData.forEach((value, key) => {
    object[key] = value
  });
  let allInfo = Object.assign(json, object);
 	jsonAll = JSON.stringify(allInfo);
}, false);

document.querySelector(".extra-send").addEventListener("click", function (evt) {
	evt.preventDefault();
	console.log(jsonAll);
  extraInfoForm.classList.add("hidden");
	openFormButton.style.backgroundColor = "green";
	openFormButton.setAttribute("disabled", true);

});

// Отменяем отправку данных по Enter

popup.addEventListener('keydown', function(event) {
    if(event.keyCode == 13) {
       event.preventDefault();
    }
 });

extraInfoForm.addEventListener('keydown', function(event) {
    if(event.keyCode == 13) {
       event.preventDefault();
    }
 });

// Открываем модальное окно

let openModal = function () {
	if (popup.classList.contains("hidden")) {
		popup.classList.remove("hidden");
		document.querySelector(".email__input").focus();
		document.addEventListener("mousedown", onOverlayClick);
	} else {
		popup.classList.add("hidden");
    document.removeEventListener("mousedown", onOverlayClick);
	}
};

openFormButton.addEventListener("click", openModal);

// Закрытие модального окна по клику вне него

let onOverlayClick = function(evt) {
  if (!popup.contains(evt.target)) { 
    popup.classList.add("hidden");
    popup.reset();
   	numbersRule.classList.remove("rule-ok","rule-error");
   	lettersRule.classList.remove("rule-ok","rule-error");
   	itemsCountRule.classList.remove("rule-ok","rule-error");
	} 

	if (!extraInfoForm.contains(evt.target)) { 
    extraInfoForm.classList.add("hidden");
    extraInfoForm.reset();
   	numbersRule.classList.remove("rule-ok","rule-error");
   	lettersRule.classList.remove("rule-ok","rule-error");
   	itemsCountRule.classList.remove("rule-ok","rule-error");
	} 
}

// Закрытие модального окна по клику на кнопку "Закрыть"

close.addEventListener("click", function(evt) {
  popup.classList.add("hidden");
  popup.reset();
 	numbersRule.classList.remove("rule-ok","rule-error");
 	lettersRule.classList.remove("rule-ok","rule-error");
 	itemsCountRule.classList.remove("rule-ok","rule-error");
});

closeExtra.addEventListener("click", function(evt) {
  extraInfoForm.classList.add("hidden");
  extraInfoForm.reset();
});

// Закрытие модального окна по кнопке ESC

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (!popup.classList.contains("hidden")) {
     	popup.classList.add("hidden");
     	popup.reset();
     	numbersRule.classList.remove("rule-ok","rule-error");
     	lettersRule.classList.remove("rule-ok","rule-error");
     	itemsCountRule.classList.remove("rule-ok","rule-error");
    }

    if (!closeExtra.classList.contains("hidden")) {
     	closeExtra.classList.add("hidden");
     	closeExtra.reset();
     	numbersRule.classList.remove("rule-ok","rule-error");
     	lettersRule.classList.remove("rule-ok","rule-error");
     	itemsCountRule.classList.remove("rule-ok","rule-error");
    }
  }
});
