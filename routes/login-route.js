const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secrets = require('../api/secrets.js');
const db = require('../data/dbConfig.js');

router.post('/', async (req, res) => {
  try {
    let { username, password } = req.body;
    const user = await db('users').where({ username }).first();
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = generateToken(user);
      res.status(200).json({ token })
    } else {
      res.status(401).json({ message: "invalid credentials" });
    }
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id
  }
  secret = secrets.jwtSecret;
  const options = {
    expiresIn: '1d',
  }
  return jwt.sign(payload, secret, options);
}

module.exports = router;