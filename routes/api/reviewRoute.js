const express = require('express');
const router = express.Router();


router.route('/:restaurant_id').get();

module.exports = router;