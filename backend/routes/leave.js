const express = require('express');
const { requestLeave } = require('../controllers/leaveController');

const router = express.Router();

router.post('/request', requestLeave);

module.exports = router;
