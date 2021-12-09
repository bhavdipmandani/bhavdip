import React, { Component } from "react";
import Headers from "./Header";
import Menu from "./Menu";
import Content from "./Content";
import Footer from "./Footer";
// import AddProduct from "./add_product";
// import Admin_pro_list from "./admin_pro_list";

export default class Main extends Component {
  render() {
    return (
      <div>
        <Headers />
        <Menu />
        <Content />
        <Footer />
        {/* <AddProduct />
        <Admin_pro_list /> */}
      </div>
    );
  }
}
