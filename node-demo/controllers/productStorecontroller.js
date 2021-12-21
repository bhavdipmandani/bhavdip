const { product_store : Model } = require('../models')

exports.add = async (req, res) => {

    const check = new Model()
    // const _id = req.params.id;
    // const productData = await Model.findOneAndUpdate(_id, {$push: {products :  req.body.productId , users :  req.body.userId}} , {
    //     new: true,
    // });
    //
    // const result = [check + productData];
    // console.log(check)
    check.productStoreData = [];
    // check.users = [];

    check.save(err => {
        if (err) {
            res.send(err)
        } else {
            res.status(200).json({
                success: true,
                code: 200,
                data: {
                    check
                },
                error: null,
                message: "Product Added To Store Successfully.",
            })
        }
    })
};

exports.list = async (req, res) => {
    try {
        // const product_data = await Model.find().populate({ select: 'productStoreData.productId, productStoreData.userId' });
        const product_data = await Model.find().populate('productStoreData.productId').populate('productStoreData.userId');
        res.status(200).json({
            success: true,
            code: 200,
            data: {
                product_data
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
        const productData = await Model.findByIdAndUpdate(_id, {$push: {productStoreData : {$each :[{productId:  req.body.productId} , {userId :  req.body.userId}]}}} , {
        // const productData = await Model.findByIdAndUpdate(_id, {$push: {productStoreData : { productId:  req.body.productId , userId :  req.body.userId}}} , {
            new: true,
        });
        if (!productData) {
            return res.status(404).send();
        } else {
            res.status(200).json({
                success: true,
                code: 200,
                data: {
                    productData
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
}
