const { address_model : Model } = require('../models')
const entityName = 'Address';
// add product api

exports.add = async (req,res) => {
    try {
        let single = new Model(req.body);

        single = await single.save();
        return res.data({[entityName]: single});
    } catch (e) {
        return res.error(e);
    }
}


exports.list = async (req, res) => {
    try {
        // const _id = req.params._id;
        const address_data = await Model.find().populate('userId');
        // const address_data = await Model.find().sort({_id: -1}).limit(1).populate('userIds');
        res.status(200).json({
            success: true,
            code: 200,
            data: {
                address: address_data
            },
            error: null,
            message: 'Address Data found'
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


exports.listbyId = async (req, res) => {
    try {
        // const _id = req.params._id;
        // const address_data = await Model.findById(_id).populate('userId');
        const address_data = await Model.find().sort({_id: -1}).limit(1).populate('userIds');
        res.status(200).json({
            success: true,
            code: 200,
            data: {
                address: address_data
            },
            error: null,
            message: 'Address Data found'
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

// update Demo Records By Id

exports.update = async (req, res) => {
    try {
        const _id = req.params._id;
        const changeAddress = await Model.findByIdAndUpdate(_id, {$push: {userId :  req.body.userId}} , {
            new: true,
        });

        if (!changeAddress) {
            return res.status(404).send();
        } else {
            res.status(200).json({
                success: true,
                code: 200,
                data: {
                    address: changeAddress
                },
                error: null,
                message: 'Address Data found'
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

// Delete Demo Record By Id

// router.delete("/api/demos/:id", async (req, res) => {
exports.destroy = async (req, res) => {
    try {
        const deleteAddress = await Model.findByIdAndDelete(req.params._id)
        if (!req.params._id) {
            return res.status(404).send();
        } else {
            res.send(deleteAddress);
        }
    } catch (e) {
        res.status(500).send(e);
    }
};
