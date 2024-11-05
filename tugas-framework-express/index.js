const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Middleware untuk log setiap permintaan
app.use((req, res, next) => {
  console.log(`${req.method} request for '${req.url}'`);
  next();
});

// Middleware untuk serve file statis dari direktori "public"
app.use(express.static(path.join(__dirname, 'public')));

// Route untuk /hello
app.get('/hello', (req, res) => {
  res.json({
    message: "Success fetch message",
    data: "Hello World!"
  });
});

// Route untuk /user
app.get('/user', (req, res) => {
  res.json({
    message: "Success fetch user",
    data: {
      id: 1,
      name: "Budi",
      username: "budidu",
      email: "budidu@mail.com"
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
