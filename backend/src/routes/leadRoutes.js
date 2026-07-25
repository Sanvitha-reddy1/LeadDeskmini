const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadController');
const authMiddleware = require('../middleware/auth');

router.post('/', leadController.createLead);
router.get('/', authMiddleware, leadController.getLeads);
router.patch('/:id', authMiddleware, leadController.updateLeadStatus);

module.exports = router;
