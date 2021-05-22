const mongoose = require('mongoose');

const salesSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, 
    orderData: {type: Array, required: true},
    customer: {type: Object, required: true},
    customerName: {type: String, required: true},
    date: {type: Date, required: true},
    totalRate: {type: Number, required: true},
    totalGst: {type: Number, required: true},
    grandTotal: {type: Number, required: true},
    invoiceNo: {type: String, required: true},
    challanNo: {type: String},
    challanDate: {type: Date},
    orderNumber: {type: String},
    orderDate:{type: Date},
    ewbNo: {type: String},
    ewbDate: {type: Date},
    dispatchDocNo: {type: String},
    dispatchDocDate: {type: Date},
    dispatchThrough: {type: String},
    destination: {type: String},
    termsOfDelivery: {type: String},
    interState: {type: Boolean, required: true},
    grandTotalInWords:{type: String, required: true},
    transaction: [Object],
    addedBy: {type: String},
});

module.exports = mongoose.model('Sales', salesSchema);