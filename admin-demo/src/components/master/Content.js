import React from "react";
import AddProduct from "./products/add_product";
import Admin_pro_list from "./products/admin_pro_list";


export default function Content() {
  return (
    <div className="content-wrapper">
      {/* Content Header (Page header) */}
      <div className="content-header">
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col-sm-6">
              <h1 className="m-0 text-dark">Welcome Admin...</h1>
            </div>
            {/* /.col */}
            {/*<div className="col-sm-6">*/}
            {/*  <ol className="breadcrumb float-sm-right">*/}
            {/*    <li className="breadcrumb-item">*/}
            {/*      <a href="#">Home</a>*/}
            {/*    </li>*/}
            {/*    <li className="breadcrumb-item active">Add_Product</li>*/}
            {/*  </ol>*/}
            {/*</div>*/}
            {/* /.col */}
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content-header */}
      {/* Main content */}
      <div className="content">
        <div className="container-fluid">
          <div className="row">
            
           <h1></h1>
            {/*<Admin_pro_list />*/}
            
          </div>
          {/* /.row */}
        </div>
        {/* /.container-fluid */}
      </div>
      {/* /.content */}
    </div>
  );
}
