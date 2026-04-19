'use strict';

const { Router } = require('express');
const { body, validationResult } = require('express-validator');

const router = Router();

// GET /
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the AWS Elastic Beanstalk Express.js Sample App',
    version: process.env.npm_package_version || '2.0.0',
    environment: process.env.NODE_ENV || 'development',
  });
});

// POST /echo — example endpoint with input validation
router.post(
  '/echo',
  [
    body('message')
      .trim()
      .notEmpty()
      .withMessage('message is required')
      .isLength({ max: 500 })
      .withMessage('message must be 500 characters or fewer'),
  ],
  (req, res, _next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { message } = req.body;
    res.json({ echo: message });
  }
);

module.exports = router;
