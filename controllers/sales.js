const { execQuery } = require('../lib/commonFunctions');
const { connection } = require('../models/connection.js');
const { COMPANY_DETAILS } = require('../global');

exports.get_all_sales = (req, res, next) => {

    const query = `
        SELECT s.invoice_no, DATE_FORMAT(s.invoice_date, "%d/%l/%Y") AS invoice_date, c.name AS customer_name, c.state, s.order_no, DATE_FORMAT(s.order_date, "%d/%l/%Y") AS order_date, challan_no, DATE_FORMAT(s.challan_date, "%d/%l/%Y") AS challan_date, ewb_no, DATE_FORMAT(s.ewb_date, "%d/%l/%Y") AS ewb_date, dispatch_doc_no, DATE_FORMAT(s.dispatch_doc_date, "%d/%l/%Y") AS dispatch_doc_date, dispatch_through, terms_of_delivery, remark,
        GROUP_CONCAT(CONCAT('{"code":"', i.code, '", "name":"',i.name,'", "lot":"',pt.lot_no,'", "exp":"',pt.exp,'", "gst":"',i.gst,'", "selling_rate":"',st.selling_rate,'", "quantity":"',st.quantity,'"}')) item_list
        FROM sales s
        INNER JOIN sales_item st
        ON s._id=st.sales_id
        INNER JOIN customers c
        ON s.customer_id=c._id
        INNER JOIN purchase_item pt
        ON st.purchase_item_id=pt._id
        INNER JOIN items i
        ON i._id=pt.item_id
        GROUP BY s.invoice_no
    `;
    execQuery(query)
    .then((result) => {
        result.forEach((obj, index) => {
            result[index]['interstate'] = obj.state !== COMPANY_DETAILS.state;
        });
        res.status(200).json(result);
    })
    .catch((err) => console.log(err));
}

exports.create_sales = (req, res, next) => {
    const { sale_items, customer_id, invoice_date, challan_no, challan_date, order_no, order_date, ewb_no, ewb_date, dispatch_doc_no, dispatch_doc_date, dispatch_through, terms_of_delivery, remark } = req.body;
    connection.getConnection((err, con) => {
        if (err) {
          console.error('error connecting: ' + err.stack);
          return;
        }
        console.log('connected as id ' + con.threadId);
        con.beginTransaction((err) => {
            if (err) {
                res.status(500).json(err);
                throw err;
            };
            const q1 = `SELECT COUNT(*) AS count FROM sales;`;
            con.query(q1, async(err, result) => {
                if (err) con.rollback(() => {throw err});
                const invoice_no = await generateInvoiceNumber(result[0].count);
                const q2 = `INSERT INTO sales (customer_id, invoice_no, invoice_date, challan_no, challan_date, order_no, order_date, ewb_no, ewb_date, dispatch_doc_no, dispatch_doc_date, dispatch_through, terms_of_delivery, remark) VALUES ('${customer_id}', '${invoice_no}', '${invoice_date}', '${challan_no}', '${challan_date === '' ? '1970-01-01' : challan_date}', '${order_no}', '${order_date === '' ? '1970-01-01' : order_date}', '${ewb_no}', '${ewb_date === '' ? '1970-01-01' : ewb_date}', '${dispatch_doc_no}', '${dispatch_doc_date === '' ? '1970-01-01' : dispatch_doc_date}', '${dispatch_through}', '${terms_of_delivery}', '${remark}');`;
                await con.query(q2, (err, result) => {
                    if (err) con.rollback(() => {
                        console.log(err);
                        throw err;
                    });
                    console.log(err)
                    let sales_id = result.insertId;
                    let str = "";
                    sale_items.forEach(({purchase_item_id, selling_rate, checkout}) => str += `('${sales_id}', '${purchase_item_id}', '${selling_rate}', '${checkout}'),`)
                    str = str.substring(0, str.length - 1);
                    const q3 = `INSERT INTO sales_item (sales_id, purchase_item_id, selling_rate, quantity) VALUES ${str}`;
                    con.query(q3, (err, result) => {
                        if (err) con.rollback(() => {throw err});
                        let str = "SELECT * FROM sales;";
                        sale_items.forEach(({purchase_item_id, checkout}) => {
                            qTest = `UPDATE purchase_item SET quantity = quantity - ${checkout} WHERE _id = ${purchase_item_id};`
                            con.query(qTest, (err, result) => {
                                if (err) con.rollback(() => {throw err;})
                            })
                        });
                        const q4 = str;
                        con.query(q4, (err, result) => {
                            if (err) con.rollback(() => {throw err});
                            con.commit((err) => {
                                if (err) con.rollback(() => {throw err;});
                                console.log('Sale Transaction Complete.');
                                res.status(201).json(result);
                                con.release();
                            });
                        })
                    })
                });
            });
        });
    });
}

const generateInvoiceNumber = (count) => {
    return new Promise((resolve, reject) => {
        if(typeof count === NaN) return reject(err);
        count++;
        let invoice_no = 'SSDDN/20-21/'
        if (count < 10) invoice_no += `00${count}`;
        else if (count >= 10 && count < 100) invoice_no += `0${count}`;
        else invoice_no += count;
        return resolve(invoice_no);
    })
}