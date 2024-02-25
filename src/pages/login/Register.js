import React, { useState } from "react";
import "./login.css";
import axios from "axios";
import { Helmet } from "react-helmet";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/auth/register`,
        {
          username,
          email,
          password,
        }
      );
      res.data && window.location.replace("/login");
      toast("Registered Successfully");
    } catch (err) {
      toast.error("Email id already registered");
    }
  };
  return (
    <div className="register login">
      <Helmet>
        <title>Register</title>
        <meta name="description" content="" />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Helmet>
      <div className="background">
        <span className="loginTitle">Register</span>
        <form className="loginForm" onSubmit={handleSubmit}>
          <label>Username</label>
          <input
            type="text"
            className="loginInput"
            placeholder="Enter your username..."
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />
          <label>Email</label>
          <input
            type="email"
            className="loginInput"
            placeholder="Enter your Email..."
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          />
          <label>Password</label>
          <input
            type="password"
            className="loginInput"
            placeholder="Enter your Password..."
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          />
          <button className="loginButton" type="submit">
            Register
          </button>
        </form>
        <h5 className="text-center text-black pt-3">
          Already have an account?{" "}
          <Link className="font-bold text-red-400 link" to="/login">
            Login
          </Link>
        </h5>
      </div>
    </div>
  );
};

export default Register;
