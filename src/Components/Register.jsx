import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";
import "../Styles/Login.css";

const Register = () => {
  const navigate  = useNavigate();
  const user      = JSON.parse(localStorage.getItem("user") || "{}");
  const [form, setForm]         = useState({ name: "", email: "", password: "", role: "staff" });
  const [error, setError]       = useState("");
  const [success, setSuccess]   = useState("");
  const [loading, setLoading]   = useState(false);
  const [showPass, setShowPass] = useState(false);

  if (user.role !== "admin") {
    return (
      <div className="login-page">
        <div className="loginbox text-center">
          <h4 className="text-danger">🚫 Access Denied</h4>
          <p className="text-muted">Only admins can register new users.</p>
          <Link to="/login" className="btn btn-primary w-100">Go to Login</Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); setSuccess("");
    setLoading(true);
    const res = await api.register(form);
    setLoading(false);
    if (res.user) {
      setSuccess(`✅ ${res.user.name} (${res.user.role}) registered successfully!`);
      setForm({ name: "", email: "", password: "", role: "staff" });
    } else {
      setError(res.message || "Registration failed.");
    }
  };

  return (
    <div className="login-page">
      <div className="loginbox" style={{ height: "auto" }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold">➕ Register User</h2>
          <p className="text-muted small mb-0">Create a new staff or admin account</p>
        </div>

        {error   && <div className="alert alert-danger  py-2 small mb-3">{error}</div>}
        {success && <div className="alert alert-success py-2 small mb-3">{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Full Name</label>
            <input type="text" className="form-control" placeholder="Enter full name"
              value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Email Address</label>
            <input type="email" className="form-control" placeholder="Enter email"
              value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group">
              <input
                type={showPass ? "text" : "password"}
                className="form-control" placeholder="Min 6 characters"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required minLength={6}
              />
              <button type="button" className="btn btn-outline-secondary"
                onClick={() => setShowPass(!showPass)}>
                {showPass ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">Role</label>
            <select className="form-select" value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}>
              <option value="staff">Staff</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <button type="submit" className="btn btn-success w-100 fw-semibold" disabled={loading}>
            {loading
              ? <><span className="spinner-border spinner-border-sm me-2" />Registering...</>
              : "✅ Register User"}
          </button>
        </form>

        <hr />
        <div className="d-flex justify-content-between small">
          <Link to="/dashboard" className="text-success">← Dashboard</Link>
          <Link to="/admin" className="text-primary">Manage Users →</Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
