const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json()); //middleware
const port = 3000; //port

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`),
); //to read from file into json

//controller
const getAll = (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: {
      tours: tours,
    },
  });
};

const getById = (req, res) => {
  const id = Number(req.params.id);
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
};

const updateData = (req, res) => {
  const id = Number(req.params.id);
  const tour = tours.find((el) => el.id === id);
  if (!tour) {
    return res.status(404).json({ status: 'Fail', message: 'Invalid id' });
  }
  res.status(200).json({
    status: 'success',
    data: { message: '<Updated Data>' },
  });
};

const addData = (req, res) => {
  console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      if (err) {
        return res
          .status(500)
          .json({ status: 'error', message: 'Failed to save data' });
      }
      res.status(201).json({ status: 'success', data: { tour: newTour } });
    },
  );
};

const deleteData = (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      data: {
        message: 'Invalid id',
      },
    });
  }
  res.status(204).json({ status: 'success', data: null });
};

//get
// app.get('/api/v1/tours', getAll);

//get by id
// app.get('/api/v1/tours/:id', getById);

//patch
// app.patch('/api/v1/tours/:id', updateData);

//post
// app.post('/api/v1/tours', addData);

// delete
// app.delete('/api/v1/tours/:id', deleteData);

app.route('/api/v1/tours').get(getAll).post(addData);
app
  .route('/api/v1/tours/:id')
  .get(getById)
  .patch(updateData)
  .delete(deleteData);

//port 3000
app.listen(port, () => {
  console.log(`App running on port: ${port}...`);
});
