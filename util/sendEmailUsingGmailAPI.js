const { google } = require('googleapis');
const createRawEmail = require('./createRawEmail');

const token = {
	access_token: process.env.ACCESS_TOKEN,
	refresh_token: process.env.REFRESH_TOKEN,
	scope: process.env.SCOPE,
	token_type: process.env.TOKEN_TYPE,
	expiry_date: Number(process.env.EXPIRY_DATE),
};

function authenticate(callback, ...emailOptions) {
	const oAuth2Client = new google.auth.OAuth2(
		process.env.CLIENT_ID,
		process.env.CLIENT_SECRET,
		process.env.REDIRECT_URI
	);

	oAuth2Client.setCredentials(token);
	return callback(oAuth2Client, ...emailOptions);
}

function send(auth, ...emailOptions) {
	const gmail = google.gmail({ version: 'v1', auth });
	return gmail.users.messages.send({
		userId: 'me',
		requestBody: {
			raw: createRawEmail(...emailOptions),
		},
	});
}

module.exports = function (...emailOptions) {
	return authenticate(send, ...emailOptions);
};
