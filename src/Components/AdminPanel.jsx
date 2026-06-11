import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

const AdminPanel = () => {
  const navigate = useNavigate();
  const user     = JSON.parse(localStorage.getItem("user") || "{}");
  const [users,   setUsers]   = useState([]);
  const [stats,   setStats]   = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert,   setAlert]   = useState(null);

  const flash = (type, msg) => {
    setAlert({ type, msg });
    setTimeout(() => setAlert(null), 3000);
  };

  useEffect(() => {
    if (user.role !== "admin") { navigate("/login"); return; }
    load();
  }, []);

  const load = async () => {
    setLoading(true);
    const [u, s] = await Promise.all([api.getUsers(), api.getAdminStats()]);
    if (Array.isArray(u)) setUsers(u);
    if (s && !s.message) setStats(s);
    setLoading(false);
  };

  const handleRole = async (id, role) => {
    const res = await api.updateUserRole(id, role);
    if (res._id) {
      setUsers(users.map((u) => (u._id === id ? res : u)));
      flash("success", "Role updated");
    } else flash("danger", res.message);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this user permanently?")) return;
    const res = await api.deleteUser(id);
    if (res.message === "User deleted") {
      setUsers(users.filter((u) => u._id !== id));
      flash("success", "User deleted");
    } else flash("danger", res.message);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (user.role !== "admin") return null;

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <div className="bg-dark text-white py-3 px-4 shadow">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <h4 className="mb-0 fw-bold">🛡️ Admin Panel</h4>
            <small className="opacity-75">Logged in as {user.name}</small>
          </div>
          <div className="d-flex gap-2 flex-wrap">
            <button className="btn btn-outline-light btn-sm" onClick={() => navigate("/dashboard")}>🏠 Dashboard</button>
            <Link to="/doctors" className="btn btn-outline-light btn-sm">👨⚕️ Doctors</Link>
            <Link to="/register" className="btn btn-success btn-sm">➕ Add User</Link>
            <button className="btn btn-danger btn-sm" onClick={handleLogout}>🚪 Logout</button>
          </div>
        </div>
      </div>

      <div className="container-fluid px-4 py-4">
        {alert && (
          <div className={`alert alert-${alert.type} alert-dismissible py-2`}>
            {alert.msg}
            <button className="btn-close" onClick={() => setAlert(null)} />
          </div>
        )}

        {/* Stats */}
        {stats && (
          <div className="row g-3 mb-4">
            {[
              { label: "Total Patients",   value: stats.totalPatients,        color: "primary" },
              { label: "Admitted",         value: stats.admitted,             color: "success" },
              { label: "Discharged",       value: stats.discharged,           color: "secondary" },
              { label: "Revenue (₹)",      value: `₹${(stats.revenue||0).toLocaleString()}`, color: "warning" },
              { label: "Medicines",        value: stats.totalMedicines,       color: "info" },
              { label: "Low Stock",        value: stats.lowStock,             color: "warning" },
              { label: "Out of Stock",     value: stats.outOfStock,           color: "danger" },
              { label: "Appointments",     value: stats.totalAppointments,    color: "primary" },
              { label: "Total Doctors",    value: stats.totalDoctors || 0,    color: "success" },
              { label: "Active Doctors",   value: stats.activeDoctors || 0,   color: "info" },
              { label: "Pending Blood",    value: stats.pendingBloodRequests, color: "danger" },
              { label: "System Users",     value: stats.totalUsers,           color: "dark" },
            ].map((s) => (
              <div className="col-lg-2 col-md-3 col-6" key={s.label}>
                <div className={`card border-${s.color} shadow-sm text-center`}>
                  <div className="card-body py-2">
                    <h5 className={`text-${s.color} fw-bold mb-0`}>{s.value}</h5>
                    <small className="text-muted">{s.label}</small>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Users Table */}
        <div className="card shadow">
          <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">👥 System Users</h5>
            <button className="btn btn-outline-light btn-sm" onClick={load}>🔄 Refresh</button>
          </div>
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-dark" />
                <p className="mt-2 text-muted">Loading users...</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover table-bordered mb-0">
                  <thead className="table-dark text-center">
                    <tr>
                      <th>Name</th><th>Email</th><th>Role</th><th>Created</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="align-middle text-center">
                    {users.length === 0 ? (
                      <tr><td colSpan={5} className="text-muted py-4">No users found.</td></tr>
                    ) : users.map((u) => (
                      <tr key={u._id}>
                        <td className="text-start fw-semibold">{u.name}</td>
                        <td>{u.email}</td>
                        <td>
                          <select
                            className="form-select form-select-sm w-auto mx-auto"
                            value={u.role}
                            disabled={u._id === user.id}
                            onChange={(e) => handleRole(u._id, e.target.value)}
                          >
                            <option value="staff">Staff</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td>{new Date(u.createdAt).toLocaleDateString()}</td>
                        <td>
                          <button
                            className="btn btn-danger btn-sm"
                            disabled={u._id === user.id}
                            onClick={() => handleDelete(u._id)}
                          >
                            🗑️ Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
