'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validatorjs = require('validatorjs');

var _validatorjs2 = _interopRequireDefault(_validatorjs);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _bcryptjs = require('bcryptjs');

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _pg = require('pg');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));


var registerUser = function registerUser(req, res) {
  var body = _lodash2.default.pick(req.body, ['firstName', 'lastName', 'email', 'password', 'password_confirmation']);
  var rules = {
    email: 'required|email',
    password: 'required|min:6|confirmed',
    password_confirmation: 'required',
    firstName: 'required|min:3|string|max:20',
    lastName: 'required|min:3|string|max:20'
  };
  var validation = new _validatorjs2.default(body, rules);

  if (validation.fails()) {
    return res.status(400).json({
      message: validation.errors.all()
    });
  }
  var client = new _pg.Client({
    user: 'postgres',
    host: 'localhost',
    database: 'diary_entries',
    password: 'phoenix123',
    port: 5432
  });
  client.connect().then(function () {
    console.log('connected successfully');
    // const sql = 'INSERT INTO users (firstName, lastName) VALUES ( $1, $2)';
    // const params = ['aaaa', 'bbbb'];
    // return client.query(sql, params);
    var usersTable = 'CREATE TABLE IF NOT EXISTS users\n      (\n        id SERIAL PRIMARY KEY,\n        email VARCHAR(100) UNIQUE NOT NULL,\n        firstName VARCHAR(255) NOT NULL,\n        lastName VARCHAR(255) NOT NULL,\n        password VARCHAR(255) NOT NULL,\n        created_on TIMESTAMPTZ DEFAULT now() NOT NULL\n      );';
    return client.query(usersTable);
  }).then(function () {
    console.log('got here');
    var sql = 'SELECT * FROM users WHERE email = $1';
    var params = [req.body.email];
    return client.query(sql, params);
  }).then(function (existingUser) {
    // if there is no existing user, hash password
    if (!existingUser.rows[0]) {
      var user = {
        email: req.body.email,
        password: req.body.password
      };

      _jsonwebtoken2.default.sign({ user: user }, 'abc123', function (err, token) {
        if (err) {
          console.log('err', err);
          return;
        }
        res.header('x-auth', token).json({
          message: 'signed in successfully'
        });
      });
      _bcryptjs2.default.genSalt(10, function (err, salt) {
        _bcryptjs2.default.hash(req.body.password, salt, function (err, hashedPassword) {
          req.body.password = hashedPassword;
          console.log(req.body.password);
          var sql = 'INSERT INTO users (firstName, lastName, email, password) VALUES ($1, $2, $3, $4)';
          var params = [req.body.firstName, req.body.lastName, req.body.email, req.body.password];
          console.log('inserted successfullly');
          return client.query(sql, params);
        });
      });
    }
  })
  // .then((result) => {
  //   console.log('result?', result.rows[0]);
  // })
  .catch(function (err) {
    console.log(err.stack);
    // console.log('could not connect');
  });
};

exports.default = registerUser;
//# sourceMappingURL=registerUser.js.map