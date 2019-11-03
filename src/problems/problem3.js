/* переводы в м, дц, см */

const Task = require('../MathProblem');
const random = require('lodash/random');

const task = new Task({ title: 'Переведи в см, дм и см'});
task.addTask(() => {
  const m = random(0, 9);
  const dm = random(0, 9);
  const sm = random(0, 9);
  let task = '';
  if (m > 0) {
    task += `${m} м `;
  }
  if (dm > 0) {
    task += `${dm} дм `;
  }
  if (sm > 0) {
    task += `${sm} см`;
  }
  return `${task} =          см =       дм       см`;
});

module.exports = task;
