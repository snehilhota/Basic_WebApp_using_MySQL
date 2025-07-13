const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require('express');
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'om06@swapnil99',
  database: 'join_us'
});

app.get('/', (req, res) => {
  const q = 'SELECT COUNT(*) AS count FROM users';
  connection.query(q, (err, results) => {
    if (err) throw err;
    const count = results[0].count;
    res.render('home', { count });
  })
})

app.post('/register', (req, res) => {
  const person = {
    email: req.body.email
  };
  connection.query('INSERT INTO users SET ?', person, (err, results) => {
    if(err) throw err;
    console.log(results);
    res.redirect('/');
  })
})

app.listen(3000, () => {
  console.log('LISTENING ON PORT 3000!');
})