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
  const id = req.params.id * 1;
  // if (id > tours.length) {
  //   return res.status(404).json({ status: 'Fail', message: 'Invalid id' });
  // }
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({ status: 'Fail', message: 'Invalid id' });
  }
  res.status(200).json({
    status: 'Success',
    data: { tour },
  });
});

//patch
app.patch('/api/v1/tours/id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({ status: 'Fail', message: 'Invalid id' });
  }
  res.status(200).json({
    status: 'success',
    data: { message: '<Updated Data>' },
  });
});

//post
app.post('/api/v1/tours', (req, res) => {
  console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        res
          .status(500)
          .json({ status: 'error', message: 'Failed to save data' });
      }
      res.status(201).json({ status: 'success', data: { tour: newTour } });
    },
  );
});

// delete
app.delete('/api/v1/tours/id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    res.status(404).json({
      status: 'fail',
      data: {
        message: 'Invalid id',
      },
    });
  }
  res.status(204).json({ status: 'success', data: null });
});

//port 3000
app.listen(port, () => {
  console.log(`App running on port: ${port}...`);
});
