import {ADD_TO_STORE , DECREMENT, INCREMENT , REMOVE_TO_STORE , REMOVE_ALL} from "../constants/constant";

const initialState = {
    numberStore:0,
    products : [],
    Store: [],
    qty: 1
};

export const productReducer = (state = [],action) => {
    switch (action.type) {
        // case ADD_TO_STORE:
        //     // console.log('add reducers',action)
        //     return [
        //         ...state,
        //         { products: action.payload}
        //     ];

        case ADD_TO_STORE:
            console.log('add reducers',state)
            const check = state.find((item) => item.products._id === action.payload._id );
            if(check) {
                // console.log("checkkkkkkkkkkkkk", action.payload ,"5555",)
                state = state.map((item) => item.products._id === action.payload._id ? { ...item, qty : item.qty + 1 } : item )
            }else{
                return [
                    ...state,
                    {  products: action.payload,qty:1}
                ]};

            case REMOVE_TO_STORE:
            // console.log('remove reducers',state)
            const index = state.filter(item => item.products._id !== action.payload);
            return index;

        case REMOVE_ALL:
            console.log(state)
            return state = [];

        case DECREMENT:
            console.log("====================")
            return state.map((item) => item.products._id === action.payload.products._id ? { ...item, qty : item.qty - 1 } : item );

        case INCREMENT:
            // console.log("====================",state[0].products._id)
            return state.map((item) => item.products._id === action.payload.products._id ? { ...item, qty : item.qty + 1 } : item );




        default:
            return state;
    }
}
