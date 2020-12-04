const express = require('express');

const PORT = process.env.PORT || 3000;
const app = express();

app.get('/test', (req, res) => {
	console.log('hitting test endpoint');
	return res.send('test');
});

app.listen(PORT, () => console.log('server listening...'));
