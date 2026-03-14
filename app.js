const fs = require('fs');
const express = require('express');

const app = express();
const port = 3000;
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
);

//get
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: { tours },
  });
});

app.listen(port, () => {
  console.log(`App running on port: ${port}...`);
});
