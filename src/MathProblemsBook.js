const PDFDocument = require('pdfkit');
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const config = require('./config');

class MathProblemsBook {
  constructor(options) {
    const defaultOptions = {
      fontSizeTitle: 18,
      fontSize: 14,
      font: './src/font.ttf',
      titlePaddingBottom: 2,
      paddingBottom: 0.5
    };
    this.options = { ...defaultOptions, ...options };
    this._tasks = [];

    this._init();
  }

  _init() {
    this.doc = new PDFDocument();
    this.doc.pipe(fs.createWriteStream(this._getOutputFile()));
    this.doc.font(this.options.font);
  }

  addTitle(title) {
    this.doc
      .fontSize(this.options.fontSizeTitle)
      .text(title, { align: 'center' });
    this.doc.moveDown(this.options.titlePaddingBottom);
  }

  addTask(task, options) {
    this._tasks.push({ task, options });
  }

  _getOutputFile() {
    return `${uuidv4()}.pdf`;
  }

  _printTasks() {
    this.doc.fontSize(this.options.fontSize);
    this._tasks.forEach((taskData, i) => {
      const { task, options } = taskData;
      const { paddingBottom:taskPaddingBottom } = task.options || {};
      const { paddingBottom:defaultPaddingBottom } = this.options;
      const { repeatTimes } = options;
      const paddingBottom = taskPaddingBottom || defaultPaddingBottom;
      this.doc.text(`${i + 1}. ${task.title}`);
      this.doc.moveDown(defaultPaddingBottom);
      let count = repeatTimes;
      while (count > 0) {
        this.doc.text(task.toString());
        this.doc.moveDown(paddingBottom);
        --count;
      }
      this.doc.moveDown();
    });
  }

  print() {
    try {
      this._printTasks();
      this.doc.end();
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = MathProblemsBook;
