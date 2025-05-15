const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

const db = new sqlite3.Database('albums.db');
db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS albums (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    band TEXT NOT NULL,
    title TEXT NOT NULL,
    year INTEGER NOT NULL,
    genre TEXT NOT NULL
  )`);
});

app.get('/api/albums', (req, res) => {
  db.all('SELECT * FROM albums', (err, rows) => {
    if (err) return res.status(500).send(err);
    res.json(rows);
  });
});

app.get('/api/albums/:id', (req, res) => {
  db.get('SELECT * FROM albums WHERE id = ?', [req.params.id], (err, row) => {
    if (err) return res.status(500).send(err);
    res.json(row);
  });
});

app.post('/api/albums', (req, res) => {
  const { band, title, year, genre } = req.body;
  if (!band || !title || !year || !genre) return res.status(400).send('Invalid input');
  db.run('INSERT INTO albums (band, title, year, genre) VALUES (?, ?, ?, ?)', [band, title, year, genre], function (err) {
    if (err) return res.status(500).send(err);
    res.json({ id: this.lastID });
  });
});

app.put('/api/albums/:id', (req, res) => {
  const { band, title, year, genre } = req.body;
  db.run('UPDATE albums SET band = ?, title = ?, year = ?, genre = ? WHERE id = ?', [band, title, year, genre, req.params.id], function (err) {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

app.delete('/api/albums/:id', (req, res) => {
  db.run('DELETE FROM albums WHERE id = ?', [req.params.id], function (err) {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));