const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../api/secrets.js');
const db = require('../data/dbConfig.js');

router.get('/', async (req, res) => {

  const id = req.decodedJwt.subject;

  const info = await db('student_project')
    .innerJoin('users', 'users.id', '=', 'student_project.professor_id')
    .where('student_project.professor_id', '=', `${id}`)
    .select('student_id')
    .distinct('student_id');

  for (let i = 0; i < info.length; i++) {
    const { firstname, lastname, email } = await db('students').where({ 'id': `${info[i].student_id}` }).select('firstname', 'lastname', 'email').first();
    info[i].firstname = firstname;
    info[i].lastname = lastname;
    info[i].email = email;
    info[i].project = await db('projects').join('student_project', 'projects.id', '=', 'student_project.project_id')
      .where({ 'student_project.student_id': `${info[i].student_id}` })
      .select('project_id', 'project_name', 'project_deadline', 'feedback_deadline', 'recommendation_deadline')

    for (let j = 0; j < info[i].project.length; j++) {
      try {
        const { message } = await db('student_project')
          .join('messages', 'student_project.student_message', '=', 'messages.id')
          .where({ 'student_project.student_id': `${info[i].student_id}` })
          .where({ 'student_project.project_id': `${info[i].project[j].project_id}` })
          .select('message').first();

        info[i].project[j].studentMessage = message;
      } catch (error) {
        info[i].project[j].studentMessage = '';
      }

      try {
        const profmessage = await db('student_project')
          .join('messages', 'student_project.professor_message', '=', 'messages.id')
          .where({ 'student_project.professor_id': `${id}` })
          .where({ 'student_project.project_id': `${info[i].project[j].project_id}` })
          .where({ 'student_project.student_id': `${info[i].student_id}` })
          .select('message').first();

        if (profmessage.message) {
          info[i].project[j].professorMessage = profmessage.message;
        } else {
        }
      } catch (error) {
        info[i].project[j].professorMessage = '';
      }
    }

  }


  res.status(200).json(info);
});

module.exports = router;