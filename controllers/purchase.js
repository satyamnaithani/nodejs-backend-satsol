const mongoose = require('mongoose');
const Purchase = require('../models/purchase');
const { ToWords } = require('to-words');

const toWords = new ToWords({
  localeCode: 'en-IN',
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
  }
});

exports.purchase_get_all_item = (req, res, next) => {
    Purchase.aggregate([
        {$match: { billDate: {$gte: new Date(1617235200000)}}},
        {
            $group:{
                _id: {
                    billNo: "$billNo",
                    vendor: "$vendor",
                    billDate: "$billDate",
                    transaction: "$transaction"

                },
                //billDetails: {$push: "$$ROOT"}
                billDetails: {
                    $push: {
                        _id: "$_id",
                        item: "$item",
                        lotNo: "$lotNo",
                        exp: "$exp",
                        quantity: "$quantity",
                        amount: {"$sum": [{"$multiply": [{"$divide": [ { "$multiply": ["$rate","$gst"] }, 100 ] }, "$quantity"]}, {"$multiply" : ["$rate", "$quantity"]}]}
                        //amount: {"$multiply" : ["$rate", "$quantity"]} 
                    }
                }
            }
        },
        {
            $sort : {"_id.billDate": -1}
        }
    ])
    .then(purchase => {
        res.status(200).json(purchase)
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })

    })
}

// creating purchase is auotomatically done when entering stock details. method invoked in stock.js post file.
exports.purchase_create_purchase = (req, res, next) => {
    const purchase = new Purchase({
        _id: new mongoose.Types.ObjectId(),
        item: req.body.item,
        lotNo: req.body.lotNo,
        billNo: req.body.billNo,
        exp: req.body.exp,
        vendor: req.body.vendor,
        quantity: req.body.quantity,
        rate: req.body.rate,
        gst: req.body.gst,
        purchaseRate: req.body.purchaseRate,
        receiveDate: req.body.receiveDate,
        billDate: req.body.billDate,
        uom: req.body.uom,
        hsn: req.body.hsn,
        itemCode: req.body.itemCode,
        addedBy: req.body.addedBy
    });
    purchase.save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: 'Created Product Successfully!',
                createdProduct: {
                    result
                }
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
}

exports.purchase_get_total_purchase_amount = (req, res, next) => {
    var date = new Date()
    const quarterlyDate = new Date(date.setMonth(date.getMonth() - 12))
    Purchase.find({
        "billDate": { $gte: quarterlyDate, $lte: new Date }
      })
        .exec()
        .then(docs => {
            var totalPrice = 0,
                totalRate = 0,
                totalGst = 0
            for(var i=0; i< docs.length;i++) {
               totalRate += (docs[i].rate*docs[i].quantity);
               totalGst += docs[i].rate*(docs[i].gst/100)*docs[i].quantity;
            }
            totalPrice = totalGst + totalRate

            const response = {
                count: docs.length,
                rate: totalRate.toFixed(2),
                gst: totalGst.toFixed(2),
                total: totalPrice.toFixed(2),
                quarterlyMonthStartDate: quarterlyDate.toDateString(),
                grandTotalInWords: toWords.convert(totalPrice.toFixed(2))
            }
            res.status(200).json(response)

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })

        })
}

exports.purchase_update_transaction =  (req, res, next) => {
    Purchase.updateMany({_id: { $in: req.body.idArray}}, { $set: { 
        transaction : req.body.transaction
       }})
      .exec()
      .then(response => {
          res.status(201).json({
              message: 'success',
              status: response
          })
      })
      .catch(err => {
          console.log(err);
          res.status(500).json({error: err})
      })

}