const mongoose = require('mongoose');

const salesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    orderData: {type: Array, required: true},
    customer: {type: Object, required: true},
    customerName: {type: String, required: true},
    date: {type: Date, required: true},
    totalRate: {type: Number},
    totalGst: {type: Number},
    grandTotal: {type: Number},
    invoiceNo: {type: String, required: true},
    challanNo: {type: String},
    challanDate: {type: Date},
    modeOfPayment: {type: String},
    orderNumber: {type: String},
    dispatchThrough: {type: String},
    destination: {type: String},
    termsOfDelivery: {type: String},
    interState: {type: Boolean},
    grandTotalInWords:{type: String},
    transaction: [Object],
    addedBy: {type: String},
});

module.exports = mongoose.model('Sales', salesSchema);