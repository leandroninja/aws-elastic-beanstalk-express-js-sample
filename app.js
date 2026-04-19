'use strict';

// Entry point kept for AWS Elastic Beanstalk compatibility.
// The application logic now lives in src/.
require('dotenv').config();
require('./src/server');
