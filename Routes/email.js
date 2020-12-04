const express = require('express');
const { body } = require('express-validator');

const { postEmail } = require('../controllers/email');

const router = express.Router();

router.post(
	'/email',
	[
		body('email').isEmail().normalizeEmail(),
		body('emailBody').trim().not().isEmpty(),
	],
	postEmail
);

module.exports = router;
