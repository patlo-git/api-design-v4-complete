import express from 'express';
import router from './router';
import morgan from 'morgan';
import { protect } from './modules/auth';
import { createNewUser, signin } from './handlers/user';

const app = express() // makes the api

app.use(morgan('dev')); // example output of morgan log in terminal `GET / 200 1.912 ms - 19`
app.use(express.json()); // allows a client to send us json
app.use(express.urlencoded({extended: true}))

// Can also create our own mw. We created this to augment the req object
// app.use((req, res, next) => {
//   // req.shhh_secret = 'doggy';
//   res.status(401)
//   res.send('Nope')
// })

app.get('/', (req, res, next) => {
  res.json({message: 'hello'})
})


 // .use allows you to apply some type of global configuration to the whole app or a certain path of the api
app.use('/api', protect, router)
// sets up the initial url, before anything we've set up in router. It's like google.com/api/...
app.post('/user', createNewUser);
app.post('/signin', signin);

app.use((err, req, res, next) => {
  if (err.type === 'auth') {
    res.status(401).json({message: 'unauthorized'})
  } else if (err.type === 'input') {
    res.status(400).json({message: 'invalid input'})
  } else {
    res.status(500).json({message: 'oops, that\'s on us'})
  }
})

export default app;
