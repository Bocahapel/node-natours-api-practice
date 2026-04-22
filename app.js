const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json()); //middleware
const port = 3000; //port

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
); //to read from file into json

//get
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: {
      tours: tours,
    },
  });
});

//get by id
app.get('/api/v1/tours/:id', (req, res) => {
  const tour = tours.find((el) => el.id === req.params);
  res.status(200).json({
    status: 'Success',
    // data: { tours },
  });
});

//post
app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);

  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({ status: 'success', data: { tour: newTour } });
    },
  );
  res.send('Done');
});

app.listen(port, () => {
  console.log(`App running on port: ${port}...`);
});
