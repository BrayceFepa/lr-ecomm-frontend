import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import productsApi from "../../../Api/productApi";
import NavBar from "../../../layouts/frontend/NavBar";

const Register = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("auth_name")) {
      navigate("/");
    }
  }, [])
  

  const [registerIput, setRegisterInput] = useState({
    name: '',
    email: '',
    password: '',
    error_list: []
  });

  const handleInput = e => {
    e.persist();
    setRegisterInput({...registerIput, [e.target.name]: e.target.value})
  }

  const registerSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: registerIput.name,
      email: registerIput.email,
      password: registerIput.password
    }

    try {
      const response = await productsApi.register(data);
      console.log("api success", response);
      swal("Sucess!", response.message, "success");
      navigate("/login");

    } catch (error) {
      console.log("error api", error.response.data.vaildator_errors);
      setRegisterInput({...registerIput, error_list: error.response.data.vaildator_errors})
    }


  }

  return (
    <div>
      <NavBar />
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>Register</h4>
              </div>

              <div className="card-body">
                <form onSubmit={registerSubmit}>

                  <div className="form-group mb-3">
                    <label>Full Name</label>
                    <input type='' name="name" onChange={handleInput} value={registerIput.name} className="form-control" />
                    <span>{registerIput.error_list.name}</span>
                  </div>

                  <div className="form-group mb-3">
                    <label>Email ID</label>
                    <input type='' name="email" onChange={handleInput} value={registerIput.email} className="form-control" />
                    <span>{registerIput.error_list.email}</span>
                  </div>
                  
                  <div className="form-group mb-3">
                    <label>Password</label>
                    <input type='' name="password" onChange={handleInput} value={registerIput.password} className="form-control" />
                    <span>{registerIput.error_list.password}</span>
                  </div>

                  <div className="form-group mb-3">
                    <button type="submit" className="btn btn-primary">Register</button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
