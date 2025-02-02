const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const logger = require('./middleware/logger');
const db = require('./config/db');

dotenv.config();

const app = express();

app.use(express.json())
app.use(cors()); 
app.use(logger); 


module.exports = app;
