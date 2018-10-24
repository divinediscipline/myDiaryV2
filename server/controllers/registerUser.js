import Validator from 'validatorjs';
import Lodash from 'lodash';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Client } from 'pg';

dotenv.config();


const registerUser = (req, res) => {
  const body = Lodash.pick(req.body, ['firstName', 'lastName', 'email', 'password', 'password_confirmation']);
  const rules = {
    email: 'required|email',
    password: 'required|min:6|confirmed',
    password_confirmation: 'required',
    firstName: 'required|min:3|string|max:20',
    lastName: 'required|min:3|string|max:20',
  };
  const validation = new Validator(body, rules);

  if (validation.fails()) {
    return res.status(400).json({
      message: validation.errors.all(),
    });
  }
  const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'diary_entries',
    password: 'phoenix123',
    port: 5432,
  });
  client.connect()
    .then(() => {
      console.log('connected successfully');
      const usersTable = `CREATE TABLE IF NOT EXISTS users
      (
        id SERIAL PRIMARY KEY,
        email VARCHAR(100) UNIQUE NOT NULL,
        firstName VARCHAR(255) NOT NULL,
        lastName VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_on TIMESTAMPTZ DEFAULT now() NOT NULL
      );`;
      return client.query(usersTable);
    })
    .then(() => {
      console.log('got here');
      const sql = 'SELECT * FROM users WHERE email = $1';
      const params = [req.body.email];
      return client.query(sql, params);
    })
    .then((existingUser) => {
      // if there is no existing user, hash password
      if (!existingUser.rows[0]) {
        const user = {
          email: req.body.email,
        };

        jwt.sign({ user }, 'abc123', (err, token) => {
          if (err) {
            console.log('err', err);
            return;
          }
          res.header('x-auth', token).json({
            message: 'signed in successfully',
          });
        });
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(req.body.password, salt, (err, hashedPassword) => {
            req.body.password = hashedPassword;
            console.log(req.body.password);
            const sql = 'INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3, $4)';
            const params = [req.body.firstName, req.body.lastName, req.body.email, req.body.password];
            console.log('inserted successfullly');
            return client.query(sql, params);
          });
        });
      }
    })
    // .then((result) => {
    //   console.log('result?', result.rows[0]);
    // })
    .catch((err) => {
      console.log(err.stack);
      // console.log('could not connect');
    });
};

export default registerUser;
