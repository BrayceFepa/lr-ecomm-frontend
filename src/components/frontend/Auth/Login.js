import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';
import productsApi from '../../../Api/productApi';
import NavBar from '../../../layouts/frontend/NavBar';

const Login = () => {

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("auth_token")) {
      navigate("/");
    }
  },[]);

  const [loginInput, setLoginInput] = useState({
    email: '',
    password: '',
    error_list: []
  });

  const handleInput = e => {
    e.persist()
    setLoginInput({...loginInput, [e.target.name]: e.target.value});
  }

  const loginSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: loginInput.email,
      password: loginInput.password
    }
    try {
      const response = await productsApi.login(data);
      console.log("tried response", response);
      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("auth_name", response.user.name);
      swal("Success !", response.message, "success");

      if (response.user.role_as === 1) {
        navigate("/admin/dashboard");
      } else {
        navigate('/');        
      }

    } catch (error) {
      setLoginInput({...loginInput, error_list: error.response.data.message});
      console.log("catched error", error.response.data.message);
    }
  }

  return (
    <div>
      <NavBar/>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <h4>Login</h4>
              </div>
                <span className='text-center'>{!(loginInput.error_list.email && loginInput.error_list.password) && loginInput.error_list}</span>
              <div className="card-body">
                <form onSubmit={loginSubmit}>

                  <div className="form-group mb-3">
                    <label>Email ID</label>
                    <input type='email' name="email" onChange={handleInput} value={loginInput.email} className="form-control" />
                    <span>{loginInput.error_list.email}</span>
                  </div>
                  
                  <div className="form-group mb-3">
                    <label>Password</label>
                    <input type='password' name="password" onChange={handleInput} value={loginInput.password} className="form-control" />
                    <span>{loginInput.error_list.password}</span>
                  </div>

                  <div className="form-group mb-3">
                    <button type="submit" className="btn btn-primary">Login</button>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;