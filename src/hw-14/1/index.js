/**
 * Задача 1.
 *
 * Дан базовый класс робота-уборщика.
 *
 * Задача:
 * Добавьте роботу функционал употребления энергии:
 * - при начале уборки уровень энергии должен уменьшиться;
 * - в расчёте использовать внутренний коэффициент ENERGY_CONSUMPTION.
 *
 * Затем добавьте роботу публичный метод stop() для остановки процесса уборки.
 * А если уборка остановлена раньше времени завершения,
 * onReady сработать не должен, а также нужно вывести другое сообщение.
 *
 * Условия:
 * - заданную форму конструктора включая его параметры менять нельзя — можно только дополнять и переносить в методы обработки события;
 * - использовать функцию clearTimeout для завершения уборки;
 * - идентификатор таймера нужно хранить в приватной переменной конструктора timerId.
 * - значение INITIAL_ENERGY необходимо получить из инпута name="energy"
 * - значение INITIAL_SQUARE необходимо получить из инпута name="square"
 * - работу робота необходимо запускать по нажатию на кнопку в форме — Начать уборку. Обратит внимание, что форма не должна перезагружать страничку
 * - все информационные сообщения необходимо выводить в HTML в элемент — p. Заменить console.log на код для вывода информации в HTML
 *
 * Приблизительный план действий:
 * 1. Добавить идентификатор в форму, который будет использоваться для добавления обработчика onsubmit
 * 2. Из инпутов извлечь необходимую информацию и передать в конструктор CleanerRobot
 * 3. При подтверждении формы необходимо создать экземпляр CleanerRobot и запустить его работу при помощи метода clean
 * 4. Добавить селектор p элементу и использовать его для отображения текста из методов onReady и clean
 * 5. После завершения работы с DOM приступить к реализации логики робота
 *
 * Подсказки:
 * - в HTML допускается добавление идентификаторов для более удобной работы с дом
 * - вам могут потребоваться следующие методы и свойства — innerHTML, getElementById, onsubmit
 */
const form = document.getElementById("cleanerRobot");
const p = form.nextElementSibling;

const inputInitialEnergy = document.getElementById("energyInput");
const inputInitialSquare = document.getElementById("squareInput");

function CleanerRobot(
  initialEnergy = 0 /* Изначальный заряд батареи робота % */,
  cleaningSquare /* Площадь для уборки в метрах. */
) {
  let energy = initialEnergy;
  let timerId = 0;
  let intervalId = 0;
  const ENERGY_CONSUMPTION = 1; /* Расход энергии: 1% батареи на 1 час работы. */
  const CLEANING_SPEED = 10; /* Скорость уборки: 10 квадратных метров в час. */
  const getCleaningTime = () => cleaningSquare / CLEANING_SPEED;
  const onReady = () => {
    timerId = 0;
    energy -= ENERGY_CONSUMPTION * getCleaningTime();
    inputInitialEnergy.value = Math.floor(energy);
    clearInterval(intervalId);
    p.innerHTML = `Уборка завершена. Осталось заряда батареи: ${energy}.`;
  };

  this.clean = () => {
    const cleaningTime = getCleaningTime();

    p.innerHTML = `Начинаю процесс уборки. Время уборки: ${cleaningTime} часов.`;

    /* Для удобства время уборки сокращено до формата 1 час = 1 секунда */
    timerId = setTimeout(onReady, cleaningTime * 1000);
    intervalId = setInterval(() => {
      p.innerHTML += "*";
    }, 1000);
  };

  this.stop = () => {
    // onReady need stoped
    // https://developer.mozilla.org/ru/docs/Web/API/setTimeout
    if (timerId) {
      clearTimeout(timerId);
      p.innerHTML = "Принудительная остановка робота";
    } else {
      p.innerHTML = "Робот выключен, либо завершил уборку";
    }
    clearInterval(intervalId);
  };
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // * 1. + Добавить идентификатор в форму, который будет использоваться для добавления обработчика onsubmit
  // * 2. + Из инпутов извлечь необходимую информацию и передать в конструктор CleanerRobot
  // * 3. + При подтверждении формы необходимо создать экземпляр CleanerRobot и запустить его работу при помощи метода clean
  // * 4. + Добавить селектор p элементу и использовать его для отображения текста из методов onReady и clean
  // * 5. + После завершения работы с DOM приступить к реализации логики робота

  // +initialEnergy.value
  // +initialSquare.value

  const cleanerRobot = new CleanerRobot(
    +inputInitialEnergy.value,
    +inputInitialSquare.value
  );
  cleanerRobot.clean(); /* Начинаю процесс уборки. Время уборки: 4.5 часов. */

  // setTimeout(() => {
  //   cleanerRobot.stop(); /* Спустя 1 секунду: Уборка завершена досрочно. Осталось заряда батареи: 45.5. */
  // }, 7000);
});
