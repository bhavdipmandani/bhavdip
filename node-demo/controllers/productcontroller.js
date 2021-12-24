const { addproduct : Model } = require('../models')
const entityName = 'Product'


// exports.add = (req, res) => {
//     const { product_name, categories, image, description, price} = req.body
//
//             const product = new Model({
//                 product_name,
//                 categories,
//                 image: `images/${req.file.filename}`,
//                 // image : req.file,
//                 description,
//                 price,
//             })
//             product.save(err => {
//                 if (err) {
//                     res.send(err)
//                 } else {
//                     res.status(200).json({
//                         success: true,
//                         code: 200,
//                         data: {
//                             product: product
//                         },
//                         error: null,
//                         message: "Product added sucessfully.",
//                     })
//                 }
//             })
//
//     // })
//
// };
exports.add = async (req, res) => {
    req.body.image = req.file.path;
    try {
        let single = new Model(req.body);

        single = await single.save();
        return res.data({[entityName]: single});
    } catch (e) {
        return res.error(e);
    }
}



// list of products api

exports.list = async (req, res) => {
    try {
        const {params: {id}} = req;
        if (id) {
            const single = await Model.findById(id);
            if (!single) {
                return res.message(`${entityName} not found`, 409);
            }
            return res.data({[entityName]: single});
        } else {
            const dataList = await Model.find();
            if (!dataList) {
                return res.message(`${entityName} not found`, 409);
            }
            return res.data({[`${entityName}List`]: dataList})
        }
    } catch (e) {
        return res.error(e)
    }
}
//
// router.get("/api/demos/:name", async (req, res) => {
exports.productList1 = async (req, res) => {
    try {
        const _id = req.params._id;
        const ProductList = await Model.findOne({ _id });

        if (!ProductList) {
            return res.status(404).send();
        } else {
            res.status(200).json({
                success: true,
                code: 200,
                data: {
                    ProductList
                },
                error: null,
                message: 'data found'
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




// exports.list = async (req, res) => {
//     try {
//         const product_data = await Model.find();
//         res.status(200).json({
//             success: true,
//             code: 200,
//             data: {
//                 products: product_data
//             },
//             error: null,
//             mesage: 'Product Data found'
//         });
//     } catch (e) {
//         res.status(400).json({
//             success: false,
//             code: 400,
//             data: null,
//             error: e,
//             mesage: e.mesage
//         });
//     }
//
//
// };


// update Demo Records By Id

exports.update = async (req, res) => {
    if (req.file?.path) {
        req.body.image = req.file.path;
    }
    console.log(req.body)

    try {
        const _id = req.params._id;
        const single = await Model.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        if (!single) {
            return res.message('Can not update', 409);
        }
        return res.data({[entityName]: single});
    } catch (e) {
        return res.error(e)
    }

}
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
