const express = require('express');
const mongoose = require('mongoose');

const emailRoutes = require('./Routes/email');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', emailRoutes);

mongoose
	.connect(process.env.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => app.listen(process.env.PORT || 3000))
	.catch(err => console.error(err));
