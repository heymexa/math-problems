const PDFDocument = require('pdfkit');
const fs = require('fs');
const uuidv4 = require('uuid/v4');
const { makeRandomExampleRow } = require('./src/utils');

const outputFile = './output.pdf';
const fontFile = './src/font.ttf';

function getOutputFile() {
  return `${uuidv4()}.pdf`;
}

const doc = new PDFDocument();
doc.pipe(fs.createWriteStream(getOutputFile()));
doc.font(fontFile);

doc
  .fontSize(18)
  .text('Реши примеры без ошибок и получи звёздочку!', { align: 'center' });

doc.fontSize(14);
doc.moveDown(3);

let i = 0;
while (i < 7) {
  makeRandomExampleRow(doc);
  ++i;
}

doc.end();
