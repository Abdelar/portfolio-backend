const { validationResult } = require('express-validator');

const { sendEmail } = require('../util/sendEmail');
const Email = require('../models/email');

module.exports.postEmail = (req, res, next) => {
	const { email, emailBody } = req.body;

	console.log({ email, emailBody });

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
				subject: 'From The Portfolio Website',
				text: `
				from: ${email}
				message: ${emailBody}
				Date: ${new Date()}
				`,
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
