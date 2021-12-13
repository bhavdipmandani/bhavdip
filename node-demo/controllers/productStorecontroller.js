const { product_store : Model } = require('../models')

exports.add = async (req, res) => {

    const check = new Model()

    check.products = [];
    check.users = [];
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
                message: "Product added to Store sucessfully.",
            })
        }
    })
};

exports.list = async (req, res) => {
    try {
        const product_data = await Model.find({}).populate('products').populate('users');
        res.status(200).json({
            success: true,
            code: 200,
            data: {
                product_data
            },
            error: null,
            mesage: 'Product Data found'
        });
    } catch (e) {
        res.status(400).json({
            success: false,
            code: 400,
            data: null,
            error: e,
            mesage: e.mesage
        });
    }


};


exports.update = async (req , res) => {
    try {
        const _id = req.params.id;
        const productData = await Model.findOneAndUpdate(_id, {$push: {products :  req.body.productId , users :  req.body.userId}}, {
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
