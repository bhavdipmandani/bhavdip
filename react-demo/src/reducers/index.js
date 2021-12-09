import { combineReducers } from 'redux';
import {GET_ALL_PRODUCT,GET_NUMBER_CART,ADD_CART, DECREASE_QUANTITY, INCREASE_QUANTITY, DELETE_CART} from  '../actions';

const initProduct = {
    numberCart:0,
    stores:[],
    _products:[]
}

function todoProduct(state = initProduct,action){
    switch(action.type){
        case GET_ALL_PRODUCT: 
            return{
                ...state,
                _products:action.payload
            }
        case GET_NUMBER_CART:
                return{
                    ...state
                }
        case ADD_CART:
            if(state.numberCart==0){
                let cart = {
                    _id:action.payload._id,
                    quantity:1,
                    producr_name:action.payload.product_name,
                    categories:action.payload.categories,
                    image:action.payload.image,
                    description:action.payload.description,
                    price:action.payload.price
                } 
                state.stores.push(cart); 
            }
            else{
                let check = false;
                state.stores.map((item,key)=>{
                    if(item._id==action.payload._id){
                        state.stores[key].quantity++;
                        check=true;
                    }
                });
                if(!check){
                    let _cart = {
                        // id:action.payload.id,
                        // quantity:1,
                        // name:action.payload.name,
                        // image:action.payload.image,
                        // price:action.payload.price
                        _id:action.payload._id,
                        quantity:1,
                        producr_name:action.payload.product_name,
                        categories:action.payload.categories,
                        image:action.payload.image,
                        description:action.payload.description,
                        price:action.payload.price
                    }
                    state.stores.push(_cart);
                }
            }
            return{
                ...state,
                numberCart:state.numberCart+1
            }
            case INCREASE_QUANTITY:
                state.numberCart++
                state.stores[action.payload].quantity++;
              
               return{
                   ...state
               }
            case DECREASE_QUANTITY:
                let quantity = state.stores[action.payload].quantity;
                if(quantity>1){
                    state.numberCart--;
                    state.stores[action.payload].quantity--;
                }
              
                return{
                    ...state
                }
            case DELETE_CART:
                let product_quantity = state.stores[action.payload].quantity;
                return{
                    ...state,
                    numberCart:state.numberCart - product_quantity,
                    stores:state.stores.filter(item=>{
                        return item.id!=state.stores[action.payload].id
                    })
                   
                }
        default:
            return state;
    }
}
const ShopApp = combineReducers({
    _todoProduct:todoProduct
});
export default ShopApp;