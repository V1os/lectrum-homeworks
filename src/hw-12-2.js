import handleClick from "./helpers/find";

/**
 * Примерные данные для заполнения, вы можете использовать свои данные.
 *  Имя: "Firefox",   Компания: "Mozilla",        Процент: "8.01%"
 *  Имя: "Chrome",    Компания: "Google",         Процент: "68.26%"
 *  Имя: "Edge",      Компания: "Microsoft",      Процент: "6.67%"
 *  Имя: "Opera",     Компания: "Opera Software", Процент: "1.31%"
 *
 */
const form = document.querySelector("#form");
const submit = document.querySelector('input[type="submit"]');
const browserData = document.querySelector('[name="browser"]');
const companyData = document.querySelector('[name="company"]');
const percentData = document.querySelector('input[name="percent"]');
const button = document.querySelector(".results");
const totalResult = [];

let name = null;
let company = null;
let marketShare = null;

form.addEventListener("input", (_) => {
  const formData = new FormData(form);
  const name = formData.get("browser");
  const company = formData.get("company");
  const marketShare = formData.get("percent");
  const classDanger = "error";

  if (!name || !company || !marketShare) {
    submit.disabled = true;
  } else {
    submit.disabled = false;
  }

  if (!isNaN(name) || name.length <= 3) {
    browserData.classList.add(classDanger);
  } else {
    browserData.classList.remove(classDanger);
  }

  if (!isNaN(name) || company.length <= 3) {
    companyData.classList.add(classDanger);
  } else {
    companyData.classList.remove(classDanger);
  }

  if (isNaN(marketShare) || marketShare < 0) {
    percentData.classList.add(classDanger);
  } else {
    percentData.classList.remove(classDanger);
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  totalResult.push({ name, company, marketShare });
  form.reset();
});

button.addEventListener("click", handleClick(totalResult));
