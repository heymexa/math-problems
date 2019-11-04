const PDFDocument = require('pdfkit');
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const path = require('path');
const config = require('./config');

class MathProblemsBook {
  constructor(options) {
    const defaultOptions = {
      fontSizeTitle: 18,
      fontSize: 14,
      font: './src/font.ttf',
      titlePaddingBottom: 2,
      paddingBottom: 0.5,
      dist: './dist'
    };
    this.options = { ...defaultOptions, ...options };
    this._problems = [];

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

  addProblem(problem, options) {
    this._problems.push({ problem, options });
  }

  _getOutputFile() {
    return path.join(this.options.dist, `${uuidv4()}.pdf`);
  }

  _printProblems() {
    this.doc.fontSize(this.options.fontSize);
    this._problems.forEach((problemData, i) => {
      const { problem, options } = problemData;
      const { paddingBottom:taskPaddingBottom } = problem.options || {};
      const { paddingBottom:defaultPaddingBottom } = this.options;
      const { repeatTimes } = options;
      const paddingBottom = taskPaddingBottom || defaultPaddingBottom;
      this.doc.text(`${i + 1}. ${problem.title}`);
      this.doc.moveDown(defaultPaddingBottom);
      let count = repeatTimes;
      while (count > 0) {
        this.doc.text(problem.toString());
        this.doc.moveDown(paddingBottom);
        --count;
      }
      this.doc.moveDown();
    });
  }

  print() {
    try {
      this._printProblems();
      this.doc.end();
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = MathProblemsBook;
