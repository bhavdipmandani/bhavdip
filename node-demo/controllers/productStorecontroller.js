const Product_store = require('../models/product_store')

const storeporduct = async (req, res) => {

    const check = new Product_store()
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

const getstoredproduct = async (req, res) => {
    try {
        const product_data = await Product_store.find({}).populate('products').populate('users');
        res.status(200).json({
            success: true,
            code: 200,
            data: {
                Store_products: product_data    
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


const updatesotore = async (req , res) => {
    try {
        const _id = req.params.id;
        const productData = await Product_store.findOneAndUpdate(_id, {$push: {products :  req.body.productId , users :  req.body.userId}}, {
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



module.exports = {
    storeporduct,
    getstoredproduct,
    updatesotore,
};