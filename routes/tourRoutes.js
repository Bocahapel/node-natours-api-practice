const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

router.route('/').get(tourController.getAll).post(tourController.addData);
router
  .route('/:id')
  .get(tourController.getById)
  .patch(tourController.updateData)
  .delete(tourController.deleteData);

module.exports = router;
