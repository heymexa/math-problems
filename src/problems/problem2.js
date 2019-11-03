/* вычитание 3-х значных чисел */

const Task = require('../MathProblem');
const random = require('lodash/random');

const task = new Task({ title: 'Решить примеры'});
task.addTask(() => {
  const numbers = new Array(2).fill(1).map(() => random(10, 999)).sort((a, b) => b - a);
  return `${numbers[0]} - ${numbers[1]} = `;
}, { paddingBottom: 1});

module.exports = task;
