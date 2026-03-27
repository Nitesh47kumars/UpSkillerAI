import React from "react";
import "../auth.form.scss";
import { Link } from "react-router";
const Login = () => {

    const onHandleSubmit = (e) =>{
        e.preventDefault()
    }
  return (
    <main>
      <div className="form-container">
        <h1>Login</h1>
        <form>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Email Address"
            />
          </div>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
            />
          </div>

          <button onClick={onHandleSubmit} className="button primary-button">Login</button>
        </form>
        <p>Don't have any Account, Create new one <Link to={"/register"}>Register</Link></p>
      </div>
    </main>
  );
};

export default Login;
