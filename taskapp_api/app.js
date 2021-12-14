const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const database = require('./config/database');
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

database.connect();

app.use('/user', userRoutes);
app.use('/task', taskRoutes);

module.exports = app;