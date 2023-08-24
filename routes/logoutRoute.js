const express = require('express');
const { logoutUser } = require('../controllers/logoutController');
const router = express.Router();


router.get('/', logoutUser);

module.exports = router;