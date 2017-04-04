'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _article = require('./article');

var _article2 = _interopRequireDefault(_article);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Schema = _mongoose2.default.Schema;
const BlogSchema = new Schema({
  id: String,
  name: String,
  href: String,
  rss: String
});

BlogSchema.options.toJSON = BlogSchema.options.toJSON || {};
BlogSchema.options.toJSON.transform = (doc, ret) => {
  return ret;
};

BlogSchema.pre('remove', next => {
  // 'this' is the blog being removed. Provide callbacks here if you want
  // to be notified of the calls' result.
  _article2.default.remove({ blog_id: undefined.id }).exec();
  next();
});

const Blog = _mongoose2.default.model('blog', BlogSchema);

exports.default = Blog;