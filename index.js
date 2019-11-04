const MathProblemsBook = require('./src/MathProblemsBook');
const problem1 = require('./src/problems/problem1');
const problem2 = require('./src/problems/problem2');
const problem3 = require('./src/problems/problem3');

const problemsBook = new MathProblemsBook();
problemsBook.addTitle('Заголовок');

problemsBook.addProblem(problem1, { repeatTimes: 3});
problemsBook.addProblem(problem2, { repeatTimes: 4});
problemsBook.addProblem(problem3, { repeatTimes: 4});

problemsBook.print();
