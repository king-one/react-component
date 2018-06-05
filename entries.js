'use strict';
const path = require('path');
const resolve = str => path.resolve(__dirname, str);
const entries = {
    'app': resolve('site/app')
}
module.exports = entries;