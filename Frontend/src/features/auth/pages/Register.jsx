import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import Loading from "../../interview/Components/Loading";

const Register = () => {
  const { loading, handleRegister } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
  });

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

    const success = await handleRegister(form);

    if (success) {
      navigate("/");
    } else {
      setError("Registration failed. Try again.");
    }
  };

  if (loading) return <Loading />;

  return (
    <main className="auth-page">
      <div className="form-container">
        <h1>Create Account 🚀</h1>

        {error && <p className="error">{error}</p>}

        <form onSubmit={onHandleSubmit}>
          <div className="input-group">
            <label>Username</label>
            <input
              name="userName"
              value={form.userName}
              onChange={onHandleChange}
              type="text"
              placeholder="Enter username"
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              name="email"
              value={form.email}
              onChange={onHandleChange}
              type="email"
              placeholder="Enter email"
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              name="password"
              value={form.password}
              onChange={onHandleChange}
              type="password"
              placeholder="Enter password"
              required
            />
          </div>

          <button disabled={loading} className="button primary-button">
            {loading ? "Creating..." : "Register"}
          </button>
        </form>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </main>
  );
};

export default Register;