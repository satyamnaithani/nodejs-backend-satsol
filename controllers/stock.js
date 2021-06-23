const { execQuery } = require('../lib/commonFunctions');

exports.get_all_stock = (req, res, next) => {
    const query = `
    SELECT pt._id, i.name AS item, v.name AS vendor, pt.lot_no, DATE_FORMAT(pt.exp, "%d/%l/%Y") AS exp, pt.rate, i.code, i.hsn, i.gst, pt.quantity, pt.initial_quantity
    FROM purchase_item pt 
    INNER JOIN purchase p
    ON pt.purchase_id = p._id
    INNER JOIN items i
    ON pt.item_id = i._id
    INNER JOIN vendors v
    ON p.vendor_id = v._id
    WHERE pt.quantity > 0
    `;
    execQuery(query)
    .then((result) => res.status(200).json(result))
    .catch((err) => console.log(err));
}