const express = require('express');
const {
  addJob,
  updateJob,
  filterJob,
  getJob,
} = require('../controllers/jobControllers');
const { isLoggedIn } = require('../middleware/auth');

const router = express.Router();

router.post('/addjob', isLoggedIn, addJob);

router.put('/updatejob/:id', isLoggedIn, updateJob);

router.get('/job', isLoggedIn, filterJob);

router.get('/job/:id', isLoggedIn, getJob);

module.exports = router;
