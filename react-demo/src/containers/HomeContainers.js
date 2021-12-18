import Retailer_Header from "../components/header/Retailer_header";
import {connect} from "react-redux";
import {addProduct} from "../Redux/actions/productAction";
import {removeProduct} from "../Redux/actions/productAction";
import {removeAll} from "../Redux/actions/productAction";
import {decrementProductQty} from "../Redux/actions/productAction";
import {incrementProductQty} from "../Redux/actions/productAction";


const mapStateToProps = state => ({
    storeProduct: state.productReducer
})

const mapDispatchToProps = dispatch => ({
    addToCartHandler: Products => dispatch(addProduct(Products)),
    removeToStoreHandler: Products => dispatch(removeProduct(Products)),
    removeAllToStore: Products => dispatch(removeAll(Products)),
    decrementQty: Products => dispatch(decrementProductQty(Products)),
    incrementQty: Products => dispatch(incrementProductQty(Products)),

})


export default connect(mapStateToProps, mapDispatchToProps)(Retailer_Header);
