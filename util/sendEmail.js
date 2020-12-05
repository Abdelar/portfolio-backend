const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.GOOGLE_MAIL,
		pass: process.env.GOOGLE_PASS,
	},
});

module.exports.sendEmail = mailOptions => {
	return transporter.sendMail(mailOptions);
};
