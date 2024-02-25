import React, { useContext, useRef, useState } from "react";
import "./login.css";
import { Context } from "../../context/Context";
import axios from "axios";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

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
      console.log(res.status);
      if (res.status === 200) {
        toast("Logged in Successfully");
      }
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (err) {
      toast.error(err.response.data);
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
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <div className="background">
        <span className="loginTitle">Login</span>
        <form className="loginForm" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            className="loginInput"
            placeholder="Enter your Username..."
            ref={userRef}
            required
          />
          <label>Password</label>
          <div className="passwordInputContainer">
            <input
              type={showPassword ? "text" : "password"}
              className="loginInput password"
              placeholder="Enter your Password..."
              ref={passwordRef}
              required
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
        <h5 className="text-center text-black pt-3">
          New Here?{" "}
          <Link className="font-bold text-red-400 link" to="/register">
            Register
          </Link>
        </h5>
      </div>
    </div>
  );
};

export default Login;
