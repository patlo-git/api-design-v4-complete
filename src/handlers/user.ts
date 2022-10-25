import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createNewUser = async (req, res, next) => {
  try {
    // .user is pulled from prisma
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password)
      }
    })
    const token = createJWT(user);
    
    res.json({ token });
  } catch (e) {
    e.type = 'input';
    next(e);
  }
}

export const signin = async (req, res) => {
  // compare password signed in to the stored hashed password
  // here's our query
  const user = await prisma.user.findUnique({
    where: {
      username: req.body.username
    }
  })

  // comparePasswords takes two arguments
  // req.body.password is the string password
  // user.password is the hashedPass
  const isValid = await comparePasswords(req.body.password, user.password)

  if (!isValid) {
    res.status(401);
    res.json({message: 'Nah. Invalid password'});
    return;
  }

  // if everything matches we're going to create a token and give it to user so they can access the API
  const token = createJWT(user);
  res.json({ token });
}