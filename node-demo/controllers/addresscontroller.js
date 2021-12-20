const { address_model : Model } = require('../models')
// add product api


exports.add = (req, res) => {
    const { street, city, state, zip, country} = req.body


    // console.log(req.file.filename)
    // Product.findOne({ product_name: product_name }, (err) => {
    const address = new Model({
        street, city, state, zip, country
    })
    address.userId = [];
    address.save(err => {
        if (err) {
            res.send(err)
        } else {
            res.status(200).json({
                success: true,
                code: 200,
                data: {
                    address: address
                },
                error: null,
                message: "Address added successfully.",
            })
        }
    })

    // })

};

// list of products api


exports.list = async (req, res) => {
    try {
        // const _id = req.params._id;
        const address_data = await Model.find().populate('userId');
        // const address_data = await Model.find().sort({_id: -1}).limit(1).populate('userIds');
        res.status(200).json({
            success: true,
            code: 200,
            data: {
                address: address_data
            },
            error: null,
            message: 'Address Data found'
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            code: 400,
            data: null,
            error: e,
            message: e.message
        });
    }
};


exports.listbyId = async (req, res) => {
    try {
        // const _id = req.params._id;
        // const address_data = await Model.findById(_id).populate('userId');
        const address_data = await Model.find().sort({_id: -1}).limit(1).populate('userIds');
        res.status(200).json({
            success: true,
            code: 200,
            data: {
                address: address_data
            },
            error: null,
            message: 'Address Data found'
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            code: 400,
            data: null,
            error: e,
            message: e.message
        });
    }
};




// {
//     "addressId" : "61bd7de10be1ea210c308e17",
//     "productStoreId" : "61bd6fcd96261d11fcf970b5",
//     "totalAmount" : "11111"
//
// }

// update Demo Records By Id

exports.update = async (req, res) => {
    try {
        const _id = req.params._id;
        const changeAddress = await Model.findByIdAndUpdate(_id, {$push: {userId :  req.body.userId}} , {
            new: true,
        });

        if (!changeAddress) {
            return res.status(404).send();
        } else {
            res.status(200).json({
                success: true,
                code: 200,
                data: {
                    address: changeAddress
                },
                error: null,
                message: 'Address Data found'
            });
        }

    } catch (e) {
        res.status(400).json({
            success: false,
            code: 400,
            data: null,
            error: e,
            message: e.message
        });
    }
};

// Delete Demo Record By Id

// router.delete("/api/demos/:id", async (req, res) => {
exports.destroy = async (req, res) => {
    try {
        // const id = req.params.id;
        const deleteAddresst = await Model.findByIdAndDelete(req.params._id)
        if (!req.params.id) {
            return res.status(404).send();
        } else {
            res.send(deleteAddresst);
        }
    } catch (e) {
        res.status(500).send(e);
    }
};
