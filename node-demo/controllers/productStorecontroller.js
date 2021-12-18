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
        const product_data = await Model.find({}).populate('[productStoreData]');
        // const product_data = await Model.find({}).populate({path: 'products' , select:['product_name' , 'price']}).populate('users');
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
        const _id = req.params.id;
        const productDatas = await Model.findOneAndUpdate(_id, {$push: {productStoreData : { products:  req.body.productId , users :  req.body.userId}}} , {
            new: true,
        });
        if (!productDatas) {
            return res.status(404).send();
        } else {
            res.status(200).json({
                success: true,
                code: 200,
                data: {
                    productDatas
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
