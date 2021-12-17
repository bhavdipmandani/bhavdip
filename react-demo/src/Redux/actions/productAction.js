const {ADD_TO_STORE ,REMOVE_TO_STORE , DECREMENT, INCREMENT,REMOVE_ALL} = require("../constants/constant")


export const addProduct = (product) => {
    // console.log("action",product)/
    return{
        type: ADD_TO_STORE,
        payload: product
    };
};
export  const removeProduct = (product) => {
    return{
        type:REMOVE_TO_STORE,
        payload: product
    };
};
export const removeAll = (product) => {
    return{
        type:REMOVE_ALL,
        payload: product
    };
};
export const decrementProductQty = (product) => {
    return{
        type:DECREMENT,
        payload: product
    };
};
export const incrementProductQty = (product) => {
    return{
        type:INCREMENT,
        payload: product
    };
};
//

// export default (addProduct );
// export default (addProduct , removeProduct);
