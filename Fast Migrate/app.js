const express = require('express');
const country_router = require('./routes/country');
const mongo = require('./utils/db');
const port = 3000;

var db;
async function loadDBClient() {
	try {
		db = await mongo.connectToDB();
	}catch(err){
		throw new Error('Could not connect to the Mongo DB');
	}
};

loadDBClient();

const app = express();

app.use((req, res, next) => {
	req.db = db;	
	next();
});

app.use(express.static('public'));
app.use(express.json());
app.use('/country', country_router);



server = app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});

process.on('SIGINT', () => {
	console.info('SIGINT signal received.');
	console.log('Closing Mongo Client.');
	mongo.closeDBConnection();
	server.close(() => {
	  console.log('Http server closed.');
	});
 });
