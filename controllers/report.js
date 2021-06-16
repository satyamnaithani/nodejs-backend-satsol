const Item = require('../models/item')
const mongoose = require('mongoose');
const Purchase = require('../models/purchase');
const Vendor = require('../models/vendor');
const Sales = require('../models/sales');


exports.get_sales_report = (req, res, next) => {
    Sales.find({"date": {$gte: new Date(req.query.gte), $lte: new Date(req.query.lte)}}).sort({"invoiceNo": 1}).exec()
    .then((sale) => {
        let arr = [];
        sale.forEach((data) => {
            let itemArray = [];
            data.orderData.forEach((x) => {
                let obj = {
                    item: x.item,
                    lot_no: x.lotNo,
                    gst: x.gst,
                    hsn: x.hsn,
                    rate: x.sellingRate,
                    quantity: x.checkout,
                    subtotal: x.sellingRate*x.checkout,
                    cgst: calcGst(x.sellingRate, x.gst, x.checkout),
                    sgst: calcGst(x.sellingRate, x.gst, x.checkout),
                    igst: 0,
                    gst_value: calcGst(x.sellingRate, x.gst, x.checkout)*2
                }
                itemArray.push(obj);
            })
            let obj = {
                invoice_no: data.invoiceNo,
                invoice_date: parseDate(data.date),
                customer: data.customer.name,
                location: data.customer.city,
                gstin: data.customer.gst,
                order_data: itemArray,
                total_rate: data.totalRate,
                total_gst: data.totalGst,
                grand_total: data.grandTotal
            }

            arr.push(obj);
        })
        res.status(200).json(arr);
    })
    .catch((err) => res.status(500).json(err))
}
exports.get_purchase_report = (req, res, next) => {
    Purchase.aggregate([
        {$match: { billDate: {$gte: new Date(req.query.gte), $lte: new Date(req.query.lte)}}},
        {$group:{
                    _id: {
                        bill_no: "$billNo",
                        vendor: "$vendor",
                        bill_date: { $dateToString: { format: "%d-%m-%Y", date: "$billDate" } }
                    },
                    billDetails: {
                        $push: {
                            item: "$item",
                            hsn: "$hsn",
                            quantity: "$quantity",
                            purchase_rate: "$rate",
                            gst_percent:"$gst",
                            gst_value: {"$round": [ {"$multiply": [{"$divide": [ { "$multiply": ["$rate","$gst"] }, 100 ] }, "$quantity"]}, 2 ]},
                            cgst: {"$round": [{"$divide": [{"$multiply": [{"$divide": [ { "$multiply": ["$rate","$gst"] }, 100 ] }, "$quantity"]}, 2]}, 2]},
                            sgst: {"$round": [{"$divide": [{"$multiply": [{"$divide": [ { "$multiply": ["$rate","$gst"] }, 100 ] }, "$quantity"]}, 2]}, 2]},
                            igst: 0,
                            amount: {"$multiply" : ["$rate", "$quantity"]},
                            total_amount: {"$sum": [{"$multiply": [{"$divide": [ { "$multiply": ["$rate","$gst"] }, 100 ] }, "$quantity"]}, {"$multiply" : ["$rate", "$quantity"]}]} 
                        }
                    }
            }
        },
        { $sort : { "_id.billDate": -1 }},
    ])
    .then(purchase => {
        let arr = [];
        purchase.forEach((obj) => arr.push(obj._id.vendor));
        findVendorDetails(arr).then((data) => {
            purchase.forEach((object) => {
                object.billDetails.forEach((data) => {
                    data.gst_value = data.gst_value.toFixed();
                })
                data.forEach((vendor) => {
                    if(vendor.name === object._id.vendor) {
                        object['gstin'] = vendor.gst;
                        object['location'] = vendor.city;
                    }
                })
            });
            let settings = {
                fileName: 'MySpreadsheet', // Name of the spreadsheet
                extraLength: 3, // A bigger number means that columns will be wider
                writeOptions: {} // Style options from https://github.com/SheetJS/sheetjs#writing-options
            }
            res.status(200).json(purchase);
        })
        .catch((err) => console.log(err))
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })

    })
}

const findVendorDetails = (name) => {
    return new Promise((resolve, reject) => {
        Vendor.find({"name": { $in: name }})
        .exec().then((vendor) => {return resolve(vendor)})
        .catch((err) => {return reject(err)})
    });
}
const parseDate = (unparsed_date) => {
    if(!unparsed_date) {
        return "";
    }
    let dateArray = new Date(unparsed_date).toLocaleDateString().split('/');
    if(dateArray[0] < 10) {
        dateArray[0] = 0 + dateArray[0];
    }
    if(dateArray[1] < 10) {
        dateArray[1] = 0 + dateArray[1];
    }
    return dateArray[1] + '/' + dateArray[0] + '/' + dateArray[2];
}
const calcGst = (rate, gst, quantity) => {
    rate = parseFloat(rate) * parseInt(quantity);
    gst = parseInt(gst);
    let gst_value = (rate*(gst/100))/2;
    return parseFloat(gst_value.toFixed(2));
}