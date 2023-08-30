const express = require('express');
const {getUsers, getUser, putUser, deleteUsers} = require('../../controllers/userController')
const router = express.Router();

router.route('/').get(getUsers)
router.route('/:username').get(getUser).put(putUser).delete(deleteUsers)

module.exports = router;