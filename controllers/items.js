const Item = require('../models/item')
const mongoose = require('mongoose');

exports.items_get_all_item_name =  (req, res, next) => {
    Item.find()
    .sort({'name': 1})
    .exec()
    .then(docs => {
        res.status(200).json({
            count: docs.length,
            items: docs.map(doc => {
                return {
                    name: doc
                }
            })  
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
}

exports.items_create_item = (req, res, next) => {
    let itemCount = null;
    Item.find({catogory: req.body.catogory}).countDocuments().exec().then(result => { 
        itemCount = ++result;
        const item = new Item({
            _id: new mongoose.Types.ObjectId(),
            catogory: req.body.catogory,
            name: req.body.name,
            hsn: req.body.hsn,
            gst: req.body.gst,
            uom: req.body.uom,
            itemCode: get_item_code(req.body.catogory, itemCount),
            addedBy: req.body.addedBy
        });
        item.save().then(result => {
            res.status(201).json({
                message: 'Created Item Successfully!'
            })
        }).catch(err => {res.status(500).json({error: err})})
    }).catch(err => res.status(500).json({error: err}))
}

exports.items_get_item_details =  (req, res, next) => {
    Item.find({name: req.params.itemName})
    .sort({'name': 1})
    .exec()
    .then(item => {
        res.status(200).json({
            item: item
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
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

// Common Functions
const get_item_code = (category, itemCount) => {
    let itemCode = null;
    switch (category) {
        case 'Medical Equipment':
            itemCode =  itemCount < 10 ?
            'ME00' + itemCount
            : itemCount >= 10 && itemCount <= 99 ?
            'ME0' + itemCount
            : 'ME' + itemCount
            break;

        case 'Spares':
            itemCode = itemCount < 10 ?
            'SP00' + itemCount
            : itemCount >= 10 && itemCount <= 99 ?
            'SP0' + itemCount
            : 'SP' + itemCount
            break;

        case 'Consumables':
            itemCode = itemCount < 10 ?
            'CM00' + itemCount
            : itemCount >= 10 && itemCount <= 99 ?
            'CM0' + itemCount
            : 'CM' + itemCount
            break;

        case 'Service':
            itemCode = itemCount < 10 ?
            'SE00' + itemCount
            : itemCount >= 10 && itemCount <= 99 ?
            'SE0' + itemCount
            : 'SE' + itemCount
            break;

        case 'Office Durables':
            itemCode = itemCount < 10 ?
            'OD00' + itemCount
            : itemCount >= 10 && itemCount <= 99 ?
            'OD0' + itemCount
            : 'OD' + itemCount
            break;

        case 'Office Consumables':
            itemCode = itemCount < 10 ?
            'OC00' + itemCount
            : itemCount >= 10 && itemCount <= 99 ?
            'OC0' + itemCount
            : 'OC' + itemCount
            break;

        case 'Transportation':
            itemCode = itemCount < 10 ?
        'TR00' + itemCount
        : itemCount >= 10 && itemCount <= 99 ?
        'TR0' + itemCount
        : 'TR' + itemCount
            break;

        default:
            console.log("Item Category not available");
    }
    return itemCode;
}