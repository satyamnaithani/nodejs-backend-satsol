const Item = require('../models/item')
const mongoose = require('mongoose');

exports.items_get_all_item_name =  (req, res, next) => {
    Item.find()
    .sort({'name': 1})
    .exec()
    .then(docs => {res.status(200).json(docs) })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
}

exports.items_create_item =  async (req, res, next) => {
    global.count;
    global.itemCode;
    await Item.find({catogory: req.body.catogory}).countDocuments().exec().then(res => { global.count = ++res });
    switch (req.body.catogory) {
        case 'Medical Equipment':
            global.itemCode =  global.count < 10 ?
            'ME00' + global.count
            : global.count >= 10 && global.count <= 99 ?
            'ME0' + global.count
            : 'ME' + global.count
            break;

        case 'Spares':
            global.itemCode = global.count < 10 ?
            'SP00' + global.count
            : global.count >= 10 && global.count <= 99 ?
            'SP0' + global.count
            : 'SP' + global.count
            break;

        case 'Consumables':
            global.itemCode = global.count < 10 ?
            'CM00' + global.count
            : global.count >= 10 && global.count <= 99 ?
            'CM0' + global.count
            : 'CM' + global.count
            break;

        case 'Service':
            global.itemCode = global.count < 10 ?
            'SE00' + global.count
            : global.count >= 10 && global.count <= 99 ?
            'SE0' + global.count
            : 'SE' + global.count
            break;

        case 'Office Durables':
            global.itemCode = global.count < 10 ?
            'OD00' + global.count
            : global.count >= 10 && global.count <= 99 ?
            'OD0' + global.count
            : 'OD' + global.count
            break;

        case 'Office Consumables':
            global.itemCode = global.count < 10 ?
            'OC00' + global.count
            : global.count >= 10 && global.count <= 99 ?
            'OC0' + global.count
            : 'OC' + global.count
            break;

        case 'Transportation':
            global.itemCode = global.count < 10 ?
        'TR00' + global.count
        : global.count >= 10 && global.count <= 99 ?
        'TR0' + global.count
        : 'TR' + global.count
            break;

        default:
            res.status(500).json('Catogory Not Found!');
      }
    const item = new Item({
        _id: new mongoose.Types.ObjectId(),
        catogory: req.body.catogory,
        name: req.body.name,
        hsn: req.body.hsn,
        gst: req.body.gst,
        uom: req.body.uom,
        itemCode: global.itemCode,
        addedBy: req.body.addedBy
    });
    await item.save()
    .then(result => {
        res.status(201).json({
            message: 'Created Item Successfully!',
            createdProduct: {
                _id: result._id,
                catogory: result.catogory,
                name: result.name,
                hsn: result.hsn,
                gst: result.gst,
                uom: result.uom,
                itemCode: result.itemCode,
                addedBy: result.addedBy
            }
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
}


exports.items_update_item =  (req, res, next) => {
    const id = req.params.id;
    Item.update({_id: id}, { $set: { 
          name: req.body.name,
          hsn: req.body.hsn,
          gst: req.body.gst,
          uom: req.body.uom
        }})
        .exec()
        .then(response => {
            res.status(201).json({
                message: 'Item updated'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err})
        });
}
exports.items_delete_item = (req, res, next) => {
    const id = req.params.id;
    Item.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Item deleted',
            result: result
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        });
    });
}