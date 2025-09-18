const express = require('express');
const { body, validationResult } = require('express-validator');
const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();
const bcrypt = require ('bcrypt');
const jsonjwt = require('jsonwebtoken');

const jwt_secret = process.env.JWT_SECRET

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
  [ body('email').isEmail(), body('password').isLength({ min: 8 }) ],
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

    try {
      
      const existingUser = await prisma.user.findUnique({
        where: { 'email': email }
      });


      if (existingUser) {
        return res.status(409).json({"message": "User already exists"});
      }

      const newUser = await prisma.user.create(user);

      const payload = {
          "userId": newUser.id
      }

      const jwt = jsonjwt.sign(payload,jwt_secret,{ expiresIn: '1h' });

      return res.status(201)
      .json({ "message": "User created successfully", "userId": newUser.id , "userEmail": newUser.email, "jwt": jwt})
      }
    catch(error) {
      return res.status(500).json({"message": "Oops! Something went wrong, please try agian later"})
     }
      })

app.post(
  '/login',
  [ body('email').isEmail(),body('password').notEmpty() ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } 
    const { email, password } = req.body;

    try {
      const loggedUser = await prisma.user.findUnique({
        where: {
          "email": email
        }
      })
      if (!loggedUser) {
        return res.status(404).json({"message": "Invalid credentials"});
      }

      const passwordMatch = await bcrypt.compare(password, loggedUser.password)

      if (!passwordMatch) {
        return res.status(401).json({"message": "Invalid credentials"});
      }

      const payload = {
          "userId": loggedUser.id
      }
      const jwt = jsonjwt.sign(payload,jwt_secret,{ expiresIn: '1h' });

      return res.status(200).json({"message": "Logged in successfuly!", "jwt": jwt})
    }
  
    catch(error) {
      return res.status(500).json({"message": "Oops! Something went wrong, please try again later"})
    }
})
