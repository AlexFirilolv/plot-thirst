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
  "origin" : ["http://localhost:5173", "http://localhost:5174"],
  "credentials": true
}
app.use(cors(corsOptions));

app.use(cookieParser());

const jwt_secret = process.env.JWT_SECRET;
const refresh_token_secret = process.env.REFRESH_TOKEN_SECRET;

if (!jwt_secret || !refresh_token_secret) {
  console.error('Missing required JWT secrets in environment variables');
  process.exit(1);
}

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

      const refreshToken = jsonjwt.sign({"userId": newUser.id, "tokenVersion": 1},refresh_token_secret,{ expiresIn: '7d' });
      await prisma.user.update({where: { id: newUser.id }, data: { refreshToken: refreshToken }});

      const payload = {
          "userId": newUser.id,
      }
      
      const jwt = jsonjwt.sign(payload,jwt_secret,{ expiresIn: '1h' });

      return res.status(201)
      .cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax', maxAge: 7*24*60*60*1000 })
      .cookie('jwt', jwt, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax', maxAge: 60*60*1000 })
      .json({ "message": "Account created successfully" });
      }
    catch(error) {
      console.error('Registration error:', error);
      return res.status(500).json({"message": "Registration failed. Please try again."})
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

      const refreshToken = jsonjwt.sign({"userId": loggedUser.id, "tokenVersion": 1},refresh_token_secret,{ expiresIn: '7d' });
      await prisma.user.update({where: { id: loggedUser.id }, data: { refreshToken: refreshToken }});

      const payload = {
          "userId": loggedUser.id
      }
      const jwt = jsonjwt.sign(payload,jwt_secret,{ expiresIn: '1h' });

      return res.status(200)
      .cookie('refreshToken', refreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax', maxAge: 7*24*60*60*1000 })
      .cookie('jwt', jwt, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax', maxAge: 60*60*1000 })
      .json({"message": "Welcome back!"})
    }
  
    catch(error) {
      console.error('Login error:', error);
      return res.status(500).json({"message": "Login failed. Please try again."})
    }
})

app.post('/refresh_token', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({"message": "Authentication required"});
  }

  try {
    const decoded = jsonjwt.verify(refreshToken, refresh_token_secret);
    const userId = decoded.userId;
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({"message": "Invalid session"});
    }

    // Generate new access token
    const newJwt = jsonjwt.sign({ userId: user.id }, jwt_secret, { expiresIn: '1h' });

    // Generate new refresh token (token rotation)
    const newRefreshToken = jsonjwt.sign({"userId": user.id, "tokenVersion": (decoded.tokenVersion || 1) + 1}, refresh_token_secret, { expiresIn: '7d' });

    // Update refresh token in database
    await prisma.user.update({where: { id: user.id }, data: { refreshToken: newRefreshToken }});

    return res.status(200)
      .cookie('jwt', newJwt, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax', maxAge: 60*60*1000 })
      .cookie('refreshToken', newRefreshToken, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax', maxAge: 7*24*60*60*1000 })
      .json({"message": "Session renewed"});
  }
  catch (error) {
    return res.status(401).json({"message": "Invalid session"});
  }});

app.post('/logout', async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  try {
    if (refreshToken) {
      // Decode to get user ID and clear refresh token from database
      const decoded = jsonjwt.verify(refreshToken, refresh_token_secret);
      await prisma.user.update({
        where: { id: decoded.userId },
        data: { refreshToken: null }
      });
    }
  } catch (error) {
    // Continue with logout even if token is invalid
    console.error('Logout token cleanup error:', error);
  }

  return res.status(200)
    .clearCookie('jwt')
    .clearCookie('refreshToken')
    .json({"message": "Logged out successfully"});
});

app.get('/verify_token', async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401)
    .json({ "message": "Authentication required"});
  }
  try {
  const verifiedToken = jsonjwt.verify(token, jwt_secret);
  const userId = verifiedToken.userId;
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) {
    return res.status(401).json({"message": "Invalid session"})
  }
  return res.status(200)
  .json({"message": "Session valid"});

}

  catch(error) {
    console.error('Token verification error:', error);
    return res.status(401).json({"message": "Invalid session"});
  }})