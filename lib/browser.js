'use strict';

var types = require('./types');
var detector = require('./detector');

module.exports = function(input, fn) {
  if (input instanceof Buffer) {
    return lookup(input);
  }

  if (input instanceof Blob) {
    return readFile(input).then(function(buffer) {
      return lookup(buffer);
    });
  }

  throw new Error('invalid input. must be a Buffer, File or Blob instance');
}

function readFile(file) {
  return new Promise(function(resolve, reject) {
    var reader = new FileReader();
    reader.addEventListener('error', function() {
      reject(reader.error);
    });
    reader.addEventListener('loadend', function() {
      resolve(new Buffer(new Uint8Array(reader.result)));
    });
    reader.readAsArrayBuffer(file);
  });
}

function lookup(buffer) {
  // detect the file type.. don't rely on the extension
  var type = detector(buffer);

  // find an appropriate handler for this file type
  if (type in types) {
    var size = types[type].calculate(buffer);
    if (size !== false) {
      size.type = type;
      return size;
    }
  }

  // throw up, if we don't understand the file
  throw new TypeError('unsupported file type');
}
