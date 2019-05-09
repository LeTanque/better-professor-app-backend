const express = require('express');
const server = express();
const helmet = require('helmet');
const cors = require('cors');
const faker = require('faker');

const db = require('../data/dbConfig.js');
const restricted = require('./restricted-middleware.js');

// Routes
const loginRouter = require('../routes/login-route.js');
const registerRouter = require('../routes/register-route.js');
const studentsRouter = require('../routes/students-route.js');
const projectsRouter = require('../routes/projects-route.js');
const studentsProjectsRouter = require('../routes/students-projects-route.js');
const profStudentInfoRouter = require('../routes/professor-student-route.js');

// Middleware
require('dotenv').config();
server.use(helmet());
server.use(express.json());
server.use(cors());

// Testing Route / easteregg :)
server.get('/', (req, res) => {
  res.status(200).json({ message: `${faker.hacker.phrase()}` });
})

// Routing
server.use('/api/login', loginRouter)
server.use('/api/register', registerRouter)
// server.use('/api/logout', logoutRouter)

server.use('/api/students', restricted, studentsRouter)
server.use('/api/projects', restricted, projectsRouter)
server.use('/api/students-projects', restricted, studentsProjectsRouter)
server.use('/api/professor-student-info', restricted, profStudentInfoRouter)

// server.get('/users', async (req, res) => {
//   const users = await db('users');
//   res.status(200).json(users);
// })

module.exports = server;