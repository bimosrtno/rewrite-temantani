const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const logger = require('./middleware/logger');
const db = require('./config/db');
const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const CustomerRoute = require('./routes/CustomerRoute');
const ProductRoute = require('./routes/ProductRoute');
const StockinRoute = require ('./routes/StockinRoute');
const ArticlesRoute = require('./routes/ArticlesRoute');

dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); 
app.use(logger); 
const swaggerDocument = YAML.load('./docs/api-spec.yaml');


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api', CustomerRoute);
app.use('/api', ProductRoute);
app.use('/api', StockinRoute);
app.use('/api', ArticlesRoute);


module.exports = app;
