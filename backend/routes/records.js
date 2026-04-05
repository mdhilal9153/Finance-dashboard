const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const {createRecord, getRecords, updateRecord, deleteRecord, getRecordById} = require('../controllers/recordController');
const roleMiddleware = require('../middlewares/roleMiddleware');

router.get('/allrecords',authMiddleware,roleMiddleware(['admin','analyst']),getRecords);

router.post('/create',authMiddleware,roleMiddleware(['admin']),createRecord)

router.get('/onerecord/:id',authMiddleware,roleMiddleware(['admin','analyst']),getRecordById);

router.put('/update/:id',authMiddleware,roleMiddleware(['admin']),updateRecord);

router.delete('/delete/:id',authMiddleware,roleMiddleware(['admin']),deleteRecord);

module.exports = router;