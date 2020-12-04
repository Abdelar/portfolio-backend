const express = require('express');
const mongoose = require('mongoose');

const emailRoutes = require('./Routes/email');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', emailRoutes);

app.use((req, res) => {
	res.status(404).json({
		message: "Sorry can't find that!",
	});
});

app.use((error, req, res, next) => {
	console.log(error);
	res
		.status(error.httpStatusCode || 500)
		.json({ message: error.msg || 'Something broke!' });
});

mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => app.listen(process.env.PORT || 3000))
	.catch(err => console.error(err));
