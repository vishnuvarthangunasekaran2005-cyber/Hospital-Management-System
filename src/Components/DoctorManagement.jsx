import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

const DoctorManagement = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    specialization: "",
    qualification: "",
    experience: "",
    phone: "",
    email: "",
    schedule: "",
    consultationFee: "",
    status: "active",
  });

  const flash = (type, msg) => {
    setAlert({ type, msg });
    setTimeout(() => setAlert(null), 3000);
  };

  useEffect(() => {
    if (user.role !== "admin") {
      navigate("/login");
      return;
    }
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
    setLoading(true);
    try {
      const res = await api.getDoctors();
      if (Array.isArray(res)) {
        setDoctors(res);
      } else if (res.message) {
        flash("danger", res.message);
      }
    } catch (err) {
      flash("danger", "Failed to load doctors. Please try again.");
      console.error(err);
    }
    setLoading(false);
  };

  const resetForm = () => {
    setForm({
      name: "",
      specialization: "",
      qualification: "",
      experience: "",
      phone: "",
      email: "",
      schedule: "",
      consultationFee: "",
      status: "active",
    });
    setEditId(null);
    setShowForm(false);
  };

  const handleEdit = (doctor) => {
    setForm({
      name: doctor.name,
      specialization: doctor.specialization,
      qualification: doctor.qualification,
      experience: doctor.experience,
      phone: doctor.phone,
      email: doctor.email,
      schedule: doctor.schedule || "",
      consultationFee: doctor.consultationFee,
      status: doctor.status,
    });
    setEditId(doctor._id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!form.name || !form.specialization || !form.qualification || !form.experience || !form.phone || !form.email || !form.consultationFee) {
      flash("danger", "Please fill all required fields");
      return;
    }

    try {
      const res = editId
        ? await api.updateDoctor(editId, form)
        : await api.addDoctor(form);

      if (res._id) {
        flash("success", `Doctor ${editId ? "updated" : "added"} successfully`);
        loadDoctors();
        resetForm();
      } else {
        flash("danger", res.message || "Operation failed");
      }
    } catch (err) {
      flash("danger", "An error occurred. Please try again.");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this doctor permanently?")) return;
    
    try {
      const res = await api.deleteDoctor(id);
      if (res.message === "Doctor deleted successfully") {
        setDoctors(doctors.filter((d) => d._id !== id));
        flash("success", "Doctor deleted successfully");
      } else {
        flash("danger", res.message || "Failed to delete doctor");
      }
    } catch (err) {
      flash("danger", "An error occurred while deleting. Please try again.");
      console.error(err);
    }
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
            <h4 className="mb-0 fw-bold">👨‍⚕️ Doctor Management</h4>
            <small className="opacity-75">Logged in as {user.name}</small>
          </div>
          <div className="d-flex gap-2 flex-wrap">
            <button
              className="btn btn-outline-light btn-sm"
              onClick={() => navigate("/dashboard")}
            >
              🏠 Dashboard
            </button>
            <Link to="/admin" className="btn btn-outline-light btn-sm">
              👥 Users
            </Link>
            <button className="btn btn-danger btn-sm" onClick={handleLogout}>
              🚪 Logout
            </button>
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

        {/* Add/Edit Form */}
        {showForm && (
          <div className="card shadow mb-4">
            <div className="card-header bg-success text-white d-flex justify-content-between align-items-center">
              <h5 className="mb-0">
                {editId ? "✏️ Edit Doctor" : "➕ Add New Doctor"}
              </h5>
              <button
                className="btn btn-sm btn-outline-light"
                onClick={resetForm}
              >
                ✖ Cancel
              </button>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Doctor Name *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Specialization *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={form.specialization}
                      onChange={(e) =>
                        setForm({ ...form, specialization: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Qualification *
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      value={form.qualification}
                      onChange={(e) =>
                        setForm({ ...form, qualification: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Experience (years) *
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      value={form.experience}
                      onChange={(e) =>
                        setForm({ ...form, experience: e.target.value })
                      }
                      required
                      min="0"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Phone *</label>
                    <input
                      type="tel"
                      className="form-control"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Email *</label>
                    <input
                      type="email"
                      className="form-control"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Schedule</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Mon-Fri 9AM-5PM"
                      value={form.schedule}
                      onChange={(e) =>
                        setForm({ ...form, schedule: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">
                      Consultation Fee (₹) *
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      value={form.consultationFee}
                      onChange={(e) =>
                        setForm({ ...form, consultationFee: e.target.value })
                      }
                      required
                      min="0"
                    />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label fw-semibold">Status *</label>
                    <select
                      className="form-select"
                      value={form.status}
                      onChange={(e) =>
                        setForm({ ...form, status: e.target.value })
                      }
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <button type="submit" className="btn btn-success">
                    {editId ? "💾 Update Doctor" : "➕ Add Doctor"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary ms-2"
                    onClick={resetForm}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Doctors List */}
        <div className="card shadow">
          <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
            <h5 className="mb-0">👨‍⚕️ Doctors List</h5>
            <div className="d-flex gap-2">
              <button className="btn btn-outline-light btn-sm" onClick={loadDoctors}>
                🔄 Refresh
              </button>
              {!showForm && (
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => setShowForm(true)}
                >
                  ➕ Add Doctor
                </button>
              )}
            </div>
          </div>
          <div className="card-body p-0">
            {loading ? (
              <div className="text-center py-5">
                <div className="spinner-border text-dark" />
                <p className="mt-2 text-muted">Loading doctors...</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover table-bordered mb-0">
                  <thead className="table-dark text-center">
                    <tr>
                      <th>Name</th>
                      <th>Specialization</th>
                      <th>Qualification</th>
                      <th>Experience</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Fee (₹)</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="align-middle text-center">
                    {doctors.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="text-muted py-4">
                          No doctors found. Add your first doctor!
                        </td>
                      </tr>
                    ) : (
                      doctors.map((d) => (
                        <tr key={d._id}>
                          <td className="text-start fw-semibold">{d.name}</td>
                          <td>{d.specialization}</td>
                          <td>{d.qualification}</td>
                          <td>{d.experience} yrs</td>
                          <td>{d.phone}</td>
                          <td>{d.email}</td>
                          <td>₹{d.consultationFee}</td>
                          <td>
                            <span
                              className={`badge bg-${d.status === "active" ? "success" : "secondary"}`}
                            >
                              {d.status}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-primary btn-sm me-1"
                              onClick={() => handleEdit(d)}
                            >
                              ✏️
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(d._id)}
                            >
                              🗑️
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
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

export default DoctorManagement;
