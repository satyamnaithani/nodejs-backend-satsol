const Vendor = require('../models/vendor');
const mongoose = require('mongoose');

exports.vendors_get_all_vendors =  (req, res, next) => {
    Vendor.find()
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            items: docs.map(doc => {
                return {
                  data: doc
                }
            })
        }
        res.status(200).json(response);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    });
}

exports.vendors_get_all_vendor_name =  (req, res, next) => {
    Vendor.find()
    .select('name')
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

exports.vendors_create_vendor = (req, res, next) => {
    let vendorCount = null;
    Vendor.find().countDocuments().exec().then(result => { 
        vendorCount = ++result;
        const vendor = new Vendor({
            _id: new mongoose.Types.ObjectId(),
            name: req.body.name,
            code: get_vendor_code(vendorCount),
            address: req.body.address,
            city: req.body.city,
            state: req.body.state,
            zip: req.body.zip,
            gst: req.body.gst,
            dl: req.body.dl,
            contact: req.body.contact,
            person: req.body.person,
            addedBy: req.body.addedBy
        });
        vendor.save().then((result) => {
            res.status(201).json({
                message: 'Created Vendor Successfully!'
            }).catch(err => {
                res.status(500).json({error: err})
            })
        })
    }).catch(err => {
        res.status(500).json({error: err})
    })
}

exports.vendors_update_customer =  (req, res, next) => {
    const id = req.params.id;  
    Vendor.update({_id: id}, { $set: { 
         name: req.body.name,
         address: req.body.address,
         city:req.body.city,
         state: req.body.state,
         zip: req.body.zip,
         gst: req.body.gst,
         dl: req.body.dl,
         contact: req.body.contact,
         person: req.body.person
        } })
    .exec()
    .then(response => {
        res.status(201).json({
            message: 'Customer updated'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err})
    })
}
exports.vendors_delete_customer = (req, res, next) => {
    const id = req.params.id;
    Vendor.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'Product deleted',
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

//Common functions
const get_vendor_code = (count) => {
    let vendorCode = null;
    if(count < 10) {
        vendorCode = 'VR00' + count;
    } else if(count >= 10 && count <= 99) {
        vendorCode = 'VR0' + count;
    } else {
        'VR' + count;
    }
    return vendorCode;
}