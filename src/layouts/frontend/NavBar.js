import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import productsApi from "../../Api/productApi";

const NavBar = () => {
  const navigate = useNavigate();

  const [isLoggin, setIsLoggin] = useState(false);
  let authToken = localStorage.getItem("auth_token");

  useEffect(() => {
    if (authToken) {
      setIsLoggin(true);
    }
  }, [authToken]);

  const logout = async (e) => {
    e.preventDefault();

    try {
      const response = await productsApi.logout();
      console.log("tried response", response);
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_name");
      swal("Success", response.message, "success");
      navigate("/login");
    } catch (error) {
      console.log("catched error", error);
    }
  };

  // let authButtons = "";

  // if (!localStorage.getItem("auth_token")) {
  //   authButtons = (
  //     <ul className="navbar-nav">
  //       <li className="nav-item">
  //         <Link className="nav-link" to="/login">
  //           Login
  //         </Link>
  //       </li>
  //       <li className="nav-item">
  //         <Link className="nav-link" to="/register">
  //           Register
  //         </Link>
  //       </li>
  //     </ul>
  //   );
  // } else {
  //   authButtons = (
  //     <li className="nav-item">
  //           <button type="button" onClick={logout} className="nav-link btn btn-danger btn-small text-white" >
  //             Logout
  //           </button>
  //         </li>
  //   );
  // }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow sticky-top">
      <div className="container">
        <Link className="navbar-brand" to="#">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/contact"
              >
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/collections"
              >
                Collections
              </Link>
            </li>

            {/* {authButtons} */}

            {!isLoggin ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <button
                  type="button"
                  onClick={logout}
                  className="nav-link btn btn-danger btn-small text-white"
                >
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
