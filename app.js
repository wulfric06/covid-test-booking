const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
// const { Chalk, Validator } = require('./utils'); // need to be done

require('dotenv').config();
const routesApi = require('./src/api');

const app = express();

// Validator.customize(); // to customize the validate.js

app.use(morgan(':method :url :status :user-agent - :response-time ms'));
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.use('/static', express.static('static'));
app.use('/api', routesApi);

app.get('*', (_, res) => res.status(200).json({ message: 'App running well..! :)' }));

app.listen(process.env.PORT, () => {
  console.log(`App is running on http://localhost:${process.env.PORT}`);
});
