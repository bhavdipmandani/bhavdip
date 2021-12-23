// import './App.css'
import Login from "./components/master/Login/login";
import Admin_pro_list from "./components/master/products/admin_pro_list"


import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import React, { useState } from 'react';


import Main from "./components/master/Main";
import AddProduct from "./components/master/products/add_product";
import Admin_Address_list from './components/master/Address/address_list'
import OrderList from './components/master/order/orderList'
import Profile from "./components/master/profile/profile";
import Edit_product from "./components/master/products/Edit_product";

function App(props) {

  const [user, setLoginUser] = useState({})

  return (
      <div className="App">
        <Router>
          <Switch>

            <Route path="/login">
              <Login setLoginUser={setLoginUser} />
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

            <Route path="/editProduct">
              <Edit_product />
            </Route>

            <Route path='/orderList'>
              <OrderList />
            </Route>

            <Route path="/profile">
              <Profile />
            </Route>

            <Route path="/">
              <Main />
            </Route>

          </Switch>
        </Router>

       </div>
  );
}

export default App;
