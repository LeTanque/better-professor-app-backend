const request = require('supertest');
const server = require('../api/server.js');
const login = require('./login-route.js');
const db = require('../data/dbConfig.js');
const bcrypt = require('bcryptjs');

const pass = bcrypt.hashSync('pass', 12);
// beforeAll(async () => {
//   await db('users').truncate();
//   await db('students').truncate();
//   await db('projects').truncate();
//   await db('messages').truncate();
//   await db('student_project').truncate();

//   const users = await db('users').insert({ username: "test", password: pass })
//   const students = await db('students').insert({ firstname: "lambda", lastname: "school", email: "lambda@gmail.com", })
//   const projects = await db('projects').insert({ "project_name": "Static Code Checker", "project_deadline": "2019-05-08 12:00:00", "feedback_deadline": "2019-05-10 12:00:00", "recommendation_deadline": "2019-06-01 12:00:00" });
//   await db('messages').insert({ message: "Message1" })
//   const messages = await db('messages').insert({ message: "Message2" })
//   const studentProject = await db('student_project').insert({ student_id: 1, project_id: 1, professor_id: 1, student_message: 1, professor_message: 2 })
// })

describe('Login Route', () => {

  describe('Post /api/login', () => {

    it("should return a status 201", async () => {
      await db('users').insert({ username: "test", password: pass })
      const res = await request(server).post('/api/login').send({ username: "test", password: "pass" });
      expect(res.status).toBe(200);

    })

    it('should return JSON', () => {
      return request(server).post('/api/login').then(res => {
        expect(res.type).toBe('application/json')
      })
    })
  })
})