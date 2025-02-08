const serverless = require('serverless-http');
const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();

app.get('/download-text', (req, res) => {
  try {
    const filePath = path.join(__dirname, 'sample.txt');
    if (!fs.existsSync(filePath)) {
      return res.status(404).send('File not found');
    }
    res.download(filePath, 'sample.txt', (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        res.status(500).send('An error occurred while downloading the file.');
      }
    });
  } catch (error) {
    console.error('Error downloading file:', error);
    res.status(500).send('An error occurred while downloading the file.');
  }
});

module.exports.handler = serverless(app);