import React , { useEffect, useState }  from "react";
import { BrowserRouter as Link } from "react-router-dom";

export default function Header() {
  const [isLogged, setisLogged] = useState(false);
  useEffect(() => {
    checkStorage();
    return () => {};
  }, [isLogged]);
  function checkStorage() {
    if (localStorage.getItem("user")) {
      setisLogged(true);
    } else {
      setisLogged(false);
    }
  }

  const logout = () => {
    localStorage.clear();
    window.location.href = './login';
}

  return (
    <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
      <ul className="navbar-nav">
        <li className="nav-item">
          <a className="nav-link" data-widget="pushmenu" href="#" role="button">
            <i className="fas fa-bars" />
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="#" className="nav-link">
            Home
          </a>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="#" className="nav-link">
            Contact
          </a>
        </li>
      </ul>
      {/* SEARCH FORM */}
      <form className="form-inline ml-3">
        <div className="input-group input-group-sm">
          <input
            className="form-control form-control-navbar"
            type="search"
            placeholder="Search"
            aria-label="Search"
          />
          <div className="input-group-append">
            <button className="btn btn-navbar" type="submit">
              <i className="fas fa-search" />
            </button>
          </div>
        </div>
      </form>
      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        
      {!isLogged ? (
          <button onClick={logout} className="btn btn-primary ms-4">Logout</button>
        ) : (
          <Link to="/Admin_login" type="submit" value="Create User" className="btn btn-primary btn-block">Login</Link>
        )}
      </ul>
    </nav>
  );
}
