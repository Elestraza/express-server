const express = require('express');
const { createAppeal, takeAppeal, finishAppeal, cancelAppeal, getAppeals, cancelAllInProgress } = require('../controllers/appealController');

const router = express.Router();

router.post('/appeals', createAppeal);
router.put('/appeals/:id/take', takeAppeal);
router.put('/appeals/:id/finish', finishAppeal);
router.put('/appeals/:id/cancel', cancelAppeal);
router.get('/appeals', getAppeals);
router.put('/appeals/cancelAll', cancelAllInProgress);

module.exports = router;