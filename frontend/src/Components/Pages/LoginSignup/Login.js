import React, { useState } from "react";
import SideBanner from "./SideBanner";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import "./LoginSignup.css";
import { login } from "../../../actions/userAction";

const Login = (props) => {

  const [credentials, setcredentials] = useState({ email: "", password: "" });
  const [passwordVisisble, setPasswordVisisble] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const togglePasswordVisible = () => {
    let allInputs = document.querySelectorAll('.login-signup_container .login-signup_box form .form-fields input');
    let inputPass = allInputs[allInputs.length-1];
    if(!passwordVisisble){
      setPasswordVisisble(true);
      inputPass.type = "text";
    }
    else{
      setPasswordVisisble(false);
      inputPass.type = "password";
    }
  }

  const handleInput = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(credentials.email, credentials.password, props.showAlert, navigate));
  }

  return (
    <div style={{ display: "flex", background: "#E8EAEF" }}>
      <SideBanner />
      <div className="login-signup_container">
        <div className="login-signup_box">
          <h2>Login</h2>
          <p>Fill in the fields below to Login</p>
          <form onSubmit={handleSubmit}>
            <div className="form-fields">
              <input
                type="email"
                name="email"
                value={credentials.email}
                onChange={handleInput}
                placeholder="Enter Email"
                required
              />
            </div>
            <div className="form-fields">
              <input
                type="password"
                name="password"
                value={credentials.password}
                onChange={handleInput}
                placeholder="Enter Password"
                required
              />
              <i className={`fa-regular fa-eye${!passwordVisisble ? '-slash' : ''}`} onClick={togglePasswordVisible}></i>
            </div>
            <button type="submit">Login</button>
            <Link to={"/signup"}>Don't have an account? SignUp</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
