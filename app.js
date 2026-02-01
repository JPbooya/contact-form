import express from 'express';

const app = express();

const PORT = 3000;

// accessing through the main directory
app.use(express.static(import.meta.dirname));

app.get('/', (req, res) => {
  res.sendFile(`${import.meta.dirname}/index.html`);
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});