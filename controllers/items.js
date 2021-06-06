// const { createConnection } = require('mysql');
// const { DB_CONFIG } = require('../global');
// const connection = createConnection(DB_CONFIG);
const { connection } = require('../models/connection');

exports.get_all_items =  (req, res, next) => {
    //connection.connect();
    connection.query('select * from demo;', (err, result, fields) => {
        if(err) {
            return console.log(err);
        }
        res.status(200).json(result);
    });
}