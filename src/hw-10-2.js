/**
 * Задача 3.
 *
 * Напишите функции compose(), которая в качестве аргументов принимает неограниченное количество функций.
 *
 * При запуске compose() последовательно запускает коллбек-функции из аргументов.
 *
 * Важно: compose() выполняет коллбек-функции из аргументов НАЧИНАЯ С КОНЦА.
 *
 * Каждая коллбек-функция из цепочки в качестве своего аргумента принимает то, что возвращает предыдущая коллбек-функция.
 * То есть возвращаемое значение каждой коллбек-функции из цепочки
 * становится доступным из параметра следующей коллбек-функции в цепочке.
 *
 * Функция compose() возвращает ещё одну функцию с одним параметром.
 * Значение, переданное этой функции в качестве аргумента должно стать
 * параметром первой коллбек-функции в цепочке выполнения функции compose().
 *
 *
 * Генерировать ошибки если:
 * - Любой из аргументов не является функцией;
 * - Любая функция из аргументов не вернула значение.
 *
 * Заметка:
 * Если функции, которая является возвращаемым значением compose()
 * не передать в качестве аргумента какое-либо значение, генерировать ошибку не нужно.
 */

// Решение
// functions = [ f[0], f[1], f[2], f[3] ]
// functions.length = 4

function compose(...functions) {
  if (!functions.every((item) => typeof item === "function")) {
    throw new Error("Not a function");
  }

  return (argumentCompose) => {
    let result = functions[functions.length - 1](argumentCompose); // function[3]

    for (let i = functions.length - 2; i >= 0; i--) {
      // first need function[2]
      result = functions[i](result);
      if (!result) {
        throw new Error("Empty function");
      }
    }

    return result;
  };
}

// compose(...)();
// 1) const functionCompose = compose(...); // typeof(functionCompose) === 'function'
// 2) functionCompose('h');

// const result1 = compose(
//   (prevResult) => prevResult + "o", // 0
//   (prevResult) => prevResult + "l", // 1
//   (prevResult) => prevResult + "l", // 2
//   (prevResult) => prevResult + "e"  // 3
// )("h");

const functionCompose = compose(
  (prevResult) => prevResult + "o", // 0
  (prevResult) => prevResult + "l", // 1
  (prevResult) => prevResult + "l", // 2
  (prevResult) => prevResult + "e" // 3
);
const result1 = functionCompose("h");

const result2 = compose(
  (prevResult) => prevResult + "o",
  (prevResult) => prevResult + "l",
  (prevResult) => prevResult + "l",
  (prevResult) => prevResult + "e",
  () => "h"
)();

console.log(result1); // 'hello'
console.log(result2); // 'hello'
