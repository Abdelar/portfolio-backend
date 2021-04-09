module.exports = function (sender, recipient, subject, body) {
	const utf8Subject = `=?utf-8?B?${Buffer.from(subject).toString('base64')}?=`;
	const messageParts = [
		`From: ${sender.name} <${sender.email}>`,
		`To: ${recipient.name} <${recipient.email}>`,
		'Content-Type: text/html; charset=utf-8',
		'MIME-Version: 1.0',
		`Subject: ${utf8Subject}`,
		'',
		body,
	];
	const message = messageParts.join('\n');

	// The body needs to be base64url encoded.
	return Buffer.from(message)
		.toString('base64')
		.replace(/\+/g, '-')
		.replace(/\//g, '_')
		.replace(/=+$/, '');
};
