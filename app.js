import express from 'express';
import mysql2 from 'mysql2';
import dotenv from 'dotenv';
import { validateForm } from './validation.js';

// load enviroment variables from .env
dotenv.config()
console.log(process.env.DB_HOST);

// create a pool bucket of database connections
const pool = mysql2.createPool({
  host: process.env.DB_HOST,
  user:process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT
}).promise();


const app = express();

// essentail for ejs
app.set('view engine', 'ejs');

const PORT = 3010;

// essential for req.body too parse data
app.use(express.urlencoded({extended : true}));

// serves statics files from the project directory
app.use(express.static(import.meta.dirname));

// main dir route
app.get('/', (req, res) => {
  res.render('resume');
});

// contact route
app.get('/contact', (req, res) => {
  res.render('contact')
});

// confirmation fallback route
app.get('/confirmation', (req, res) => {
  res.render('contact')
});

// portfolio route
app.get('/portfolio', (req, res) => {
  res.render('portfolio');
});

// admin route too retreive and display all contacts from database.
app.get('/admin', async (req,res) => {
  try {
    const contacts = await pool.query('SELECT * FROM contacts')
    res.render('admin', { contacts : contacts [0]});
  } catch (err) {
    console.error('Database error: ', err);
  }
});

// async and await function to retrieve data and send back.
app.post('/confirmation', async (req, res) => { 
   const {fname, lname, jname, cname, liname, ename, meet, message, mailingList, format} = req.body;

  // Calls validate form for exisiting fname, lname, meet, before saving to DB.
  const valid = validateForm({fname, lname, meet, mailingList, format});
  if (!valid.isValid) {
    res.render('contact', {errors: valid.errors});
    return;
  }

  try {
    await pool.query
    ('INSERT INTO contacts (fname, lname, jname, cname, liname, ename, meet, message) VALUES (?, ?, ?, ?, ?, ?, ?, ?)', 
      [fname, lname, jname, cname, liname, ename, meet, message,]);
    res.render('confirmation', 
      { fname, lname, jname, cname, liname, ename, meet, message, timestamp: new Date().toLocaleString()});
  } catch (err) {
    console.error('Database error: ', err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://64.23.169.154:${PORT}`);
});