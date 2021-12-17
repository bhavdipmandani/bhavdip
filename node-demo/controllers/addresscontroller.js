const { address_model : Model } = require('../models')
// add product api


exports.add = (req, res) => {
    const { name, email, phone, street, city, state, zip, country , userId} = req.body


    // console.log(req.file.filename)
    // Product.findOne({ product_name: product_name }, (err) => {
    const address = new Model({
        name, email, phone, street, city, state, zip, country, userId
    })
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
                message: "Product added sucessfully.",
            })
        }
    })

    // }) 

};

// list of products api 


exports.list = async (req, res) => {
    try {
        const address_data = await Model.find().populate('userId');
        res.status(200).json({
            success: true,
            code: 200,
            data: {
                address: address_data
            },
            error: null,
            message: 'Product Data found'
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


// update Demo Records By Id

exports.update = async (req, res) => {
    try {
        const _id = req.params._id;
        const changeAddress = await Model.findOneAndUpdateid(_id, {$push: {userId :  req.body.userId}} , {
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
                message: 'Product Data found'
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
        const deleteAddresst = await Model.findByIdAndDelete(req.params.id)
        if (!req.params.id) {
            return res.status(404).send();
        } else {
            res.send(deleteAddresst);
        }
    } catch (e) {
        res.status(500).send(e);
    }
};
