const Address = require('../models/address_model')




// add product api
 

const add_address = (req, res) => {
    const { name, email, phone, street, city, state, zip , country} = req.body

  
    // console.log(req.file.filename)
    // Product.findOne({ product_name: product_name }, (err) => {
            const address = new Address({ 
                    name, email, phone, street, city, state, zip , country
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


const address_list = async (req, res) => {
    try {
        const address_data = await Address.find();
        res.status(200).json({
            success: true,
            code: 200,
            data: {
                    address: address_data
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

    const update_address = async (req, res) => {
    try {
        const _id = req.params._id;
        const changeaddress = await Address.findOneAndUpdate(_id, req.body, {
            new: true,
        });

        if (!changeaddress) {
            return res.status(404).send();
        } else {
            res.status(200).json({
                success: true,
                code: 200,
                data: {
                    address: changeaddress
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
    const delete_address = async (req, res) => {
    try {
        // const id = req.params.id;
        const deleteAddresst = await Address.findByIdAndDelete(req.params.id)
        if (!req.params.id) {
            return res.status(404).send();
        } else {
            res.send(deleteAddresst);
        }
    } catch (e) {
        res.status(500).send(e);
    }
};

module.exports = {
    add_address,
    address_list,
    update_address,
    delete_address
};