const request = require('supertest');
const server = require('../api/server.js');
const db = require('../data/dbConfig.js');
const bcrypt = require('bcryptjs');

describe('Professor`s student list and info Route', () => {
  describe('GET /api/professor-student-info', () => {

    it('Route Restriction should return status code 401', async () => {
      return request(server).get('/api/students').then(res => {
        expect(res.statusCode).toBe(401);
      })
    })

    it('Route Restriction should return status code 200 and JSON data', async () => {
      await db('users').truncate();
      const pass = bcrypt.hashSync('pass', 12);
      await db('users').insert({ username: "test", password: pass })
      const res = await request(server).post('/api/login').send({ username: "test", password: "pass" });
      const token = res.body.token;
      return request(server).get('/api/professor-student-info').set('Authorization', `${token}`).then(res => {
        expect(res.status).toBe(200);
        expect(res.type).toBe('application/json')
      })
    })
    it('Database returns an array containing expected object', async () => {
      await db('users').truncate();
      const pass = bcrypt.hashSync('pass', 12);
      await db('users').insert({ username: "test", password: pass })
      const res = await request(server).post('/api/login').send({ username: "test", password: "pass" });
      const token = res.body.token;
      return request(server).get('/api/professor-student-info').set('Authorization', `${token}`).then(res => {
        expect(res.body[0].student_id).toBe(1);
      })
    })

  })
})