const { createConnection } = require('mysql');
const { DB_CONFIG } = require('../global');
exports.connection = createConnection(DB_CONFIG);