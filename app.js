const express = require('express');
const app = express();
const db = require('./db');

app.set('view engine', 'ejs');
app.use(express.static('public')); // ha van CSS

app.get('/', (req, res) => {
  db.all('SELECT * FROM albumok', (err, rows) => {
    if (err) return res.status(500).send('Adatbázis hiba');
    res.render('index', { albums: rows });
  });
});

app.listen(3000, () => {
  console.log('Szerver fut a http://localhost:3000 címen');
});