export default (totalResult) => (_) => {
  let maxIndex = totalResult.reduce(
    (acc, curr, index) =>
      totalResult[acc].marketShare > curr.marketShare ? acc : index,
    0
  );

  // destructurate `name` prop - v2
  const { name, company, marketShare } = totalResult[maxIndex] || {}; // if `undefined` set `{}`

  const phrase = document.querySelector("#result");
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
};
