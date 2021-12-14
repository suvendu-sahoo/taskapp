const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const TaskController = require('../controllers/task');
const TaskValidator = require('../validators/task');
const validate = require('../validators/validate');

router.get('/', auth, TaskController.list);
router.post('/', auth, TaskValidator.create(), validate, TaskController.create);
router.put('/:_id', auth, TaskValidator.create(), validate, TaskController.update);
router.put('/:_id/status', validate, auth, TaskController.updateStatus);
router.delete('/:_id', auth, TaskController.delete);

module.exports = router;