'use strict';

// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  const status = err.status || err.statusCode || 500;
  const isDev = process.env.NODE_ENV !== 'production';

  console.error(`[${new Date().toISOString()}] ${err.stack || err.message}`);

  res.status(status).json({
    error: {
      message: status === 500 && !isDev ? 'Internal Server Error' : err.message,
      ...(isDev && { stack: err.stack }),
    },
  });
};

module.exports = errorHandler;
