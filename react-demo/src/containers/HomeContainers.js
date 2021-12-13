import Retailer_Header from "../components/products/Retailer_header";
import { connect } from "react-redux";
import  addProduct  from "../Redux/actions/productAction";
// import  removeProduct  from "../Redux/actions/productAction";


const mapStateToProps = state => ({
    storeProduct:state.productReducer
})

const mapDispatchToProps = dispatch => ({
  addToCartHandler:Products => dispatch(addProduct(Products)),
  // removeToCartHandler:Products => dispatch(removeProduct(Products))
})



export default connect(mapStateToProps,mapDispatchToProps)(Retailer_Header);
