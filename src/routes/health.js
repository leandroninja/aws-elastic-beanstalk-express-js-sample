'use strict';

const { Router } = require('express');

const router = Router();
const startTime = Date.now();

// GET /health
router.get('/', (req, res) => {
  const uptimeMs = Date.now() - startTime;
  res.json({
    status: 'ok',
    uptime: uptimeMs,
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;
