class MathProblem {
  constructor(options) {
    this.title = options.title || '';
    this.options = {};
  }

  setTitle(title) {
    this.title = title;
  }

  addTask(task, options) {
    if (typeof task !== 'function') {
      throw new Error('task should be a function');
    }
    this.task = task;
    this.options = options;
  }

  toString() {
    return this.task();
  }
}

module.exports = MathProblem;
