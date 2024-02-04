import React, { useContext, useRef, useState } from "react";
import "./login.css";
import { Context } from "../../context/Context";
import axios from "axios";
import { Helmet } from "react-helmet";

const Login = () => {
  const userRef = useRef();
  const passwordRef = useRef();
  const { dispatch, isFetching } = useContext(Context);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/auth/login`, {
        username: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login">
      <Helmet>
        <title>Login</title>
        <meta name="description" content="" />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          className="loginInput"
          placeholder="Enter your Username..."
          ref={userRef}
        />
        <label>Password</label>
        <div className="passwordInputContainer">
          <input
            type={showPassword ? "text" : "password"}
            className="loginInput"
            placeholder="Enter your Password..."
            ref={passwordRef}
          />
          <button
            type="button"
            className="showPasswordButton"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <img className="svg" src="/svg/eye.svg" alt="" />
            ) : (
              <img className="svg" src="/svg/eye-slash.svg" alt="" />
            )}
          </button>
        </div>
        <button className="loginButton" type="submit" disabled={isFetching}>
          LOGIN
        </button>
      </form>
    </div>
  );
};

export default Login;
