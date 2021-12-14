const mongoose = require('mongoose');

exports.connect = () => {
  	mongoose
  	.connect(process.env.MONGODB_CONNECTION)
    .then(() => {
    	console.log('Database connected successfully.');
    })
    .catch((error) => {
    	console.log('Database connection failed.', error);
    	process.exit(1);
    });
};