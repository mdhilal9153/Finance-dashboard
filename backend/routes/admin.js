const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { allUsers, updateUser, deactiveUser } = require('../controllers/userController');
const router = express.Router();

router.get('/users',authMiddleware,roleMiddleware(['admin']),allUsers);

router.put('/update/:id',authMiddleware,roleMiddleware(['admin']),updateUser);

router.put('/deactivate/:id',authMiddleware,roleMiddleware(['admin']),deactiveUser);


module.exports = router;