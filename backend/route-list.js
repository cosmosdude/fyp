const { configure } = require('express-route-list');
configure(require('./app'), { showIndex: true, prefix: '' });