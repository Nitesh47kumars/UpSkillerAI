import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Loading from "../../interview/Components/Loading";
import "../auth.form.scss";

const Login = () => {
  const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  }); 

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const onHandleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try{
      await handleLogin(form);
      navigate("/");
    }catch(e){
      setError(e.message || "Invalid email or password");
    }
  };

  if (loading) return <Loading />;

  return (
    <main className="auth-page">
      <div className="form-container">
        <h1>Welcome Back 👋</h1>
        <p className="subtitle">Login to continue</p>

        {error && <p className="error">{error}</p>}

        <form onSubmit={onHandleSubmit}>
          <div className="input-group">
            <label>Email</label>
            <input
              name="email"
              value={form.email}
              onChange={onHandleChange}
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <div className="password-field">
              <input
                name="password"
                value={form.password}
                onChange={onHandleChange}
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                required
              />
              <span onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "Hide" : "Show"}
              </span>
            </div>
          </div>

          <button disabled={loading} className="button primary-button">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </main>
  );
};

export default Login;