const path = require('path');
const chalk = require('chalk');

const fileColors = {};

function stackParser(_, stack) {
  const caller = stack[1];
  return {
    file: path.basename(caller.getFileName()),
    line: caller.getLineNumber(),
    func: caller.getFunctionName() ?? '<anonymous>',
  };
}

module.exports = new Proxy(console, {
  get(target, prop) {
    const orig = Error.prepareStackTrace;
    Error.prepareStackTrace = stackParser;
    const info = new Error().stack;
    Error.prepareStackTrace = orig;

    const color = fileColors[info.file] ??= Math.floor(Math.random() * 256);

    return (...args) => target[prop](...args.map((str) => chalk.bgAnsi256(color)(str)), `(${info.file}:${info.line} in ${info.func})`);
  },
});
