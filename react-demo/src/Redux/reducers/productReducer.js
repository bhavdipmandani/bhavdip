import {ADD_TO_STORE} from "../constants/constant";
// import {REMOVE_TO_STORE} from "../constants/constant";
const initialState = {
    products : [],
};

export const productReducer = (state = [],action) => {
    switch (action.type) {
        case ADD_TO_STORE:
            console.log('add reducers',action)
            return [
                ...state,
              { products: action.payload}
            ];
            
            break;
    //     case REMOVE_TO_STORE:
    //         console.log('remove reducers',action)
    //         return [
    //             state.pop(),
    //             ...state
    //
    // ];
            
        default:
            return state;
    }
}
