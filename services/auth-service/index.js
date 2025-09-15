const express = require('express');
const { body, validationResult } = require('express-validator');
const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();
const bcrypt = require ('bcrypt');

const app = express();

const PORT = 3000;

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Auth service is listening on port ${PORT}`);
});

app.get ('/healthz', (req, res) => {
    res.send(`Auth service is healthy and listening on port ${PORT}`)
})

app.post(
  '/register',
  body('email').isEmail(),
  body('password').isLength({ min: 8 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 

    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      data: {
      'email': email,
      'password': hashedPassword
      }
    };
    const newUser = await prisma.user.create(user);
    return res.status(200).json(newUser);
  }
);
