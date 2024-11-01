const fs = require('fs');
const path = require('path');

fs.readFile(path.join(__dirname, 'konten.txt'), 'utf8', (err, data) => {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log('Isi file:', data);
});
