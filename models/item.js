const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    catogory: { type: String, required: true },
    name: { type: String, required: true },
    hsn: { type: String, required: true },
    gst: {type: String, required: true},
    uom: {type: String, required: true},
    itemCode: {type: String, required: true},
    addedBy: {type: String, required: true}
});

module.exports = mongoose.model('Item', itemSchema)


