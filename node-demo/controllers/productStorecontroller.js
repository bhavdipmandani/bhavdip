const { product_store : Model } = require('../models')

exports.add = async (req, res) => {

    const check = new Model({})
    // const _id = req.params.id;
    // const productData = await Model.findOneAndUpdate(_id, {$push: {products : req.body.productId}}, {
    //     new: true,
    // });

    // const result = [check , productData];
    check.products = [];

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
        const product_data = await Model.find({}).populate('products');
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
        const productData = await Model.findOneAndUpdate(_id, {$push: {products :  req.body.productId}}, {
            new: true,
        });

        if (!productData) {
            return res.status(404).send();
        } else {
            res.status(200).json({
                success: true,
                code: 200,
                data: {
                    products: productData
                },
                error: null,
                mesage: 'Product Data found'
            });
        }

    } catch (e) {
        res.status(400).json({
            success: false,
            code: 400,
            data: null,
            error: e,
            mesage: e.mesage
        });
    }
}
