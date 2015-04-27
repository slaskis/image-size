'use strict';

var types = {
  'bmp': require('./types/bmp'),
  'gif': require('./types/gif'),
  'jpg': require('./types/jpg'),
  'png': require('./types/png'),
  'psd': require('./types/psd'),
  'svg': require('./types/svg'),
  'webp': require('./types/webp')
};

if (!process.browser) {
  types['tiff'] = require('./types/tiff');
}

module.exports = types;