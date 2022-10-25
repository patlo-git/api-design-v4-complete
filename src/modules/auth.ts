// jwt is converting an object to a string
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// for signIn
export const comparePasswords = (password, hash) => {
  // returns a promise that returns true or false depending if it matches
  return bcrypt.compare(password, hash)
}

// for initial hashing of password
export const hashPassword = (password) => {
  return bcrypt.hash(password, 5) // 5 is our salt
}

// jwt converts an object to a string
export const createJWT = (user) => {
  // whatever we put on the token needs to be useful in identifying them later
  const token = jwt.sign({
    id: user.id,
    username: user.username
  },
  // second argument for jwt.sign
  process.env.JWT_SECRET)
  return token;
}

export const protect = (req, res, next) => {
  // looking for something on the authorization header
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({message: 'protect message (on auth) not authorized - no bearer'});
    return;
  }

  const [, token] = bearer.split(' ');

  if (!token) {
    res.status(401);
    res.json({message: 'Something else is wrong. No token'});
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET)
    req.user = user;
    next();
  } catch (e) {
    console.error(e);
    res.status(401);
    res.json({message: 'Invalid token'});
    return;
  }
}