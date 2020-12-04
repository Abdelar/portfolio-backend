const { validationResult } = require('express-validator');

const Email = require('../models/email');

module.exports.postEmail = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	const email = new Email(req.body);
	email
		.save()
		.then(() => {
			res.json({ message: 'email saved' });
		})
		.catch(err => {
			err.msg = "Can't save email";
			err.httpStatusCode = 500;
			next(err);
		});
};
