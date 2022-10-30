/** global: getWorker */
/**
 * Задача 1.
 *
 * Реализуйте класс Worker, который будет иметь следующие свойства:
 *
 * - firstName — имя;
 * - lastName — фамилия;
 * - rate — ставка за день работы;
 * - hours — количество отработанных часов.
 *
 * Класс должен иметь метод getSalary(), который будет возвращать зарплату работника.
 * Зарплата - это произведение (умножение) ставки rate на количество отработанных часов hours.
 *
 * Условия:
 * - Реализация решения — это синтаксис современных классов JavaScript;
 */

// РЕШЕНИЕ
class Worker {
  firstName;
  lastName;
  rate;
  hours;

  constructor(firstName, lastName, hours, rate) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.hours = hours;
    this.rate = rate;
  }

  getSalary() {
    return this.hours * this.rate;
  }
}

// const petya = new Worker('Peta', 'Petya', 1, 20);
// petya.getSalary(); // 1 * 20

// РЕШЕНИЕ

const workers = [];
const form = document.getElementById("regForm");
const list = document.getElementById("list");

form.onsubmit = (event) => {
  event.preventDefault();
  list.innerHTML = null;

  const formData = new FormData(event.target);
  const name = formData.get("fullname");
  const [firstName, lastName] = name.split(" ");
  const hours = formData.get("hours");
  const rate = formData.get("rate");

  let workersHTML = "";

  workers.unshift(new Worker(firstName, lastName, hours, rate));
  workers.forEach((worker) => {
    // ПРОВЕРОЧНЫЙ КОД
    // console.log(worker.firstName); // Джон
    // console.log(worker.lastName); // Доу
    // console.log(worker.rate); // 10
    // console.log(worker.hours); // 31
    // console.log(worker.getSalary()); // 10 * 31 = 310

    workersHTML += getWorker({
      name: `${worker.firstName} ${worker.lastName}`,
      hours: worker.hours,
      rate: worker.rate,
      salary: `${worker.getSalary()} $`
    });
  });

  list.insertAdjacentHTML("afterbegin", workersHTML);
};

var getWorker = ({ name, hours, rate, salary }) => `
<div class="card p-4">
    <div class="d-flex align-items-center">
        <div class="image">
            <img src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80" class="rounded" width="155">
        </div>
        <div class="ml-3 w-100">
            <h4 class="mb-0 mt-0">${name}</h4> 
            <span>Старший разработчик</span>
            <div class="p-2 mt-2 bg-primary d-flex justify-content-between rounded text-white stats">
                <div class="d-flex flex-column">
                    <span class="hours">Часов</span>
                    <span class="number1">${hours}</span>
                </div>
                <div class="d-flex flex-column">
                    <span class="rate">$/час</span>
                    <span class="number2">${rate}</span>
                </div>
                <div class="d-flex flex-column">
                    <span class="salary">Зарплата</span>
                    <span class="number3">${salary}</span>
                </div>
            </div>
            <div class="button mt-2 d-flex flex-row align-items-center">
                <button class="btn btn-sm btn-outline-primary w-100">Распечатать</button>
                <button class="btn btn-sm btn-primary w-100 ml-2">Удалить</button>
            </div>
        </div>
    </div>
</div>
`;
