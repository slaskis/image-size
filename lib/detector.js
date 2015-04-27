'use strict';

var types = require('./types');

module.exports = function (buffer, filepath) {
  var type, result;
  for (type in types) {
    result = types[type].detect(buffer, filepath);
    if (result) {
      return type;
    }
  }
};
