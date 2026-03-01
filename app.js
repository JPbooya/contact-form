import express from 'express';

const app = express();

app.set('view engine', ejs);

const PORT = 3010;
// contactcs array
const contacts = [];
// essential for req.body too parse data
app.use(express.urlencoded({extended : true}));

// accessing through the main directory
app.use(express.static(import.meta.dirname));

// main dir route
app.get('/', (req, res) => {
  res.render(`${import.meta.dirname}/index.html`);
});

// confirmation route
app.get('/confirmation', (req, res) => {
  res.render(`${import.meta.dirname}/confirmation.html`)
});

// admin route too display data
app.get('/admin', (req,res) => {
  res.render('admin', {contacts} );
});

app.post('/confirmation', (req, res) => {
  const {fname, lname, jname, cname, liname, ename, meet, message} = req.body;
  contacts.push({fname, lname, jname, cname, liname, ename, meet, message, timestamp: new Date().toLocaleString()});
  console.log(contacts);
  res.render(`confirmation`, { fname, lname, jname, cname, liname, ename, meet, message});
});

app.listen(PORT, () => {
  console.log(`Server is running at http://64.23.169.154:${PORT}`);
});