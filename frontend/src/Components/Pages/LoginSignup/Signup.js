import React, { useState } from "react";
import SideBanner from "./SideBanner";
import { Link, useNavigate } from "react-router-dom";
import "./LoginSignup.css";
import { useDispatch } from "react-redux";
import { register } from "../../../actions/userAction";

const Signup = (props) => {

  const [credentials, setcredentials] = useState({ name: '', email: "", password: "" });
  const [passwordVisisble, setPasswordVisisble] = useState(false);
  const disptach = useDispatch();
  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    disptach(register(credentials.name, credentials.email, credentials.password, props.showAlert, navigate));
  }

  const handleInput = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ display: "flex", background: "#E8EAEF" }}>
      <SideBanner />
      <div className="login-signup_container">
        <div className="login-signup_box">
          <h2>Sign Up</h2>
          <p>Fill in the fields to create a new account</p>
          <form onSubmit={handleSubmit}>
            <div className="form-fields">
              <input
                type="text"
                name="name"
                value={credentials.name}
                onChange={handleInput}
                placeholder="Enter Name"
                required
              />
            </div>
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
                minLength={8}
                required
              />
              <i className={`fa-regular fa-eye${!passwordVisisble ? '-slash' : ''}`} onClick={togglePasswordVisible}></i>
            </div>
            <button type="submit">Sign up</button>
            <Link to={"/"}>Already have an account? Log in</Link>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup