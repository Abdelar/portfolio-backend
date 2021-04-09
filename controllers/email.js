const { validationResult } = require('express-validator');

const sendEmail = require('../util/sendEmailUsingGmailAPI');
const Email = require('../models/email');

module.exports.postEmail = (req, res, next) => {
	const { email, emailBody } = req.body;

	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	const emailObj = new Email({ email, emailBody });
	emailObj
		.save()
		.then(() => {
			res.json({ message: 'email saved' });
			return sendEmail(
				{
					name: 'Abdellatif Elaroussi on behalf of ' + email,
					email: process.env.GOOGLE_MAIL,
				},
				{ name: 'Elaroussi Abdellatif', email: process.env.OUTLOOK_MAIL },
				'New Email From Abdell.tech Contact Form',
				emailBody
			);
		})
		.catch(err => {
			err.msg = "Can't save email";
			err.httpStatusCode = 500;
			next(err);
		});
};
