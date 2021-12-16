const {ADD_TO_STORE} = require("../constants/constant")
const {REMOVE_TO_STORE} = require("../constants/constant")

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

//

// export default (addProduct );
// export default (addProduct , removeProduct);
