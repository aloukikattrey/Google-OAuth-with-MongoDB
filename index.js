import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Hello aloukik!');
});


const PORT = process.env.PORT || 3000;
app.listen(PORT);