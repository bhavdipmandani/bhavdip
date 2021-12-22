const {ordermodel : Model} = require('../models')
const entityName = 'Order';

exports.add = async (req,res) => {
    try {
        let single = new Model(req.body);

        single = await single.save();
        return res.data({[entityName]: single});
    } catch (e) {
        return res.error(e);
    }
}


exports.list = async (req,res) => {
    try {
        let single = await Model.find().populate('addressId').populate('userId').populate('productData.productId');
          return res.data({[entityName]: single});
    } catch (e) {
        return res.error(e);
    }
}
