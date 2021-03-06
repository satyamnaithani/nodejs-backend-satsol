const mongoose = require('mongoose');

const vendorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    code: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: String, required: true },
    gst: { type: String, required: true },
    dl: { type: String },
    contact: { type: String },
    person: { type: String },
    addedBy: {type: String, required: true }
});

module.exports = mongoose.model('Vendor', vendorSchema)