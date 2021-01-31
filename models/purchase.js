const mongoose = require('mongoose');

const purchaseSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    item: { type: String, required: true },
    lotNo: { type: String },
    billNo: { type: String },
    exp: { type: Date },
    vendor: { type: String, required: true },
    quantity: { type: Number, required: true},
    rate: { type: Number, required: true },
    gst: { type: Number },
    purchaseRate: { type: Number },
    receiveDate: { type: Date },
    billDate: {type: Date},
    uom: {type: String, required: true},
    hsn: {type: String, required: true},
    itemCode: {type: String, required: true},
    addedBy: {type: String}
});

module.exports = mongoose.model('Purchase', purchaseSchema);