const { addproduct : Model } = require('../models')

// add product api
 

exports.add = (req, res) => {
    const { product_name, categories, image, description, price} = req.body

            const product = new Model({
                product_name,
                categories,
                image: `images/${req.file.filename}`,
                // image : req.file,
                description,
                price,
            })  
            product.save(err => {
                if (err) {   
                    res.send(err)
                } else { 
                    res.status(200).json({
                        success: true,
                        code: 200,
                        data: {
                            product: product
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
        const product_data = await Model.find();
        res.status(200).json({
            success: true,
            code: 200,
            data: {
                products: product_data
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


// update Demo Records By Id

exports.update = async (req, res) => {
    try {
        const _id = req.params._id;
        const productData = await Model.findOneAndUpdate(_id, req.body, {
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
};

// Delete Demo Record By Id

// router.delete("/api/demos/:id", async (req, res) => {
    exports.destroy = async (req, res) => {
    try {
        // const id = req.params.id;
        const deleteProduct = await Model.findByIdAndDelete(req.params.id)
        if (!req.params.id) {
            return res.status(404).send();
        } else {
            res.send(deleteProduct);
        }
    } catch (e) {
        res.status(500).send(e);
    }
};
