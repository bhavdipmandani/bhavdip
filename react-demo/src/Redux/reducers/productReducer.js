import {ADD_TO_STORE} from "../constants/constant";
import {REMOVE_TO_STORE} from "../constants/constant";
// import {INCREASE_QUANTITY} from "../constants/constant";
// import {DECREASE_QUANTITY} from "../constants/constant";

const initialState = {
    numberStore:0,
    products : [],
    Store: [],
    quantity: 1
};

export const productReducer = (state = [],action) => {
    switch (action.type) {
        case ADD_TO_STORE:
            console.log('add reducers',action)
            return [
                ...state,
                { products: action.payload}
            ];


            // break;
        case REMOVE_TO_STORE:
            console.log('remove reducers',state)
            const index = state.filter(item => item.products._id !== action.payload);
            return index;

        // case INCREASE_QUANTITY:
        //     state.numberStore++
        //     state.Store[action.payload].quantity++;
        //
        //     return [
        //         ...state
        //     ]
        //
        //     // break;
        //
        // case DECREASE_QUANTITY:
        //     let quantity = state.Store[action.payload].quantity;
        //     if(quantity > 1){
        //         state.numberStore--;
        //         state.Store[action.payload].quantity--;
        //     }
        //
        //     return [
        //         ...state
        //     ]

        default:
            return state;
    }
}
