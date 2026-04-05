const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');
const { getSummary, getCategories, getTrends, getRecent } = require('../controllers/dashboardController');
const router = express.Router();

router.get('/summary',authMiddleware,roleMiddleware(['admin','analyst','viewer']),getSummary);

router.get('/categories',authMiddleware,roleMiddleware(['admin','analyst','viewer']),getCategories);

router.get('/trends',authMiddleware,roleMiddleware(['admin','analyst','viewer']),getTrends);

router.get('/recent',authMiddleware,roleMiddleware(['admin','analyst','viewer']),getRecent);

module.exports = router;