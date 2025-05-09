import express from 'express'
import db from './db.js';
import __dirname from './util/rootpath.js'
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public')); 

app.get('/', (req, res) => {
  db.all('SELECT * FROM albums', (err, rows) => {
    if (err) return res.status(500).send('Adatbázis hiba');
    res.render('index');
  });
});
app.use('/weboldal', (req, res) =>{
  res.sendFile("./views/index.html", {root: __dirname});
} )
app.use((req, res)=>{
  res.status(404).sendFile("./views/404.html", {root: __dirname} );
})
app.listen(3000, () => {
  console.log('Szerver fut a http://localhost:3000 címen');
});