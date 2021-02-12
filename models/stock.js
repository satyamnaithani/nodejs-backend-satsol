const mongoose = require('mongoose');

const stockSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    item: { type: String, required: true },
    lotNo: { type: String, required: true },
    billNo: { type: String },
    exp: { type: Date },
    vendor: { type: String, required: true },
    initialQuantity: { type: Number, default: 1 },
    quantity: { type: Number, required: true },
    rate: { type: Number, required: true },
    gst: { type: Number, required: true },
    purchaseRate: { type: Number, required: true },
    receiveDate: { type: Date, required: true },
    billDate: { type: Date },
    uom: { type: String, required: true },
    hsn: { type: String, required: true },
    itemCode: { type: String, required: true },
    addedBy: { type: String }
});

module.exports = mongoose.model('Stock', stockSchema);