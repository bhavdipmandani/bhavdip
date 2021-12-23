import React , { useEffect, useState }  from "react";
import { Link } from "react-router-dom";
import '../../assets/css/header.css'

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

  const userName = localStorage.getItem('Name');
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
          <Link to='/' className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item d-none d-sm-inline-block">
          <a href="#" className="nav-link">
            Contact
          </a>
        </li>
      </ul>

      {/* Right navbar links */}
      <ul className="navbar-nav ml-auto">
        
      {!isLogged ? (
          // <button onClick={logout} className="btn btn-primary ms-4">Logout</button>

          <div className="dropdown me-5">
            <button className="btn dropdown-toggle" type="button"
                    id="dropdownMenuButton1" data-bs-toggle="dropdown"
                    aria-expanded="false">
              {userName}

            </button>

            <ul className="dropdown-menu drpmenu" aria-labelledby="dropdownMenuButton1">
              <li className="profile"><Link to="/profile" className="me-3 dropdown-item text-dark" style={{ textDecoration: 'none' }}><i className="fa fa-user me-2" aria-hidden="true"></i>User Profile</Link></li>
              <li><a className="dropdown-item" href="#" onClick={logout}><i className="fas fa-sign-out-alt me-2"></i>Logout</a></li>
            </ul>
          </div>
        ) : (
          <Link to="/Admin_login" type="submit" value="Create User" className="btn btn-primary btn-block">Login</Link>
        )}
      </ul>
    </nav>
  );
}
