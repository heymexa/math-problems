const random = require('lodash/random');

function makeRandomExampleRow(doc, margin = 5.2, width = 50, step = 130, column = 3) {
  for (let i = 0; i <= column; i++) {
    makeRandomExample(doc, { width: width + step * i });
    if (i !== column) {
      doc.moveUp(margin);
    }
  }
}

function makeRandomExample(doc, options = {}) {
  makeColumnExample(doc, random(10, 99), random(10, 99), '+', options);
  doc.moveDown(3);
}

function makeColumnExample(doc, number1, number2, sign, options = {}) {
  const width = options.width || 50;
  const align = options.align || 'right';
  doc.text(number1, { width, align });
  doc.moveDown(0.1);
  doc.moveUp(0.5);
  const signMargin = (Math.max(String(number1).length, String(number2).length) + 1) * 10;
  doc.text(`${sign}`, { align, width: width - signMargin });
  doc.moveUp(0.5);
  doc.text(number2, { width, align });
  doc.moveUp(0.9);
  doc.text(new Array(String(number2).length * 2).fill('_').join(''), {
    align,
    width
  });
}

module.exports = {
  makeRandomExampleRow
};
