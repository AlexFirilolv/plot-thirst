const express = require('express');
const { body, validationResult } = require('express-validator');
const { PrismaClient } = require('./generated/prisma');
const prisma = new PrismaClient();
const bcrypt = require ('bcrypt');
const jsonjwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Auth service is listening on port ${PORT}`);
});

const corsOptions = {
  "origin" : "http://localhost:5173"
}
app.use(cors(corsOptions));

app.use(cookieParser());

const jwt_secret = process.env.JWT_SECRET

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

      const refreshToken = jsonjwt.sign({"userId": newUser.id},jwt_secret,{ expiresIn: '7d' });
      await prisma.user.update({where: { id: newUser.id }, data: { refreshToken: refreshToken }});

      const payload = {
          "userId": newUser.id,
      }
      
      const jwt = jsonjwt.sign(payload,jwt_secret,{ expiresIn: '1h' });

      return res.status(201)
      .cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 7*24*60*60*1000 })
      .cookie('jwt', jwt, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 60*60*1000 })
      .json({ "message": "User created successfully", "userId": newUser.id , "userEmail": newUser.email } );
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

      const refreshToken = jsonjwt.sign({"userId": loggedUser.id},jwt_secret,{ expiresIn: '7d' });
      await prisma.user.update({where: { id: loggedUser.id }, data: { refreshToken: refreshToken }});

      const payload = {
          "userId": loggedUser.id
      }
      const jwt = jsonjwt.sign(payload,jwt_secret,{ expiresIn: '1h' });

      return res.status(200)
      .cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 7*24*60*60*1000 })
      .cookie('jwt', jwt, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 60*60*1000 })
      .json({"message": "Logged in successfuly!"})
    }
  
    catch(error) {
      return res.status(500).json({"message": "Oops! Something went wrong, please try again later"})
    }
})

app.post('/refresh_token', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({"message": "No refresh token provided"});
  }

  try {
    const decoded = jsonjwt.verify(refreshToken, jwt_secret);
    const userId = decoded.userId;
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({"message": "Invalid refresh token"});
    }

    const newJwt = jsonjwt.sign({ userId: user.id }, jwt_secret, { expiresIn: '1h' });

    return res.status(200)
      .cookie('jwt', newJwt, { httpOnly: true, secure: true, sameSite: 'None', maxAge: 60*60*1000 })
      .json({"message": "Token refreshed successfully"});
  }
  catch (error) {
    return res.status(500).json({"message": "Oops! Something went wrong, please try again later"});
  }});

app.get('/verify_token', async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401)
    .json({ "message": "jwt not provided"});
  }
  try {
  const verifiedToken = jsonjwt.verify(token, jwt_secret);
  const userId = verifiedToken.userId;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return res.status(404).json({"message": "User with this token wasn't found."})
  }
  return res.status(200)
  .json({"message": "Token is valid"});
  
}

  catch(error) {
    return res.status(401).json({"message": "Error in token verification"});
  }})