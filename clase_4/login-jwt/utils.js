import jwt from 'jsonwebtoken';

const PRIVATE_KEY = 'CoderTokenSecreto'

export const generateToken = (user) => {
  return jwt.sign(user, PRIVATE_KEY, { expiresIn: '1h' });
}

export const authToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const [, jwtToken] = token.split(' ');

  jwt.verify(jwtToken, PRIVATE_KEY, (err, credentials) => {
    if (err) {
      return res.status(403).json({ err, message: 'Invalid token' });
    }


    req.user = {
      name: credentials.name,
      email: credentials.email,
    };
    next();
  });
}