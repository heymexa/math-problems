const MathProblemsBook = require('./src/MathProblemsBook');
const task1 = require('./src/problems/problem1');
const task2 = require('./src/problems/problem2');
const task3 = require('./src/problems/problem3');

const problemsBook = new MathProblemsBook();
problemsBook.addTitle('Заголовок');

problemsBook.addTask(task1, { repeatTimes: 3});
problemsBook.addTask(task2, { repeatTimes: 4});
problemsBook.addTask(task3, { repeatTimes: 4});

problemsBook.print();
