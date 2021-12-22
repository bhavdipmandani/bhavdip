import React from 'react'

import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import '../../assets/css/menu.css'


export default function Menu() {
    const userName = localStorage.getItem('Name');
  return (
    <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* Brand Logo */}
      <a href="#" className="brand-link" style={{ textDecoration: 'none' }}>
        <img
          src="dist/img/AdminLTELogo.png"
          alt="AdminLTE Logo"
          className="brand-image img-circle elevation-3"
          style={{ opacity: ".8" }}
        />
        <span className="brand-text font-weight-light" style={{ textDecoration: 'none' }}>Product Demo</span>
      </a>
      {/* Sidebar */}
      <div className="sidebar">
        {/* Sidebar user panel (optional) */}
        <div className="user-panel mt-3 pb-3 mb-3 d-flex">
          <div className="image">
            <img
              src="dist/img/user2-160x160.jpg"
              className="img-circle elevation-2"
              alt="User Image"
            />
          </div>
          <div className="info">
            <a href="#" className="d-block" style={{ textDecoration: 'none' }}>
                {userName}
            </a>
          </div>
        </div>
        {/* Sidebar Menu */}
        <nav className="mt-2">
          <ul
            className="nav nav-pills nav-sidebar flex-column"
            data-widget="treeview"
            role="menu"
            data-accordion="false"
          >
            {/* ---------------------- Add / list Product --------------------------- */}

            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fa fa-product-hunt" />
                <p>
                  Products
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">
                 <li className="nav-item">
                <Link to="/add_product" type="submit" value="Create Product"  className="nav-link">
                    <i className="fa fa-plus nav-icon" aria-hidden="true" />
                    <p>Add_Product</p>
                    </Link>
                </li>
                <li className="nav-item">
                <Link to="/admin_pro_list" type="submit" value="Create Product"  className="nav-link">
                    <i className="fa fa-list nav-icon" />
                    <p>Product_list</p>
                 </Link>
                </li>
              </ul>
            </li>


              {/* ------------------------ Address Menu ----------------- */}

            <li className="nav-item has-treeview">
              <a href="#" className="nav-link">
                <i className="nav-icon fas fa-address-card" />
                <p>
                  Addresses
                  <i className="right fas fa-angle-left" />
                </p>
              </a>
              <ul className="nav nav-treeview">

                <li className="nav-item">
                <Link to="/Admin_Address_list" type="submit" value="Create Product"  className="nav-link">
                    <i className="fa fa-list nav-icon" />
                    <p>Address_list</p>
                 </Link>
                </li>
              </ul>
            </li>

              {/* ------------------------ Retailer's Order List ----------------- */}

              <li className="nav-item has-treeview">
                  <a href="#" className="nav-link">
                      <i className="nav-icon fas fa-shopping-cart" />
                      <p>
                          Orders
                          <i className="right fas fa-angle-left" />
                      </p>
                  </a>
                  <ul className="nav nav-treeview">

                      <li className="nav-item">
                          <Link to="/orderList" type="submit" value="Create Product"  className="nav-link">
                              <i className="fa fa-list nav-icon" />
                              <p>Order List</p>
                          </Link>
                      </li>
                  </ul>
              </li>


          </ul>
        </nav>
        {/* /.sidebar-menu */}
      </div>
      {/* /.sidebar */}
    </aside>
  );
}
