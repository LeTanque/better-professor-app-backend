const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../api/secrets.js');
const db = require('../data/dbConfig.js');

// // get all students
// router.get('/', async (req, res) => {
//   try {
//     const students = await db('student-project');
//     res.status(200).json(students);
//   } catch (error) {
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// // Get a student
// router.get('/:id', async (req, res) => {
//   try {
//     const id = req.params.id
//     const student = await db('students').where({ id }).first()
//     res.status(200).json(student)
//   } catch (err) {
//     res.status(500).json({ message: "Error trying to GET student!" })
//   }
// })

// // create new student
// router.post('/', async (req, res) => {
//   try {
//     let student = req.body;
//     if (!student.firstname || !student.lastname || !student.email) {
//       res.status(400).json({ message: "please fill in all fields" });
//     } else {
//       const id = await db('students').insert(student).returning("id");
//       res.status(201).json({ message: `${student.firstname} has been registered` })
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" })
//   }
// })


// // destroy student
// router.delete('/:id', async (req, res) => {
//   try {
//     const id = req.params.id;
//     const numDeleted = await db('students').where({ id }).del();
//     if (numDeleted != 0) {
//       res.status(201).json({ message: "User Deleted" });
//     } else {
//       res.status(404).json({ message: "No record found!" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Internal Server Error" })
//   }
// });

// // update student
// router.put('/:id', async (req, res) => {
//   try {
//     const id = req.params.id;
//     const numUpdated = await db('students')
//       .where({ id })
//       .update({
//         firstname: req.body.firstname,
//         lastname: req.body.lastname,
//         email: req.body.email
//       })
//     if (numUpdated != 0) {
//       res.status(201).json({ message: `You changed the student's info` })
//     } else {
//       res.status(404).json({ message: 'No record found' });
//     }
//   } catch (err) {
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// })

module.exports = router;