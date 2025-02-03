const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const logger = require('./middleware/logger');
const db = require('./config/db');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const CustomerRoute = require('./routes/CustomerRoute');

dotenv.config();

const app = express();

app.use(express.json())
app.use(cors()); 
app.use(logger); 
const swaggerDocument = YAML.load('./docs/customer-api.yaml');


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', CustomerRoute);


module.exports = app;
