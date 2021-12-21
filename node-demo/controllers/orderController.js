const { ordermodel : Model } = require('../models')


exports.add = async (req, res) => {

    const order = new Model()
    // const _id = req.params.id;
    // const productData = await Model.findOneAndUpdate(_id, {$push: {products :  req.body.productId , users :  req.body.userId}} , {
    //     new: true,
    // });
    //
    // const result = [check + productData];
    // console.log(check)
    order.orderData = [];
    // check.users = [];

    order.save(err => {
        if (err) {
            res.send(err)
        } else {
            res.status(200).json({
                success: true,
                code: 200,
                data: {
                    order
                },
                error: null,
                message: "Product Added To Store Successfully.",
            })
        }
    })
};

exports.list = async (req, res) => {
    try {
        const order = await Model.find({}).populate('orderData');
        // const order = await Model.find({}).populate({path: 'orderData' , select:['addressId']});
        res.status(200).json({
            success: true,
            code: 200,
            data: {
                order
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


exports.update = async (req , res) => {
    try {
        const _id = req.params._id;
        const order = await Model.findByIdAndUpdate(_id, {$push: {orderData : { addressId:  req.body.addressId , productStoreId :  req.body.productStoreId , totalAmount :  req.body.totalAmount}}} , {
            new: true,
        });
        if (!order) {
            return res.status(404).send();
        } else {
            res.status(200).json({
                success: true,
                code: 200,
                data: {
                    order
                },
                error: null,
                message: 'Order Data found'
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
}

