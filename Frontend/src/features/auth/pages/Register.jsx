import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const { loading, handleRegister } = useAuth();

  const navigate = useNavigate();

  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const onHandleChange = () => {
    return setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister(form);
    navigate("/");
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form onSubmit={onHandleSubmit}>
          <div className="input-group">
            <label htmlFor="userName">UserName</label>
            <input
              value={form.userName}
              onChange={onHandleChange}
              type="userName"
              id="userName"
              name="userName"
              placeholder="Enter UserName"
            />
          </div>
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

          <button type="submit" className="button primary-button">
            Register
          </button>
        </form>

        <p>
          Already have an Account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;
