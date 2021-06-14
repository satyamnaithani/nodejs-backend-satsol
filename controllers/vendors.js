const { generateCode, execQuery } = require('../lib/commonFunctions');
exports.get_all_vendors = (req, res, next) => {
    const query = 'select * from vendors;';
    execQuery(query)
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
}

exports.create_vendor = async (req, res, next) => {
    const { name, address, city, state, zip, gst, dl, contact, person } = req.body;
    let code;
    const query1 = `SELECT COUNT(*) AS count FROM vendors;`;
    await execQuery(query1).then((result) => code = generateCode(result[0].count, 'VR')).catch((err) => console.log(err));
    const query2 = `INSERT INTO vendors (code, name, address, city, state, zip, gst, dl, contact, person) VALUES ('${code}', '${name}', '${address}', '${city}', '${state}', '${zip}', '${gst}', '${dl}', '${contact}', '${person}');`;
    await execQuery(query2).then((result) => res.status(200).json(result)).catch((err) => console.log(err));
}