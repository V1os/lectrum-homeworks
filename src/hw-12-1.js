/**
 * Примерные данные для заполнения, вы можете использовать свои данные.
 *  Имя: "Firefox",   Компания: "Mozilla",        Процент: "8.01%"
 *  Имя: "Chrome",    Компания: "Google",         Процент: "68.26%"
 *  Имя: "Edge",      Компания: "Microsoft",      Процент: "6.67%"
 *  Имя: "Opera",     Компания: "Opera Software", Процент: "1.31%"
 *
 */
const form = document.querySelector("#form");
const addData = document.querySelector('input[type="submit"]');
const browserData = document.querySelector('[name="browser"]');
const companyData = document.querySelector('[name="company"]');
const percentData = document.querySelector('input[name="percent"]');
const analize = document.querySelector(".results");
const phrase = document.querySelector("#result");
const totalResult = [];

let name = null;
let company = null;
let marketShare = null;

form.addEventListener("input", (event) => {
  const formData = new FormData(form);
  const classDanger = "error";
  name = formData.get("browser");
  company = formData.get("company");
  marketShare = formData.get("percent");

  console.log(!name, !company, !marketShare, !name || !company || !marketShare);
  if (!name || !company || !marketShare) {
    addData.disabled = true;
  } else {
    addData.disabled = false;
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

  // ? percentData.classList.toggle('error', isNaN(marketShare) || marketShare < 0)
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  totalResult.push({ name, company, marketShare });
  console.log(totalResult);
  form.reset();
  name = null;
  company = null;
  marketShare = null;
});

analize.addEventListener("click", (_) => {
  // ? https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex
  let maxIndex = totalResult.reduce(
    (acc, curr, index) =>
      totalResult[acc].marketShare > curr.marketShare ? acc : index,
    0
  );

  // destructurate `name` prop - v2
  const { name, company, marketShare } = totalResult[maxIndex] || {}; // if `undefined` set `{}`

  try {
    if (!name) {
      phrase.innerHTML = "Недостаточно данных";
    } else {
      phrase.innerHTML = `Самый востребованный браузер это ${name} от компании ${company} с процентом использования ${marketShare}%`;
    }
  } catch ({ message }) {
    // destructurate `message` prop - v1
    console.log("Ошибка обработки данных", message);
  }
});
