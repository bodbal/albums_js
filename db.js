import sqlite3 from 'sqlite3';
const db = new sqlite3.Database('albums.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS albums (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    zenekar TEXT,
    cim TEXT,
    ev INTEGER,
    mufaj TEXT
  )`);

  db.get("SELECT COUNT(*) as count FROM albums", (err, row) => {
    if (row.count === 0) {
      db.run(`INSERT INTO albums (zenekar, cim, ev, mufaj) VALUES
        ('Metallica', 'Master of Puppets', 1986, 'Metal'),
        ('Coldplay', 'Parachutes', 2000, 'Pop Rock')`);
    }
  });
});

export default db;
