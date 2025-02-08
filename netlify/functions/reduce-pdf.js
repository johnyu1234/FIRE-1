const { PDFDocument } = require('pdf-lib');
const serverless = require('serverless-http');
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const upload = multer({ dest: '/tmp/uploads/' });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/reduce-pdf', upload.single('pdf'), async (req, res) => {
  try {
    console.log('File uploaded:', req.file);
    if (!req.file) {
      console.error('No file uploaded');
      return res.status(400).send('No file uploaded.');
    }
    const filePath = path.join('/tmp/uploads', req.file.filename);
    const pdfBytes = fs.readFileSync(filePath);
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Reduce PDF size by compressing images and removing unused objects
    pdfDoc.setCreator('');
    pdfDoc.setProducer('');
    pdfDoc.setTitle('');
    pdfDoc.setSubject('');
    pdfDoc.setKeywords([]);
    pdfDoc.setCreationDate(new Date());
    pdfDoc.setModificationDate(new Date());

    const reducedPdfBytes = await pdfDoc.save({ useObjectStreams: false });

    // Send the reduced PDF back to the client
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=reduced.pdf');
    res.send(Buffer.from(reducedPdfBytes));

    // Clean up the uploaded file
    fs.unlinkSync(filePath);
  } catch (error) {
    console.error('Error processing PDF:', error);
    res.status(500).send('An error occurred while processing the PDF.');
  }
});

module.exports.handler = serverless(app);