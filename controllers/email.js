const Email = require('../models/email');

module.exports.postEmail = (req, res) => {
	const email = new Email(req.body);
	email
		.save()
		.then(() => {
			res.json({ message: 'email saved' });
		})
		.catch(err => {
			console.log(err);
			res.status(500).json({
				message: "Couldn't save the email",
			});
		});
};
