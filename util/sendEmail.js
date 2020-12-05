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

module.exports.template = ({ email, emailBody }) => `
        <div style="
            font-family:sans-serif;
            background-color:#3D414E;
            color:#eee;
            height:100%;
            padding:1em;
            letter-spacing:.08em;
            border-radius:.2em;
                                ">
  <h1 style="
             margin:0;
             padding:0;
             font-size:1.3em;
            text-decoration:none;
             ">${email}</h1>
  <p style="
            background-color:#EEE;
            color:#3D414E;
            padding:1em;
            border-radius:.2em;
            margin:1em 0 1em;
             ">${emailBody}</p>
<div style="
            opacity:0.5;
            text-transform:uppercase;
            letter-spacing:.2em;
            font-weight:200;
            font-size:.8em;
            text-decoration:none;
            ">elaroussi.dev</div>
 
<div style="
            opacity:0.5;
            margin-top:.5em;
            font-size:.8em;
            ">${new Date().toDateString()}</div>
</div> 
`;
