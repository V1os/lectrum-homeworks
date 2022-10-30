const colours = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",

  fg: {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    crimson: "\x1b[38m" // Scarlet
  },
  bg: {
    black: "\x1b[40m",
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    magenta: "\x1b[45m",
    cyan: "\x1b[46m",
    white: "\x1b[47m",
    crimson: "\x1b[48m"
  }
};
let num = 1;
const output = {
  log: (args) => [
    colours.bright,
    colours.fg.white,
    colours.bg.crimson,
    `${num++}:\t`,
    ...args,
    colours.reset
  ],
  error: (args) => [
    colours.bright,
    colours.fg.red,
    colours.bg.crimson,
    `${num++}:\t`,
    ...args,
    colours.reset
  ],
  info: (args) => [
    colours.bright,
    colours.fg.cyan,
    colours.bg.crimson,
    `${num++}:\t`,
    ...args,
    colours.reset
  ]
};
const rest = (list) => Array.prototype.slice.call(list);

module.exports = {
  colours,
  log() {
    console.log.apply(console, output.log(rest(arguments)));
  },
  error() {
    console.error.apply(console, output.error(rest(arguments)));
  },
  info() {
    console.error.apply(console, output.info(rest(arguments)));
  },
  time() {
    console.time.apply(console, ["⌛", rest(arguments)]);
  },
  timeEnd() {
    console.timeEnd.apply(console, ["⌛", rest(arguments)]);
  }
};
