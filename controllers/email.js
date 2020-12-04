const Email = require('../models/email');

module.exports.postEmail = (req, res, next) => {
	const email = new Email(req.body);
	email
		.save()
		.then(() => {
			res.json({ message: 'email saved' });
		})
		.catch(err => {
			err.msg = "Can't save email";
			err.httpStatusCode = 422;
			next(err);
		});
};
