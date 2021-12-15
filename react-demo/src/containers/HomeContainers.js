import Retailer_Header from "../components/products/Retailer_header";
import { connect } from "react-redux";
import {addProduct}  from "../Redux/actions/productAction";
// import  removeProduct  from "../Redux/actions/productAction";
// import {IncreaseQuantity}  from "../Redux/actions/productAction";
// import  DecreaseQuantity  from "../Redux/actions/productAction";


const mapStateToProps = state => ({
    storeProduct:state.productReducer
})

const mapDispatchToProps = dispatch => ({
  addToCartHandler:Products => dispatch(addProduct(Products)),
  // removeToCartHandler:Products => dispatch(removeProduct(Products)),
  //   IncreaseQuantity:Products => dispatch(IncreaseQuantity(Products)),
  //   DecreaseQuantity:Products => dispatch(DecreaseQuantity(Products)),

})



export default connect(mapStateToProps,mapDispatchToProps)(Retailer_Header);
