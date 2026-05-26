// const fs = require('fs');
const Tour = require('../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`),
// ); //to read from file into json

// exports.checkId = (req, res, next) => {
//   const id = Number(req.params.id);
//   const tour = tours.find((el) => el.id === id);

//   if (!tour) {
//     return res.status(404).json({
//       status: 'fail',
//       message: 'Invalid id',
//     });
//   }

//   req.tour = tour; // optional: store it for reuse
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     return res.status(400).json({
//       status: 'fail',
//       message: 'Missing name or price',
//     });
//   }
//   next();
// };

exports.getAll = (req, res) => {
  res.status(200).json({
    status: 'Success',
    // data: {
    //   tours: tours,
    // },
  });
};

exports.getById = (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: req.tour,
  });
};

exports.updateData = (req, res) => {
  res.status(200).json({
    status: 'success',
    data: { message: '<Updated Data>' },
  });
};

exports.addData = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({ status: 'success', data: { tour: newTour } });
  } catch (err) {
    res.status(404).json({
      status: 'failed',
      message: err,
    });
  }
};
// console.log(req.body);
// const newId = tours[tours.length - 1].id + 1;
// const newTour = Object.assign({ id: newId }, req.body);
// tours.push(newTour);
// fs.writeFile(
//   `${__dirname}/../dev-data/data/tours-simple.json`,
//   JSON.stringify(tours),
//   (err) => {
//     if (err) {
//       return res
//         .status(500)
//         .json({ status: 'error', message: 'Failed to save data' });
//     }
//     res.status(201).json({ status: 'success', data: { tour: newTour } });
//   },
// );
// };

exports.deleteData = (req, res) => {
  res.status(204).json({ status: 'success', data: null });
};
