'use strict';

const request = require('supertest');

// Set env before requiring app
process.env.NODE_ENV = 'test';

const app = require('../src/app');

describe('GET /', () => {
  it('returns 200 with welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
    expect(res.body.message).toMatch(/Welcome/i);
  });
});

describe('GET /health', () => {
  it('returns 200 with status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body).toHaveProperty('uptime');
    expect(res.body).toHaveProperty('timestamp');
  });
});

describe('POST /echo', () => {
  it('echoes a valid message', async () => {
    const res = await request(app)
      .post('/echo')
      .send({ message: 'hello world' });
    expect(res.statusCode).toBe(200);
    expect(res.body.echo).toBe('hello world');
  });

  it('returns 422 when message is missing', async () => {
    const res = await request(app).post('/echo').send({});
    expect(res.statusCode).toBe(422);
    expect(res.body).toHaveProperty('errors');
  });

  it('returns 422 when message exceeds 500 chars', async () => {
    const res = await request(app)
      .post('/echo')
      .send({ message: 'a'.repeat(501) });
    expect(res.statusCode).toBe(422);
  });
});

describe('404 handler', () => {
  it('returns 404 for unknown routes', async () => {
    const res = await request(app).get('/does-not-exist');
    expect(res.statusCode).toBe(404);
  });
});
