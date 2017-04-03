'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _models = require('../models');

var _utils = require('../utils');

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _main = require('../main');

var _main2 = _interopRequireDefault(_main);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const router = new _express2.default.Router();

router.get('/blogs', (() => {
  var _ref = _asyncToGenerator(function* (req, res) {
    const blogs = yield _models.Blog.find();
    return res.send({ blogs });
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})());

router.get('/articles/:blog', (() => {
  var _ref2 = _asyncToGenerator(function* (req, res) {
    const blog_id = req.params.blog;
    const articles = yield _models.Article.find({ blog_id });
    return res.send({ articles });
  });

  return function (_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
})());

router.post('/authenticate', (() => {
  var _ref3 = _asyncToGenerator(function* (req, res) {
    // find the user
    _models.User.findOne({
      user: req.body.user
    }, function (err, user) {
      if (err) {
        throw err;
      }

      if (!user) {
        res.json({ success: false, message: 'Authentication failed. User not found.' });
      } else if (user) {
        // check if password matches
        if (user.password !== req.body.password) {
          res.json({ success: false, message: 'Authentication failed. Wrong password.' });
        } else {
          // if user is found and password is right
          // create a token
          const token = _jsonwebtoken2.default.sign(user, _main2.default.get('secret'), {
            expiresIn: 18000 // expires in 24 hours
          });

          // return the information including token as JSON
          res.json({
            success: true,
            token
          });
        }
      }
    });
  });

  return function (_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
})());

router.use((req, res, next) => {
  // check header or url parameters or post parameters for token
  const token = req.headers['x-access-token'];

  // decode token
  if (token) {
    // verifies secret and checks exp
    _jsonwebtoken2.default.verify(token, _main2.default.get('secret'), (err, decoded) => {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      }
      // if everything is good, save to request for use in other routes
      req.decoded = decoded;
      next();
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

// return swagger doc json data.
// open [http://swagger.daguchuangyi.com/?url=http://localhost:8888/swagger.json#!]
// to use Swagger UI to visualize the doc
router.get('/swagger.json', _utils.swagDocHandler);

exports.default = router;