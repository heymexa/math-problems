/* сложение 3-х значных чисел */

const Task = require('../MathProblem');
const random = require('lodash/random');

const task = new Task({ title: 'Решить примеры'});
task.addTask(() => {
  return `${random(0, 999)} + ${random(0, 999)} = `;
}, { paddingBottom: 1 });

module.exports = task;
