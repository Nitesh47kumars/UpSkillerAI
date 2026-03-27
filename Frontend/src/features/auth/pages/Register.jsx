import React from "react";
import { Link} from "react-router";

const Register = () => {

  const onHandleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <main>
      <div className="form-container">
        <h1>Register</h1>
        <form>
          <div className="input-group">
            <label htmlFor="UserName">UserName</label>
            <input
              type="UserName"
              id="UserName"
              name="UserName"
              placeholder="Enter UserName"
            />
          </div>
          <div className="input-group">
            <label htmlFor="Email">Email</label>
            <input
              type="Email"
              id="Email"
              name="Email"
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

          <button onClick={onHandleSubmit} className="button primary-button">
            Register
          </button>
        </form>

        <p>Already have an Account? <Link to={"/login"}>Login</Link></p>
      </div>
    </main>
  );
};

export default Register;
