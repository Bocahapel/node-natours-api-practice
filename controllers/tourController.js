const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
); //to read from file into json

exports.getAll = (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: {
      tours: tours,
    },
  });
};

exports.getById = (req, res) => {
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

exports.updateData = (req, res) => {
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

exports.addData = (req, res) => {
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

exports.deleteData = (req, res) => {
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
