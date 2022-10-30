/**
 * Задача 2.
 *
 * Добавьте роботу геттер и сеттер для приватного свойства energy.
 * Нужно, чтобы внешний код мог узнать заряд батареи робота.
 *
 * Условия:
 * - заданную форму конструктора включая его параметры менять нельзя — можно только дополнять;
 * - для отображения инфрмации о количестве энергии необходимо динамически создать элемент "p" с классом text-success;
 * - для отображения инфрмации об ошибке необходимо динамически создать элемент "p" с классом text-danger;
 * - все "p" элементы необходимо добавлять в "div" с классом messages.
 *
 * Генерировать ошибки если:
 * - новый заряд батареи устанавливается в значении меньшем, чем 0;
 * - новый заряд батареи устанавливается в значении большем, чем значение MAX_ENERGY_CAPACITY;
 * - при создании экземпляра CleanerRobot изначальный уровень энергии зада в не рамок допустимого диапазона.
 *
 * Приблизительный план действий:
 * 1. Добавить идентификатор в форму, который будет использоваться для добавления обработчика onsubmit
 * 2. Создать экземпляр CleanerRobot
 * 3. При сабмите формы устанавливать новое значение уровня энергии робота при помощи метода setEnergy
 * 4. При клике на элемент button читать значение уровня энергии робота и выводить его в p элемент с классом text-success
 * 5. Если в работе робота возникнут ошибки выводить их в p элемент с классом text-danger
 *
 * Подсказки:
 * - в HTML допускается добавление идентификаторов для более удобной работы с дом
 * - вам могут потребоваться следующие методы и свойства — innerHTML, getElementById, createElement, onsubmit, onclick
 */

import { validateEnergy, execute, showInfo } from "../../helpers/hw142";

const form = document.getElementById("cleanerRobot");
const [messageBlock] = document.getElementsByClassName("messages");
const cleanerRobot = new CleanerRobot();

const inputEnergy = document.getElementById("energyInput");
const getEnergyButton = form.lastElementChild;

function CleanerRobot(initialEnergy = 0 /* Изначальный заряд батареи */) {
  const MAX_ENERGY_CAPACITY = 100; /* Максимальная ёмкость батареи. */

  validateEnergy(initialEnergy, MAX_ENERGY_CAPACITY);

  this.getEnergy = getEnergy;
  this.setEnergy = setEnergy;

  let energy = null;

  this.setEnergy(initialEnergy);

  function getEnergy() {
    return energy;
  }

  function setEnergy(currentEnergy) {
    validateEnergy(currentEnergy, MAX_ENERGY_CAPACITY);
    showInfo(`Текущий заряд батареи: ${energy}`, messageBlock);

    energy = currentEnergy;

    showInfo(`Заряд батареи после установки: ${energy}`, messageBlock);
  }
}

// Ниже необходимо написать логику работы с DOM
form.addEventListener("submit", (event) => {
  event.preventDefault();

  cleanerRobot.setEnergy(+inputEnergy.value);
});

getEnergyButton.addEventListener("click", () => {
  showInfo(`Текущий заряд батареи: ${cleanerRobot.getEnergy()}`, messageBlock);
});

execute(() => {
  new CleanerRobot(-1);
}, messageBlock);

execute(() => {
  cleanerRobot.setEnergy(-22);
}, messageBlock);

execute(() => {
  cleanerRobot.setEnergy(101);
}, messageBlock);
