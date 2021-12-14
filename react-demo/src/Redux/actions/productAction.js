const {ADD_TO_STORE} = require("../constants/constant")
// const {REMOVE_TO_STORE} = require("../constants/constant")
// const {INCREASE_QUANTITY} = require("../constants/constant")
// const {DECREASE_QUANTITY} = require("../constants/constant")

const addProduct = (product) => {
    console.log("action",product)
    return{
        type: ADD_TO_STORE,
        payload: product
    };
};
// const removeProduct = (product) => {
//     return{
//         type:REMOVE_TO_STORE,
//         payload: product
//     };
// };


// const IncreaseQuantity = (product) =>{
//     // console.log("action",product)
//
//     return{
//         type:INCREASE_QUANTITY,
//         payload:product
//     }
// }
// const DecreaseQuantity = (product) => {
//     return{
//         type:DECREASE_QUANTITY,
//         payload: product
//     }
// }

export default (addProduct );
// export default (addProduct , removeProduct);
