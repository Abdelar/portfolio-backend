const { validationResult } = require('express-validator');

const { sendEmail, template } = require('../util/sendEmail');
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
			sendEmail({
				from: email,
				to: process.env.OUTLOOK_MAIL,
				subject: 'The Portfolio Website Contact Form',
				html: template({ email, emailBody }),
			})
				.then(info => console.log(info.response))
				.catch(err => console.error(err));
		})
		.catch(err => {
			err.msg = "Can't save email";
			err.httpStatusCode = 500;
			next(err);
		});
};
