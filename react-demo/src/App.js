// import './App.css'
import AddStore from "./components/products/store"
import Address from "./components/products/address"
import CheckOut from "./components/products/checkout"
import Admin_pro_list from "./components/master/products/admin_pro_list"
import Products from "./components/products/products"


import Login from "./components/login/login"
import Admin_login from "./components/master/adminAuth/Admin_login"
import Adminregister from "./components/master/adminAuth/Admin_register"

// Adminregister
import Register from "./components/register/register"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useState } from 'react';


import Main from "./components/master/Main";
import AddProduct from "./components/master/products/add_product";
import Admin_Address_list from './components/master/Address/address_list'
import Product_list from "./components/products/product_list"



function App() {

  const [user, setLoginUser] = useState({})

  return (
    <div className="App">
      <Router>
        <Switch>

        


       
          <Route path="/product_list">
            <Product_list />
          </Route>

          <Route path="/admin_pro_list">
            <Admin_pro_list />
          </Route>

          <Route path="/add_product">
            <AddProduct />
          </Route>

      

          <Route path="/Admin_Address_list">
            <Admin_Address_list />
          </Route>


          <Route path="/main">
            <Main />
          </Route>

            <Route path = "/AddStore">
              <AddStore />
            </Route>

            <Route path = "/Address">
              <Address />
            </Route>

            <Route path = "/Checkout">
              <CheckOut />
            </Route>


            <Route exact path="/">
            {
              user && user._id ? <Products setLoginUser={setLoginUser} /> : <Login setLoginUser={setLoginUser} />
            }
          </Route>

          <Route exact path="/">
            {
              user && user._id ? <AddProduct setLoginUser={setLoginUser} /> : <Admin_login setLoginUser={setLoginUser} />
            }
          </Route>
          <Route path="/login">
            <Login setLoginUser={setLoginUser} />
          </Route>

          <Route path="/Admin_login">
            <Admin_login setLoginUser={setLoginUser} />
          </Route>

          <Route path="/register">
            <Register />
          </Route>

          <Route path="/Admin_register">
            <Adminregister />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
