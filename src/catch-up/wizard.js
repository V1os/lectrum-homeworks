import { saveToStorage } from "./login";

const buttonRegistration = document.querySelector("#regBtn");
const step1BlockStyle = document.querySelector("#step1Block");
const loginBlockStyle = document.querySelector("#loginBlock");
const buttonContinue = document.querySelector("#toStep2Btn");
const regBlock = document.querySelector("#regBlock");
const buttonBack1 = document.querySelector("#toLoginSvg");
const buttonBack2 = document.querySelector("#from3to2Svg");
const radioStudent = document.querySelector("#user_student");
const radioTeacher = document.querySelector("#user_teacher");
const user = {};
const createAccount = document.querySelector("#createAccount");
const password1 = document.querySelector("#password");
const password2 = document.querySelector("#password_next");
const form = regBlock.querySelector(".form-login");
const key = "student";
let studentArray = [];
const defaultStoreValue = [];
let storageStudent = localStorage.getItem(key);

buttonRegistration.addEventListener("click", () => {
  step1BlockStyle.removeAttribute("style");
  loginBlockStyle.setAttribute("style", "display: none;");
});

buttonBack1.addEventListener("click", () => {
  step1BlockStyle.setAttribute("style", "display: none;");
  loginBlockStyle.removeAttribute("style");
});

buttonContinue.addEventListener("click", () => {
  step1BlockStyle.setAttribute("style", "display: none;");
  regBlock.removeAttribute("style");
  radioStudent.setAttribute("value", "student");
  radioTeacher.setAttribute("value", "teacher");
  let radio = document.querySelectorAll('[name="user-type"]');
  let radioData = null;
  for (let i = 0; i < radio.length; i++) {
    if (radio[i].checked) {
      radioData = radio[i].value;
      break;
    }
  }
  user.type = radioData;
});

buttonBack2.addEventListener("click", () => {
  step1BlockStyle.removeAttribute("style");
  regBlock.setAttribute("style", "display: none;");
});

form.addEventListener("input", (event) => {
  const formData = new FormData(form);

  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const password_next = document.getElementById("#password_next");
  const inputName = document.querySelector("#name");
  const fullName = name.split(" ");

  user.name = name;
  user.email = email;
  user.password = password;
  user.password_next = password2.value;

  //  Проверка инпута
  fullName.forEach((item) => {
    if (item.length < 2 || !isNaN(+item)) {
      inputName.classList.add("class", "error");
    }
  }); // не работает на 2й элемент массива

  !name.includes(" ")
    ? inputName.classList.add("class", "error")
    : inputName.classList.remove("class", "error");

  if (password1.value !== password2.value) {
    password1.classList.add("class", "error");
    password2.classList.add("class", "error");
  } else {
    password1.classList.remove("class", "error");
    password2.classList.remove("class", "error");
  }
});

createAccount.addEventListener("click", (event) => {
  event.preventDefault();
  const { type: position } = user;
  if (position === "teacher") {
    const key = "teacher";
    localStorage.setItem(key, JSON.stringify(user));
    window.location.href = "teacher.html";
  } else {
    if (!storageStudent) {
      localStorage.setItem(key, JSON.stringify(defaultStoreValue));
      storageStudent = defaultStoreValue;
    }
    studentArray = JSON.parse(storageStudent);
    studentArray.push(user);

    localStorage.setItem(key, JSON.stringify(studentArray));

    window.location.href = "student.html";
  }
  // form.submit();
  form.reset();
});

console.log("wizard");
console.log(user);
