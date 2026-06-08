import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import "../Styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm]       = useState({ email: "", password: "" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await api.login(form);
    setLoading(false);
    if (res.token) {
      localStorage.setItem("token", res.token);
      localStorage.setItem("user", JSON.stringify(res.user));
      navigate("/dashboard");
    } else {
      setError(res.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="login-page">
      <div className="loginbox">
        <div className="text-center mb-4">
          <h2 className="fw-bold">⚕️ HMS Login</h2>
          <p className="text-muted small mb-0">Hospital Management System</p>
        </div>

        {error && (
          <div className="alert alert-danger py-2 small mb-3">{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="admin@hospital.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group">
              <input
                type={showPass ? "text" : "password"}
                className="form-control"
                placeholder="Enter your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPass(!showPass)}
              >
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 fw-semibold"
            disabled={loading}
          >
            {loading ? (
              <><span className="spinner-border spinner-border-sm me-2" />Logging in...</>
            ) : "🔐 Login"}
          </button>
        </form>

        <hr />
        <p className="text-center text-muted small mb-0">
          Default admin: <strong>admin@hospital.com</strong> / <strong>admin@123</strong>
        </p>
      </div>
    </div>
  );
};

export default Login;
