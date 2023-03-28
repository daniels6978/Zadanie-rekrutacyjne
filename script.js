const firstName = document.querySelector(".name_input");
const lastName = document.querySelector(".lastName_input");
const pesel = document.querySelector(".pesel_input");
const dateBirth = document.querySelector(".dateBirth_input");

const confirmBtn = document.querySelector(".confirm_btn");
const modal = document.querySelector(".modal");
const closeBtn = document.querySelector(".closeBtn");

const nameRegex = /^[a-z a-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{2,20}$/i;
const lastNameRegex = /^[a-z a-zżźćńółęąśŻŹĆĄŚĘŁÓŃ]{2,30}$/i;

const URL = "http://localhost:8081/form/addPerson";

const checkName = (name) => {
  if (name.value.match(nameRegex)) {
    name.parentElement.classList.remove("error");
    return true;
  } else {
    name.parentElement.classList.add("error");
    return false;
  }
};

const checkPesel = () => {
  const weight = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];
  let sum = 0;
  const peselNumber = pesel.value;
  const controlNumber = parseInt(peselNumber.slice(10));

  if (peselNumber.length != 11) {
    pesel.parentElement.classList.add("error");
    return false;
  } else {
    for (let i = 0; i < peselNumber.length - 1; i++) {
      sum += parseInt(peselNumber[i] * weight[i]);
    }

    let modulo = sum % 10;
    if (10 - modulo === controlNumber) {
      pesel.parentElement.classList.remove("error");
      return true;
    } else {
      pesel.parentElement.classList.add("error");
      return false;
    }
  }
};

const completeDate = () => {
  const peselNumber = pesel.value;
  const yearBirth = peselNumber.substring(0, 2);
  const monthBirth = peselNumber.substring(2, 4);
  const dayBirth = peselNumber.substring(4, 6);
  if (peselNumber.length >= 6) {
    if (yearBirth < 23) {
      dateBirth.value = `${dayBirth}.${monthBirth}.${20 + yearBirth}`;
    } else {
      dateBirth.value = `${dayBirth}.${monthBirth}.${19 + yearBirth}`;
    }
  }
};

const modalMessage = {
  valid: {
    title: "Sukces",
    message: "Podałeś poprawne dane",
  },
  invalid: {
    title: "Błąd",
    message: "Źle uzupełniony formularz",
  },
};

const showModal = (status) => {
  modal.parentElement.style.visibility = "visible";
  modal.classList.add("active");
  modal.children[1].textContent = modalMessage[status].title;
  modal.children[2].textContent = modalMessage[status].message;
};

const handleConfirm = (e) => {
  e.preventDefault();
  const checkedFirstName = checkName(firstName);
  const checkedLastName = checkName(lastName);
  const checkedPesel = checkPesel();

  if (checkedFirstName && checkedLastName && checkedPesel) {
    showModal("valid");
    postSavePerson();
  } else {
    showModal("invalid");
  }
};

const postSavePerson = () => {
  const person = {
    firstName: firstName.value,
    lastName: lastName.value,
    peselNumber: pesel.value,
    birthDate: dateBirth.value,
  };
  modal.children[3].textContent = "Łączenie się z bazą ...";
  axios
    .post(URL, person)
    .then((res) => {
      modal.children[3].textContent = "Udało się połączyć z bazą danych";
    })
    .catch(() => {
      modal.children[3].textContent = "Nie udało się połączyć z bazą danych";
    });
};

confirmBtn.addEventListener("click", handleConfirm);
pesel.addEventListener("keyup", completeDate);
closeBtn.addEventListener("click", () => {
  modal.parentElement.style.visibility = "hidden";
  modal.classList.remove("active");
});
