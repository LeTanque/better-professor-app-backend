const request = require('supertest');
const server = require('./server.js');

// testing endpoints
//returns correct http status code

describe('server.js', () => {
  describe('GET /', () => {

    // async await style (MY FAVORITE)
    it('should respond with 200 OK', async () => {
      const response = await request(server).get('/')
      expect(response.status).toBe(200);
    })

    it('should respond with 200 OK', () => {
      return request(server).get('/').expect(200);    // Shorter syntax (for status codes)
    })

    it('should return JSON', () => {
      return request(server).get('/').then(res => {
        expect(res.type).toBe('application/json')
      })
    })

  })
})