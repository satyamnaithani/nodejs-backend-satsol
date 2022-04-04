const Expense = require('../models/expenses');
const Sales = require('../models/sales');
const Stock = require('../models/stock');
const mongoose = require('mongoose');
const { ToWords } = require('to-words');

const toWords = new ToWords({
  localeCode: 'en-IN',
  converterOptions: {
    currency: true,
    ignoreDecimal: false,
    ignoreZeroCurrency: false,
  }
});

exports.sales_create_sales = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    let totalRate = 0;
    let totalGst = 0;
    req.body.orderData.map(data => {
      totalRate = parseFloat(totalRate + (data.sellingRate * data.checkout));
      totalGst = parseFloat(totalGst + data.sellingRate * (data.gst / 100) * data.checkout);
    })
    global.count;
    await Sales.find({"date": { $gte: new Date(1648796400000) }}).countDocuments().exec().then(res => { global.count = ++res });

    const sales = new Sales({
      _id: new mongoose.Types.ObjectId(),
      orderData: req.body.orderData,
      customer: req.body.customer,
      date: req.body.date,
      totalRate: totalRate.toFixed(2),
      totalGst: totalGst.toFixed(2),
      grandTotal: parseFloat((totalRate + totalGst).toFixed()).toFixed(2),
      customerName: req.body.customer.name,
      invoiceNo: global.count < 10 ?
        'SSDDN/22-23/00' + global.count
        : global.count >= 10 && global.count <= 99 ?
          'SSDDN/22-23/0' + global.count
          : 'SSDDN/22-23/' + global.count,
      challanNo: req.body.challanNo,
      challanDate: req.body.challanDate,
      orderNumber: req.body.orderNumber,
      orderDate: req.body.orderDate,
      ewbNo: req.body.ewbNo,
      ewbDate: req.body.ewbDate,
      dispatchDocNo: req.body.dispatchDocNo,
      dispatchDocDate: req.body.dispatchDocDate,
      dispatchThrough: req.body.dispatchThrough,
      destination: req.body.destination,
      termsOfDelivery: req.body.termsOfDelivery,
      interState: req.body.interState,
      grandTotalInWords: toWords.convert(parseFloat((totalRate + totalGst).toFixed())),
      remark: req.body.remark,
      addedBy: req.body.addedBy
    });

    global.stockQuantity;
    const data = req.body.orderData
    for (var i = 0; i < data.length; i++) {
      await Stock.findById(data[i]._id)
        .select('quantity')
        .exec()
        .then(res => {
          if (res.quantity >= data[i].checkout) {
            global.stockQuantity = res.quantity - data[i].checkout
          }
          else {
            res.status(500).json({ error: "CheckOut Quantity exceeds Stock Quantity" });
            session.abortTransaction()
            session.endSession()
          }
        })
        .catch(err => {
          res.status(500).json(err);
          session.abortTransaction()
          session.endSession()
        })
      await Stock.updateOne(
        { _id: data[i]._id },
        {
          $set: {
            quantity: global.stockQuantity,
          }
        },
        { session }
      );
    }
    await sales.save({ session })
      .then(result => {
        console.log(result);
        res.status(201).json({
          message: 'Created Product Successfully!',
          createdProduct: {
            orderData: result.orderData,
            customer: result.customer,
            customerName: result.customerName,
            _id: result._id,
            date: result.date,
            challanNo: result.challanNo,
            challanDate: result.challanDate,
            modeOfPayment: result.modeOfPayment,
            orderNumber: result.orderNumber,
            invoiceNo: result.invoiceNo,
            orderDate: result.orderDate,
            ewbNo: result.ewbNo,
            ewbDate: result.ewbDate,
            dispatchDocNo: result.dispatchDocNo,
            dispatchDocDate: result.dispatchDocDate,
            dispatchThrough: result.dispatchThrough,
            destination: result.destination,
            termsOfDelivery: result.termsOfDelivery,
            interState: result.interState,
            totalGst: result.totalGst,
            totalRate: result.totalRate,
            grandTotal: result.grandTotal,
            transaction: result.transaction,
            remark: result.remark,
            grandTotalInWords: result.grandTotalInWords
          }
        })
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
      });
    await session.commitTransaction()
    session.endSession()
  }
  catch (err) {
    await session.abortTransaction()
    session.endSession()
    throw err
  }
  // Removing stock items with 0 quantity
  await Stock.deleteMany({ "quantity": 0 })
}

exports.sales_get_sales = (req, res, next) => {
  global.count;
  Sales.find({"date": { $gte: new Date(1648796400000) }}).count().exec().then(response => global.count = response).catch(error => res.status(500).json(error))
  Sales.find({"date": { $gte: new Date(1648796400000) }})
    .sort({ _id: -1 })
    .skip(parseInt(req.params.skip))
    .limit(parseInt(req.params.limit))
    .exec()
    .then(response => {
      const result = {
        count: global.count,
        sales: response
      }
      res.status(200).json(result)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })

    })
}

exports.sales_get_sales_filter_date = (req, res, next) => {
  const {startDate, endDate} = req.params
  Sales.find({
    "date": { $gte: startDate, $lte: endDate }
  })
    .exec()
    .then((docs) => {res.status(200).json(docs)})
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })
}

exports.sales_get_recent_sale = (req, res, next) => {
  Sales.find().sort({ _id: -1 }).limit(1)
    .exec()
    .then(sale => {
      res.status(200).json(sale)
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    })
}

exports.sales_get_monthly_sale_details = (req, res, next) => {
  var date = new Date()
  var dateOnMonthStart = new Date(date.toISOString().split('-')[0] + '-' + date.toISOString().split('-')[1] + '-' + '01' + 'T' + '00:00:00.000Z')
  Sales.find({
    "date": { $gte: dateOnMonthStart, $lte: date }
  })
    .exec()
    .then(docs => {
      var totalPrice = 0,
        totalRate = 0,
        totalGst = 0
      for (var i = 0; i < docs.length; i++) {
        totalRate = totalRate + docs[i].totalRate;
        totalGst = totalGst + docs[i].totalGst;
        totalPrice = totalGst + totalRate
      }
      const response = {
        count: docs.length,
        rate: parseFloat(totalRate.toFixed(2)),
        gst: parseFloat(totalGst.toFixed(2)),
        total: parseFloat(totalPrice.toFixed(2)),
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
exports.sales_get_quarterly_sale_details = (req, res, next) => {
  let date = new Date()
  const quarterlyDate = new Date(date.setMonth(date.getMonth() - 12))
  Sales.find({
    "date": { $gte: quarterlyDate, $lte: new Date }
  })
  .exec()
  .then(docs => {
    var totalPrice = 0,
      totalRate = 0,
      totalGst = 0
    for (var i = 0; i < docs.length; i++) {
      totalRate = totalRate + docs[i].totalRate;
      totalGst = totalGst + docs[i].totalGst;
      totalPrice = totalGst + totalRate
    }
    const response = {
      count: docs.length,
      rate: parseFloat(totalRate.toFixed(2)),
      gst: parseFloat(totalGst.toFixed(2)),
      total: parseFloat(totalPrice.toFixed(2)),
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

exports.sales_get_last_month_sale_details = (req, res, next) => {
  var date = new Date()
  var dateOnMonthStart = new Date(date.toISOString().split('-')[0] + '-' + date.toISOString().split('-')[1] + '-' + '01' + 'T' + '00:00:00.000Z')
  var lastDateOfPreviousMonth = dateOnMonthStart
  lastDateOfPreviousMonth.setDate(lastDateOfPreviousMonth.getDate() - 1);
  var dateOnPreviousMonthStart = lastDateOfPreviousMonth.toISOString().split('-')[0] + '-' + lastDateOfPreviousMonth.toISOString().split('-')[1] + '-' + '01' + 'T' + '00:00:00.000Z'
  Sales.find({
    "date": { $gte: new Date(dateOnPreviousMonthStart), $lte: new Date(lastDateOfPreviousMonth) }
  })
    .exec()
    .then(docs => {
      var totalPrice = 0,
        totalRate = 0,
        totalGst = 0
      for (var i = 0; i < docs.length; i++) {
        totalRate = totalRate + docs[i].totalRate;
        totalGst = totalGst + docs[i].totalGst;
        totalPrice = totalGst + totalRate
      }
      const response = {
        count: docs.length,
        rate: parseFloat(totalRate.toFixed(2)),
        gst: parseFloat(totalGst.toFixed(2)),
        total: parseFloat(totalPrice.toFixed(2)),
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

exports.sales_get_current_month_sale_details_chart = (req, res, next) => {
  var date = new Date()
  var dateOnMonthStart = date.toISOString().split('-')[0] + '-' + date.toISOString().split('-')[1] + '-' + '01' + 'T' + '00:00:00.000Z'
  Sales.find({
    "date": { $gte: dateOnMonthStart, $lte: date }
  })
    .sort({ date: 1 })
    .exec()
    .then(docs => {
      const response = {
        sale: docs.map(data => {
          const date = data.date === null ? '' : data.date.toISOString().split('-')[2].split('T')[0] + new Date().toDateString().split(' ')[1]
          // + '/'+data.date.toISOString().split('-')[1]
          return {
            time: date,
            amount: data.grandTotal
          }
        }

        )
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
exports.sales_get_previous_month_sale_details_chart = (req, res, next) => {
  var date = new Date()
  var dateOnMonthStart = new Date(date.toISOString().split('-')[0] + '-' + date.toISOString().split('-')[1] + '-' + '01' + 'T' + '00:00:00.000Z')
  var lastDateOfPreviousMonth = dateOnMonthStart
  lastDateOfPreviousMonth.setDate(lastDateOfPreviousMonth.getDate() - 1);
  var dateOnPreviousMonthStart = lastDateOfPreviousMonth.toISOString().split('-')[0] + '-' + lastDateOfPreviousMonth.toISOString().split('-')[1] + '-' + '01' + 'T' + '00:00:00.000Z'
  Sales.find({
    "date": { $gte: dateOnPreviousMonthStart, $lte: lastDateOfPreviousMonth }
  })
    .sort({ date: 1 })
    .exec()
    .then(docs => {
      const response = {
        sale: docs.map(data => {
          const date = data.date === null ? '' : data.date.toISOString().split('-')[2].split('T')[0] + lastDateOfPreviousMonth.toDateString().split(' ')[1]
          return {
            time: date,
            amount: data.grandTotal
          }
        }

        )
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
exports.sales_get_sale_history_details_chart = (req, res, next) => {
  var type = req.params.type;
  var date = new Date()
  if(type === 'quarterly'){
    date.setMonth(date.getMonth()-4)
  date.setDate(01)
  }
  else if (type === 'halfyearly'){
    date.setMonth(date.getMonth()-6)
  date.setDate(01)
  }
  else if (type === 'anually'){
   date.setMonth(date.getMonth()-12)
  date.setDate(01)
  }
  else {
    res.status(404).json({"message": "Please Enter params as quarterly/halfyearly/anually"})
  }
  
  Sales.find({
    "date": { $gte: date, $lte: new Date() }
  })
    .sort({ date: 1 })
    .exec()
    .then(docs => {
      const response = {
        sale: docs.map(data => {
          const date = data.date === null ? '' : data.date.toISOString().split('-')[2].split('T')[0]  + data.date.toDateString().split(' ')[1]
          return {
            time: date,
            amount: data.grandTotal
          }
        }

        )
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

exports.sales_get_monthly_profit_details = (req, res, next) => {
  var date = new Date();
  var dateOnMonthStart = date.toISOString().split('-')[0] + '-' + date.toISOString().split('-')[1] + '-' + '01' + 'T' + '00:00:00.000Z';
  Sales.find({
    "date": { $gte: dateOnMonthStart, $lte: date }
  })
  .sort({ date: 1 })
  .exec()
  .then(docs => {
    let totalPurchaseRate = 0;
    let totalSellingRate = 0;
    let totalPurchaseGst = 0;
    let totalSellingGst = 0;
    const arr = [];
    docs.map(data => {
      let itemArr =[];
      data.orderData.map(data => {
        let sellingRate = data.sellingRate + data.sellingRate*(data.gst/100); // inclusive gst
        let profit = parseFloat(parseFloat(sellingRate - data.purchaseRate).toFixed(2));
        totalPurchaseRate = parseFloat(parseFloat(totalPurchaseRate + (data.purchaseRate * data.checkout)).toFixed(2));
        totalPurchaseGst = parseFloat(parseFloat(totalPurchaseGst + data.rate*(data.gst/100)*data.checkout).toFixed(2));
        totalSellingRate = parseFloat(parseFloat(totalSellingRate + (sellingRate * data.checkout)).toFixed(2));
        totalSellingGst = parseFloat(parseFloat(totalSellingGst + data.sellingRate*(data.gst/100)*data.checkout).toFixed(2));
        const response = {
          item: data.item,
          checkoutOuantity: data.checkout,
          gst: data.gst,
          purchaseRateWithoutGst: data.rate,
          purchaseRate: data.purchaseRate,  // gst already included
          sellingRateWithoutGst : data.sellingRate,
          sellingRate: sellingRate,
          profitPerUnit: profit,
          netProfit: parseFloat(parseFloat(profit*data.checkout).toFixed(2))
        }
      itemArr.push(response);
      });
      const output = {
        itemArr: itemArr,
        customerName: data.customerName,
        invoiceNo: data.invoiceNo,
        date: data.date,
        addedBy: data.addedBy
      }
      arr.push(output);
    });
    Expense.find({
      "date": { $gte: dateOnMonthStart, $lte: date }
    })
    .then(response => {
        var transportationSum = 0;
        var consumablesSum = 0;
        var utilitySum = 0;

        for(var i = 0; i< response.length; i++) {
          if(response[i].type === 'Transportation') {
              transportationSum += response[i].amount;
              
          }
          else if(response[i].type === 'Consumables') {
              consumablesSum += response[i].amount;
          }
          else if(response[i].type === 'Utility') {
              utilitySum += response[i].amount;
          }    
        }
        const result = {
          data: arr,
          totalPurchaseRateIncludingGst: totalPurchaseRate,
          totalPurchaseGst: totalPurchaseGst,
          totalSellingRateIncludingGst: totalSellingRate,
          totalSellingGst: totalSellingGst,
          gstReturn: parseFloat((totalSellingGst - totalPurchaseGst).toFixed(2)),
          profitsExcludingExpenses: parseFloat((totalSellingRate - totalPurchaseRate).toFixed(2)),
          totalTransportationCost: transportationSum,
          totalUtilityCost: utilitySum,
          totalConsumablesCost: consumablesSum,
          totalExpenses: transportationSum + utilitySum + consumablesSum,
          netProfit: parseFloat((totalSellingRate - totalPurchaseRate).toFixed(2)) - (transportationSum + utilitySum + consumablesSum)
        }
        res.status(200).json(result);
    })
    .catch(err => res.status(500).json(err))
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  })
}

exports.sales_update_transaction =  (req, res, next) => {
  const id = req.params.id;
  Sales.update({_id: id}, { $set: { 
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