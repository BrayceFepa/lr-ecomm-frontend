import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import swal from "sweetalert";
import axiosClient from "./Api/axiosClient";
import productsApi from "./Api/productApi";

const AdminPrivateRoute = ({ children }) => {
  const navigate = useNavigate();

  const [Authenticated, setAuthenticated] = useState(false);
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        const response = await productsApi.checkAuth();
        console.log("CheckedAuth res", response.status);
        if (response.status === 200) {
          setAuthenticated(true);
        }
        setLoading(false);
      } catch (error) {
        console.log("CheckedAuth err", error);
      }
    };
    checkUserAuth();

    return () => {
      setAuthenticated(false);
    };
  }, []);

  axiosClient.interceptors.response.use(
    undefined,
    function axiosRetryInterceptor(err) {
      if (err.response.status === 401) {
        swal("Unauthorized", err.response.data.message, "warning");
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_name");
        navigate("/");
      }
      return Promise.reject(err);
    }
  );

  axiosClient.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error.response.status === 403) {
        swal("Forbidden", error.response.data.message, "warning");
        navigate("/403");
      } else if (error.response.status === 404) {
        swal("404 Error", "URL or page not found", "warning");
        navigate("/404");
      }
      return Promise.reject(error);
    }
  );

  if (Loading) {
    return <h1>Loading...</h1>;
  }

  if (!Authenticated) {
    return <Navigate to="/login" />;
  }

  return children ? children : <Outlet />;
};

export default AdminPrivateRoute;
