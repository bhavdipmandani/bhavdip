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


exports.userOrder = async (req,res) => {
    try {
        const {params: {id}} = req;
        console.log(id)
        const orderList = await Model.find({userId: id}).populate('addressId').populate('userId').populate('productData.productId');

        return res.data(orderList);
    }catch (e){
        return console.log(e)
    }
}
