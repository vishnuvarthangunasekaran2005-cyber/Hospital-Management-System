import { useState } from "react";
import { useNavigate } from "react-router-dom";

const initialPatients = [
  { id: "P001", name: "Ravi Kumar", age: 45, gender: "Male", blood: "O+", doctor: "Dr. John Smith", room: "101", phone: "9876543210", address: "12, MG Road, Bangalore", diagnosis: "Hypertension", status: "Admitted", date: "2025-06-01", fees: 1500 },
  { id: "P002", name: "Sneha Patel", age: 32, gender: "Female", blood: "B+", doctor: "Dr. Emily Johnson", room: "205", phone: "9123456789", address: "45, Park Street, Mumbai", diagnosis: "Diabetes Type 2", status: "Admitted", date: "2025-06-03", fees: 2000 },
  { id: "P003", name: "Arjun Singh", age: 60, gender: "Male", blood: "A-", doctor: "Dr. David Wilson", room: "OPD", phone: "9988776655", address: "78, Civil Lines, Delhi", diagnosis: "Migraine", status: "Discharged", date: "2025-05-28", fees: 800 },
  { id: "P004", name: "Meena Rao", age: 27, gender: "Female", blood: "AB+", doctor: "Dr. Sophia Brown", room: "310", phone: "9765432100", address: "22, Jubilee Hills, Hyderabad", diagnosis: "Fracture - Left Arm", status: "Admitted", date: "2025-06-05", fees: 5000 },
];

const doctors = ["Dr. John Smith", "Dr. Emily Johnson", "Dr. David Wilson", "Dr. Sophia Brown"];
const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const emptyForm = { id: "", name: "", age: "", gender: "", blood: "", doctor: "", room: "", phone: "", address: "", diagnosis: "", fees: "", date: "" };

const Patient_Record = () => {
  const navigate = useNavigate();
  const [patients, setPatients] = useState(initialPatients);
  const [activeTab, setActiveTab] = useState("list");
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [viewPatient, setViewPatient] = useState(null);
  const [showAlert, setShowAlert] = useState(null);

  const filtered = patients.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.id.toLowerCase().includes(search.toLowerCase()) ||
    p.doctor.toLowerCase().includes(search.toLowerCase()) ||
    p.diagnosis.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = (e) => {
    e.preventDefault();
    setPatients([...patients, { ...form, age: parseInt(form.age), fees: parseFloat(form.fees), status: "Admitted" }]);
    setForm(emptyForm);
    setShowAlert({ type: "success", msg: `Patient ${form.name} added successfully!` });
    setActiveTab("list");
    setTimeout(() => setShowAlert(null), 3000);
  };

  const handleDischarge = (id) => {
    setPatients(patients.map(p => p.id === id ? { ...p, status: "Discharged" } : p));
  };

  const handleDelete = (id) => {
    setPatients(patients.filter(p => p.id !== id));
  };

  const stats = {
    total: patients.length,
    admitted: patients.filter(p => p.status === "Admitted").length,
    discharged: patients.filter(p => p.status === "Discharged").length,
    revenue: patients.reduce((sum, p) => sum + p.fees, 0),
  };

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <div className="bg-primary text-white py-3 px-4 shadow">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <h3 className="mb-0 fw-bold">🩺 Patient Records</h3>
            <small className="opacity-75">Hospital Patient Management System</small>
          </div>
          <button className="btn btn-outline-light btn-sm" onClick={() => navigate("/dashboard")}>
            🏠 Dashboard
          </button>
        </div>
      </div>

      <div className="container-fluid py-4 px-4">
        {/* Alert */}
        {showAlert && (
          <div className={`alert alert-${showAlert.type} alert-dismissible fade show`} role="alert">
            {showAlert.msg}
            <button type="button" className="btn-close" onClick={() => setShowAlert(null)} />
          </div>
        )}

        {/* Stats Cards */}
        <div className="row g-3 mb-4">
          {[
            { label: "Total Patients", value: stats.total, color: "primary", icon: "👥" },
            { label: "Admitted", value: stats.admitted, color: "success", icon: "🏥" },
            { label: "Discharged", value: stats.discharged, color: "secondary", icon: "🚪" },
            { label: "Total Revenue", value: `₹${stats.revenue.toLocaleString()}`, color: "warning", icon: "💰" },
          ].map(s => (
            <div className="col-md-3 col-6" key={s.label}>
              <div className={`card border-${s.color} shadow-sm text-center`}>
                <div className="card-body py-3">
                  <div className="fs-2">{s.icon}</div>
                  <h3 className={`text-${s.color} fw-bold mb-0`}>{s.value}</h3>
                  <small className="text-muted">{s.label}</small>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <ul className="nav nav-tabs mb-4">
          {[["list", "📋 Patient List"], ["add", "➕ Add Patient"], ["history", "📜 Medical History"]].map(([key, label]) => (
            <li className="nav-item" key={key}>
              <button
                className={`nav-link ${activeTab === key ? "active fw-semibold" : ""}`}
                onClick={() => setActiveTab(key)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Patient List Tab */}
        {activeTab === "list" && (
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white d-flex flex-wrap justify-content-between align-items-center gap-2">
              <h5 className="mb-0">All Patients</h5>
              <input
                className="form-control form-control-sm"
                style={{maxWidth:220}}
                placeholder="🔍 Search patients..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover table-bordered mb-0">
                  <thead className="table-dark text-center">
                    <tr>
                      <th>ID</th><th>Name</th><th>Age</th><th>Blood</th>
                      <th className="d-none d-md-table-cell">Doctor</th>
                      <th className="d-none d-lg-table-cell">Diagnosis</th>
                      <th className="d-none d-lg-table-cell">Room</th>
                      <th className="d-none d-md-table-cell">Fees (₹)</th>
                      <th>Status</th><th>Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-center align-middle">
                    {filtered.length === 0 ? (
                      <tr><td colSpan={10} className="text-muted py-4">No patients found.</td></tr>
                    ) : filtered.map(p => (
                      <tr key={p.id}>
                        <td><code>{p.id}</code></td>
                        <td className="text-start fw-semibold">{p.name}</td>
                        <td>{p.age}</td>
                        <td><span className="badge bg-danger">{p.blood}</span></td>
                        <td className="d-none d-md-table-cell">{p.doctor}</td>
                        <td className="d-none d-lg-table-cell">{p.diagnosis}</td>
                        <td className="d-none d-lg-table-cell">{p.room}</td>
                        <td className="d-none d-md-table-cell">₹{p.fees?.toLocaleString()}</td>
                        <td>
                          <span className={`badge ${p.status === "Admitted" ? "bg-success" : "bg-secondary"}`}>
                            {p.status}
                          </span>
                        </td>
                        <td>
                          <div className="d-flex gap-1 justify-content-center">
                            <button className="btn btn-info btn-sm text-white"
                              onClick={() => { setViewPatient(p); setActiveTab("history"); }}>👁️</button>
                            {p.status === "Admitted" && (
                              <button className="btn btn-warning btn-sm"
                                onClick={() => handleDischarge(p.id)}>🚪</button>
                            )}
                            <button className="btn btn-danger btn-sm"
                              onClick={() => handleDelete(p.id)}>🗑️</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Add Patient Tab */}
        {activeTab === "add" && (
          <div className="row justify-content-center">
            <div className="col-12 col-lg-8">
              <div className="card shadow">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">➕ Register New Patient</h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleAdd}>
                    <div className="row g-3">
                      <div className="col-md-4 col-12">
                        <label className="form-label fw-semibold">Patient ID</label>
                        <input className="form-control" placeholder="e.g. P005" required
                          value={form.id} onChange={e => setForm({ ...form, id: e.target.value })} />
                      </div>
                      <div className="col-md-4 col-12">
                        <label className="form-label fw-semibold">Full Name</label>
                        <input className="form-control" placeholder="Patient full name" required
                          value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                      </div>
                      <div className="col-md-4 col-12">
                        <label className="form-label fw-semibold">Age</label>
                        <input type="number" min="0" max="150" className="form-control" placeholder="Age" required
                          value={form.age} onChange={e => setForm({ ...form, age: e.target.value })} />
                      </div>
                      <div className="col-md-4 col-12">
                        <label className="form-label fw-semibold">Gender</label>
                        <select className="form-select" required value={form.gender}
                          onChange={e => setForm({ ...form, gender: e.target.value })}>
                          <option value="">Select Gender</option>
                          <option>Male</option><option>Female</option><option>Other</option>
                        </select>
                      </div>
                      <div className="col-md-4 col-12">
                        <label className="form-label fw-semibold">Blood Group</label>
                        <select className="form-select" required value={form.blood}
                          onChange={e => setForm({ ...form, blood: e.target.value })}>
                          <option value="">Select Blood Group</option>
                          {bloodGroups.map(b => <option key={b}>{b}</option>)}
                        </select>
                      </div>
                      <div className="col-md-4 col-12">
                        <label className="form-label fw-semibold">Assigned Doctor</label>
                        <select className="form-select" required value={form.doctor}
                          onChange={e => setForm({ ...form, doctor: e.target.value })}>
                          <option value="">Select Doctor</option>
                          {doctors.map(d => <option key={d}>{d}</option>)}
                        </select>
                      </div>
                      <div className="col-md-4 col-12">
                        <label className="form-label fw-semibold">Room / Ward</label>
                        <input className="form-control" placeholder="e.g. 101 / OPD" required
                          value={form.room} onChange={e => setForm({ ...form, room: e.target.value })} />
                      </div>
                      <div className="col-md-4 col-12">
                        <label className="form-label fw-semibold">Phone Number</label>
                        <input type="tel" className="form-control" placeholder="10-digit mobile" required
                          value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
                      </div>
                      <div className="col-md-4 col-12">
                        <label className="form-label fw-semibold">Admission Date</label>
                        <input type="date" className="form-control" required
                          value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
                      </div>
                      <div className="col-md-6 col-12">
                        <label className="form-label fw-semibold">Diagnosis</label>
                        <input className="form-control" placeholder="Primary diagnosis" required
                          value={form.diagnosis} onChange={e => setForm({ ...form, diagnosis: e.target.value })} />
                      </div>
                      <div className="col-md-6 col-12">
                        <label className="form-label fw-semibold">Consultation Fees (₹)</label>
                        <input type="number" min="0" className="form-control" placeholder="Amount in INR" required
                          value={form.fees} onChange={e => setForm({ ...form, fees: e.target.value })} />
                      </div>
                      <div className="col-12">
                        <label className="form-label fw-semibold">Address</label>
                        <textarea className="form-control" rows={2} placeholder="Patient's home address" required
                          value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-primary w-100 fw-semibold">
                          ✅ Register Patient
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Medical History Tab */}
        {activeTab === "history" && (
          <div>
            {viewPatient ? (
              <div className="row justify-content-center">
                <div className="col-lg-8">
                  <div className="card shadow">
                    <div className="card-header bg-primary text-white d-flex justify-content-between">
                      <h5 className="mb-0">📜 Patient Profile — {viewPatient.name}</h5>
                      <button className="btn btn-outline-light btn-sm" onClick={() => setViewPatient(null)}>✕ Close</button>
                    </div>
                    <div className="card-body">
                      <div className="row g-3">
                        {[
                          ["Patient ID", viewPatient.id],
                          ["Full Name", viewPatient.name],
                          ["Age", viewPatient.age],
                          ["Gender", viewPatient.gender],
                          ["Blood Group", viewPatient.blood],
                          ["Phone", viewPatient.phone],
                          ["Assigned Doctor", viewPatient.doctor],
                          ["Room / Ward", viewPatient.room],
                          ["Diagnosis", viewPatient.diagnosis],
                          ["Admission Date", viewPatient.date],
                          ["Consultation Fees", `₹${viewPatient.fees?.toLocaleString()}`],
                          ["Status", viewPatient.status],
                        ].map(([label, value]) => (
                          <div className="col-md-6" key={label}>
                            <div className="p-3 bg-light rounded border">
                              <small className="text-muted d-block">{label}</small>
                              <strong>{value}</strong>
                            </div>
                          </div>
                        ))}
                        <div className="col-12">
                          <div className="p-3 bg-light rounded border">
                            <small className="text-muted d-block">Address</small>
                            <strong>{viewPatient.address}</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="card-footer d-flex gap-2">
                      {viewPatient.status === "Admitted" && (
                        <button className="btn btn-warning" onClick={() => { handleDischarge(viewPatient.id); setViewPatient({ ...viewPatient, status: "Discharged" }); }}>
                          🚪 Mark as Discharged
                        </button>
                      )}
                      <button className="btn btn-outline-primary" onClick={() => window.print()}>🖨️ Print Record</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="card shadow-sm">
                <div className="card-header bg-primary text-white">
                  <h5 className="mb-0">📜 Medical History — All Patients</h5>
                </div>
                <div className="card-body p-0">
                  <div className="table-responsive">
                    <table className="table table-hover table-bordered mb-0">
                      <thead className="table-dark text-center">
                        <tr><th>ID</th><th>Name</th><th>Diagnosis</th><th>Doctor</th><th>Date</th><th>Status</th><th>Action</th></tr>
                      </thead>
                      <tbody className="text-center align-middle">
                        {patients.map(p => (
                          <tr key={p.id}>
                            <td><code>{p.id}</code></td>
                            <td className="text-start fw-semibold">{p.name}</td>
                            <td>{p.diagnosis}</td>
                            <td>{p.doctor}</td>
                            <td>{p.date}</td>
                            <td>
                              <span className={`badge ${p.status === "Admitted" ? "bg-success" : "bg-secondary"}`}>
                                {p.status}
                              </span>
                            </td>
                            <td>
                              <button className="btn btn-info btn-sm text-white" onClick={() => setViewPatient(p)}>
                                👁️ View
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Patient_Record;
