const express = require('express');
const tourController = require('./../controllers/tourController');

const router = express.Router();

// router.param('id', tourController.checkId);

router.route('/').get(tourController.getAll).post(tourController.addData);
// .post(tourController.checkBody, tourController.addData);
router
  .route('/:id')
  .get(tourController.getById)
  .patch(tourController.updateData)
  .delete(tourController.deleteData);

module.exports = router;
