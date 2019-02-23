const PDFDocument = require('pdfkit');
const fs = require('fs');
const { makeRandomExampleRow } = require('./src/utils');

const outputFile = './output.pdf';
const fontFile = './src/font.ttf';

const doc = new PDFDocument();
doc.pipe(fs.createWriteStream(outputFile));
doc.font(fontFile);

doc
  .fontSize(18)
  .text('Реши примеры без ошибок и получи звёздочку!', { align: 'center' });

doc.fontSize(14);
doc.moveDown();
doc.moveDown();
doc.moveDown();

let i = 0;
while (i < 7) {
  makeRandomExampleRow(doc);
  ++i;
}

doc.end();
