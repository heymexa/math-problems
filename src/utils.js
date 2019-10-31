const random = require('lodash/random');

function makeRandomExampleRow(
  doc,
  margin = 5.2,
  width = 50,
  step = 130,
  column = 3
) {
  for (let i = 0; i <= column; i++) {
    level1(doc, { width: width + step * i });
    if (i !== column) {
      doc.moveUp(margin);
    }
  }
}

function rnd(from, to) {
  return Math.floor(Math.random() * (to - from)) + from;
}

function level1(doc, options = {}) {
  makeColumnExample(doc, rnd(10, 999), rnd(10, 999), '+', options);
  doc.moveDown(3);
}

function level2(doc, options = {}) {
  const numbers = new Array(2).fill(1).map(() => rnd(10, 99)).sort((a, b) => b - a);
  makeColumnExample(doc, numbers[0], numbers[1], '-', options);
  doc.moveDown(3);
}

function makeColumnExample(doc, number1, number2, sign, options = {}) {
  const width = options.width || 50;
  const align = options.align || 'right';
  doc.text(number1, { width, align });
  doc.moveDown(0.1);
  doc.moveUp(0.5);
  let signMargin =
    (Math.max(String(number1).length, String(number2).length) + 1) * 10;
  const signWidth = width - signMargin <= 12 ? 12 : width - signMargin;
  console.log(`width - signMargin: ${width - signMargin}`);
  doc.text(`${sign}`, { align, width: signWidth });
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
