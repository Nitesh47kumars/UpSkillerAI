import React, { useState } from "react";
import "../auth.form.scss";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const onHandleChange = (e) => {
    return setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    await handleLogin(form);
    navigate("/")
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form onSubmit={onHandleSubmit}>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              value={form.email}
              onChange={onHandleChange}
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email Address"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              value={form.password}
              onChange={onHandleChange}
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
            />
          </div>

          <button className="button primary-button">Login</button>
        </form>
        <p>
          Don't have any Account, Create new one{" "}
          <Link to={"/register"}>Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;
