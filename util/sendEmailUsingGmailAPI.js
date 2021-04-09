const { google } = require('googleapis');
const createRawEmail = require('./createRawEmail');

const token = {
	access_token: process.env.ACCESS_TOKEN,
	refresh_token: process.env.REFRESH_TOKEN,
	scope: process.env.SCOPE,
	token_type: process.env.TOKEN_TYPE,
	expiry_date: Number(process.env.EXPIRY_DATE),
};

authorize(sendEmailUsingGmailAPI);

function authorize(callback) {
	const oAuth2Client = new google.auth.OAuth2(
		process.env.CLIENT_ID,
		process.env.CLIENT_SECRET,
		process.env.REDIRECT_URI
	);

	oAuth2Client.setCredentials(token);
	callback(oAuth2Client);
}

function sendEmailUsingGmailAPI(auth) {
	const gmail = google.gmail({ version: 'v1', auth });
	gmail.users.messages
		.send({
			userId: 'me',
			requestBody: {
				raw: createRawEmail(
					{
						name: 'Abdellatif Elaroussi',
						email: 'elaroussi.dev@gmail.com',
					},
					{
						name: 'Abdel Elaroussi',
						email: 'elaroussi@outlook.com',
					},
					'New Email From Abdell.tech  Contact Form',
					'this is a test email body 😄'
				),
			},
		})
		.then(res => console.log(res.data))
		.catch(console.error);
}
