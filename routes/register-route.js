const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../api/secrets.js');
const db = require('../data/dbConfig.js');

router.post('/', async (req, res) => {
  try {
    // testing
    let user = req.body;
    if (!user.username || !user.password) {
      res.status(400).json({ message: "please fill in all fields" });
    } else {
      user.password = bcrypt.hashSync(user.password, 12);
      const id = await db('users').insert(user).returning("id");
      res.status(201).json({ message: "Registration Complete", registered: true });
    }
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id
  },
    secret = secrets.jwtSecret;
  const options = {
    expiresIn: '1d',
  }
  return jwt.sign(payload, secret, options);
}

module.exports = router;