const http = require('http'); //mengimport modul http dari node

const server = http.createServer((req, res) => { // Membuat server yang merespons "Hello, World!" untuk setiap permintaan
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello, World!');
});

// Server berjalan di port 3000
server.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});
