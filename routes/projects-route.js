const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../api/secrets.js');
const db = require('../data/dbConfig.js');

// get all projects
router.get('/', async (req, res) => {
  try {
    const projects = await db('projects');
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get a project
router.get('/:id', async (req, res) => {
  try {
    // console.log("GET project")
    const id = req.params.id
    // console.log("id: ", id)
    const project = await db('projects').where({ id }).first()
    // console.log("project: ", project)
    res.status(200).json(project)
  } catch (err) {
    res.status(500).json({ message: "Error trying to GET project!" })
  }
})

// create new project
router.post('/', async (req, res) => {
  const {
    projectName: project_name,
    projectDeadline: project_deadline,
    feedbackDeadline: feedback_deadline,
    recommendationDeadline: recommendation_deadline
  } = req.body;
  try {
    let project = req.body;
    if (!project_name || !project_deadline || !feedback_deadline || !recommendation_deadline) {
      res.status(400).json({ message: "please fill in all fields" });
    } else {
      const id = await db('projects').insert({ project_name, project_deadline, feedback_deadline, recommendation_deadline }).returning("id");
      res.status(201).json({ message: `${project_name} has been created` })
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
})


// destroy projects
router.delete('/:id', async (req, res) => {
  try {
    console.log("delete Route")
    const id = req.params.id;
    console.log("id: ", id)
    const numDeleted = await db('projects').where({ id }).del();
    console.log("numDeleted: ", numDeleted)
    if (numDeleted != 0) {
      console.log("if: true")
      res.status(201).json({ message: "Project Deleted" });
    } else {
      console.log("if: false")
      res.status(404).json({ message: "No record found!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" })
  }
});

// update project
router.put('/:id', async (req, res) => {
  const {
    projectName: project_name,
    projectDeadline: project_deadline,
    feedbackDeadline: feedback_deadline,
    recommendationDeadline: recommendation_deadline
  } = req.body;
  try {
    console.log('put');
    const id = req.params.id;
    console.log('id: ', id);
    const numUpdated = await db('projects')
      .where({ id })
      .update({
        project_name,
        project_deadline,
        feedback_deadline,
        recommendation_deadline
      })
    console.log('numUpdated: ', numUpdated);
    if (numUpdated != 0) {
      console.log('status 201');
      res.status(201).json({ message: `You changed the project's info` })
    } else {
      res.status(404).json({ message: 'No record found' });
    }
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
})

module.exports = router;