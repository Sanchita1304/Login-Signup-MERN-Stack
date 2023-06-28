import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

mongoose
  .connect('mongodb://127.0.0.1:27017/myLoginSingupDB')
  .then(() => {
    console.log('Mongo connected!');
  })
  .catch((err) => {
    console.log(err);
  });

const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
});

const User = new mongoose.model('User', userSchema);

// Routes

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  User.findOne({ email: email })
    .then((result) => {
      if (result) {
        if (password === result.password) {
          res.send({ message: 'Login successfully', result: result });
        } else {
          res.send({ message: 'Incorrect Password' });
        }
      } else {
        res.send({ message: 'User not registered.' });
      }
    })
    .catch((err) => {
      console.error(err); // Print the error stack trace
      res.status(500).send({ message: 'An error occurred during login.' });
    });
});

app.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email: email })
    .then((result) => {
      if (result) {
        res.send({ message: 'User already registered' });
      } else {
        const user = new User({
          name,
          email,
          password,
        });

        user
          .save()
          .then(() => {
            res.send({ message: 'User successfully registered.' });
          })
          .catch((err) => {
            console.error(err); // Print the error stack trace
            res.status(500).send({ message: 'An error occurred during registration.' });
          });
      }
    })
    .catch((err) => {
      console.error(err); // Print the error stack trace
      res.status(500).send({ message: 'An error occurred during registration.' });
    });
});

app.listen(8000, () => {
  console.log('Listening at port 8000');
})