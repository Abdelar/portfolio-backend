const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cors = require('cors');

const emailRoutes = require('./Routes/email');

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', emailRoutes);

// 404 errors
app.use((req, res) => {
	res.status(404).json({
		message: "Sorry can't find that!",
	});
});

//General errors
app.use((error, req, res, next) => {
	console.error(error);
	res
		.status(error.httpStatusCode || 500)
		.json({ message: error.msg || 'Something broke!' });
});

mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => app.listen(process.env.PORT || 4000))
	.catch(err => console.error(err));
