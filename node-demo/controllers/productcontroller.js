const Product = require('../models/addproduct')




// add product api
 

const add_product = (req, res) => {
    const { product_name, categories, image, description, price} = req.body

  
    // console.log(req.file.filename)
    // Product.findOne({ product_name: product_name }, (err) => {
            const product = new Product({ 
                product_name,
                categories,
                image: `http://localhost:8000/images/${req.file.filename}`,
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


const product_list = async (req, res) => {
    try {
        const product_data = await Product.find();
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

    const update_product = async (req, res) => {
    try {
        const _id = req.params._id;
        const productData = await Product.findOneAndUpdate(_id, req.body, {
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
    const delete_product = async (req, res) => {
    try {
        // const id = req.params.id;
        const deleteProduct = await Product.findByIdAndDelete(req.params.id)
        if (!req.params.id) {
            return res.status(404).send();
        } else {
            res.send(deleteProduct);
        }
    } catch (e) {
        res.status(500).send(e);
    }
};

module.exports = {
    add_product,
    product_list,
    update_product,
    delete_product
};