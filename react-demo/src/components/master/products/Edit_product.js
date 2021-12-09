import React, { Component } from 'react';
import axios from 'axios';
// import Product_list from './product_list';

export default class Editproduct extends Component {

          constructor(props) {
                    super(props)

                    this.onChangeProductName = this.onChangeProductName.bind(this);
                    this.onChangeProductCategories = this.onChangeProductCategories.bind(this);
                    this.onChangeProductDescription = this.onChangeProductDescription.bind(this);
                    this.onChangeProductPrice = this.onChangeProductPrice.bind(this);


                    this.onSubmit = this.onSubmit.bind(this);

                    this.state = {
                              product_name: '',
                              categories: '',
                              description: '',
                              price: ''
                    }
          }
          // componentDidMount() {  
                   

          //           const productId = this.state.id;
          //           axios.patch(`http://localhost:8000/product_list:/${productId}`)  
          //               .then(response => {  
          //                   this.setState({   
          //                     product_name: response.data.product_name,   
          //                     categories: response.data.categories,  
          //                     description: response.data.description,  
          //                     price: response.data.price });  
                
          //               })  
          //               .catch(function (error) {  
          //                   console.log(error);  
          //               })  
          //           }
               
              
          onChangeProductName(e) {

                    this.setState({ product_name: e.target.value })
          }

          onChangeProductCategories(e) {
                    this.setState({ categories: e.target.value })
          }

          onChangeProductDescription(e) {
                    this.setState({ description: e.target.value })
          }

          onChangeProductPrice(e) {
                    this.setState({ price: e.target.value })
          }

          onSubmit = async (e) => {
                    e.preventDefault();
                    
                    const ProductObject = {
                              _id: this.state._id, 
                              product_name: this.state.product_name,
                              categories: this.state.categories,
                              description: this.state.description,
                              price: this.state.price,
                    };

                    await axios.patch(`http://localhost:8000/product_list/:_id`, ProductObject ,{
                              new: true,
                    }); 

                    this.setState({
                              product_name: '',
                              categories: '',
                              description: '',
                              price: ''
                    })
          };

          render() {
                    // const {product_name} = this.setState;
                    return (
                              <div className="container">
                                        <form onSubmit={this.onSubmit}>
                                                  <div className="mb-3">
                                                            <label className="form-label">Product_Name</label>
                                                            <input type="text" value={this.state.product_name} onChange={this.onChangeProductName.bind(this)} className="form-control" />
                                                  </div>

                                                  <div className="mb-3">
                                                            <label className="form-label">Categories</label>
                                                            <input type="text" value={this.state.categories} onChange={this.onChangeProductCategories} className="form-control" />
                                                  </div>

                                                  <div className="mb-3">
                                                            <label className="form-label">Description</label>
                                                            <input type="text" value={this.state.description} onChange={this.onChangeProductDescription} className="form-control" />
                                                  </div>

                                                  <div className="mb-3">
                                                            <label className="form-label">Price</label>
                                                            <input type="text" value={this.state.price} onChange={this.onChangeProductPrice} className="form-control" />
                                                  </div>

                                                  <div className="mb-3">
                                                            <button type="submit" className="btn btn-primary"  onClick={() => window.location.reload(false)}>Submit</button>
                                                  </div>

                                        </form>
                              </div>
                    )
          }
}