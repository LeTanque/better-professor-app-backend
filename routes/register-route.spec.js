const request = require('supertest');
const server = require('../api/server.js');
const login = require('./login-route.js');
const db = require('../data/dbConfig.js');
const bcrypt = require('bcryptjs');

describe('Register Route', () => {
  describe('GET /api/register', () => {
    beforeAll(async () => {
      await db('users').truncate();
    })

    it("should return a status 201", async () => {
      const res = await request(server).post('/api/register').send({ username: "testregister", password: "pass" });
      expect(res.status).toBe(201);
    })

    it('should return JSON', () => {
      return request(server).post('/api/register').send({ username: 'testregister', password: 'pass' }).then(res => {
        // console.log(res)
        expect(res.type).toBe('application/json')
      })
    })
  })
})