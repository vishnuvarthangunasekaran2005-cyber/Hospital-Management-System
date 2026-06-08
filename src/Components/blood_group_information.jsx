import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Styles/blood_group.css";

const bloodGroupList = [
  { group: "A+",  canDonateTo: "A+, AB+",        canReceiveFrom: "A+, A-, O+, O-",   percentage: "35.7%", color: "danger"  },
  { group: "A-",  canDonateTo: "A+, A-, AB+, AB-", canReceiveFrom: "A-, O-",           percentage: "6.3%",  color: "danger"  },
  { group: "B+",  canDonateTo: "B+, AB+",         canReceiveFrom: "B+, B-, O+, O-",   percentage: "8.5%",  color: "warning" },
  { group: "B-",  canDonateTo: "B+, B-, AB+, AB-", canReceiveFrom: "B-, O-",           percentage: "1.5%",  color: "warning" },
  { group: "AB+", canDonateTo: "AB+",              canReceiveFrom: "All Blood Groups",  percentage: "3.4%",  color: "success" },
  { group: "AB-", canDonateTo: "AB+, AB-",         canReceiveFrom: "A-, B-, AB-, O-",  percentage: "0.6%",  color: "success" },
  { group: "O+",  canDonateTo: "A+, B+, O+, AB+", canReceiveFrom: "O+, O-",            percentage: "37.4%", color: "primary" },
  { group: "O-",  canDonateTo: "All Blood Groups", canReceiveFrom: "O-",               percentage: "6.6%",  color: "primary" },
];

const initialStock = [
  { group: "A+",  units: 45, date: "2025-06-01" },
  { group: "A-",  units: 12, date: "2025-06-01" },
  { group: "B+",  units: 30, date: "2025-06-02" },
  { group: "B-",  units: 5,  date: "2025-05-30" },
  { group: "AB+", units: 18, date: "2025-06-02" },
  { group: "AB-", units: 3,  date: "2025-05-29" },
  { group: "O+",  units: 60, date: "2025-06-02" },
  { group: "O-",  units: 8,  date: "2025-06-01" },
];

const getStatus = (units) => {
  if (units >= 30) return { label: "High",     badge: "success" };
  if (units >= 15) return { label: "Medium",   badge: "warning" };
  if (units >= 5)  return { label: "Low",      badge: "danger"  };
  return              { label: "Critical", badge: "danger"  };
};

const emptyDonor   = { group: "", donorName: "", units: "", donorAge: "", contact: "", date: "" };
const emptyRequest = { patientName: "", group: "", units: "", doctor: "", ward: "", priority: "" };

const Blood_group = () => {
  const navigate = useNavigate();
  const [stock, setStock]           = useState(initialStock);
  const [donorForm, setDonorForm]   = useState(emptyDonor);
  const [reqForm, setReqForm]       = useState(emptyRequest);
  const [alert, setAlert]           = useState(null);

  const flash = (type, msg) => {
    setAlert({ type, msg });
    setTimeout(() => setAlert(null), 3500);
  };

  const handleAddStock = (e) => {
    e.preventDefault();
    if (!donorForm.group || !donorForm.units) return;
    const today = new Date().toISOString().split("T")[0];
    setStock(prev => prev.map(s =>
      s.group === donorForm.group
        ? { ...s, units: s.units + parseInt(donorForm.units), date: today }
        : s
    ));
    flash("success", `✅ ${donorForm.units} units of ${donorForm.group} added from ${donorForm.donorName || "donor"}.`);
    setDonorForm(emptyDonor);
  };

  const handleRequest = (e) => {
    e.preventDefault();
    if (!reqForm.group || !reqForm.units) return;
    const needed = parseInt(reqForm.units);
    const available = stock.find(s => s.group === reqForm.group)?.units || 0;
    if (available < needed) {
      flash("danger", `❌ Insufficient stock for ${reqForm.group}. Available: ${available} units.`);
      return;
    }
    const today = new Date().toISOString().split("T")[0];
    setStock(prev => prev.map(s =>
      s.group === reqForm.group
        ? { ...s, units: s.units - needed, date: today }
        : s
    ));
    flash("success", `✅ Blood request for ${reqForm.patientName} (${reqForm.group} — ${needed} units) submitted.`);
    setReqForm(emptyRequest);
  };

  return (
    <>
      {/* Header */}
      <div className="blood_header bg-danger text-white text-center py-4">
        <div className="home_page">
          <button className="btn btn-outline-warning btn-sm" onClick={() => navigate("/dashboard")}>
            🏠 Home
          </button>
        </div>
        <h1 className="fw-bold">🩸 Blood Group Information</h1>
        <p className="lead mb-0">Complete guide to blood types, compatibility & donation</p>
      </div>

      <div className="container-fluid px-3 px-md-4 my-4">

        {/* Alert */}
        {alert && (
          <div className={`alert alert-${alert.type} alert-dismissible fade show`}>
            {alert.msg}
            <button className="btn-close" onClick={() => setAlert(null)} />
          </div>
        )}

        {/* Stats */}
        <div className="row g-3 mb-4">
          {[
            { label: "Blood Types",       value: "8",   color: "danger"  },
            { label: "Universal Donor",   value: "O-",  color: "success" },
            { label: "Universal Receiver",value: "AB+", color: "primary" },
            { label: "Most Common",       value: "O+",  color: "warning" },
          ].map(s => (
            <div className="col-6 col-md-3" key={s.label}>
              <div className={`card text-center border-${s.color} shadow`}>
                <div className="card-body py-3">
                  <h2 className={`text-${s.color} fw-bold mb-0`}>{s.value}</h2>
                  <p className="mb-0 small">{s.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Compatibility Table */}
        <div className="card shadow mb-4">
          <div className="card-header bg-danger text-white">
            <h4 className="mb-0">📋 Blood Group Compatibility Chart</h4>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-bordered table-hover mb-0">
                <thead className="table-dark text-center">
                  <tr>
                    <th>Blood Group</th>
                    <th>Can Donate To</th>
                    <th>Can Receive From</th>
                    <th>Population %</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {bloodGroupList.map(item => (
                    <tr key={item.group}>
                      <td><span className={`badge bg-${item.color} fs-5`}>{item.group}</span></td>
                      <td>{item.canDonateTo}</td>
                      <td>{item.canReceiveFrom}</td>
                      <td>
                        <div className="progress" style={{ height: 20 }}>
                          <div className={`progress-bar bg-${item.color}`} style={{ width: item.percentage }}>
                            {item.percentage}
                          </div>
                        </div>
                      </td>
                      <td><span className="badge bg-success">Available</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Blood Group Detail Cards */}
        <h4 className="mb-3 text-danger fw-bold">🩸 Blood Group Details</h4>
        <div className="row g-3 mb-4">
          {bloodGroupList.map(item => (
            <div className="col-6 col-md-3" key={item.group}>
              <div className={`card shadow border-${item.color} text-center h-100`}>
                <div className={`card-header bg-${item.color} text-white`}>
                  <h2 className="fw-bold mb-0">{item.group}</h2>
                </div>
                <div className="card-body">
                  <p className="mb-1"><strong>Donate To:</strong></p>
                  <p className="text-muted small">{item.canDonateTo}</p>
                  <p className="mb-1"><strong>Receive From:</strong></p>
                  <p className="text-muted small">{item.canReceiveFrom}</p>
                  <span className={`badge bg-${item.color}`}>{item.percentage} of population</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Stock + Request Forms */}
        <div className="row g-4 mb-4">

          {/* Add Blood Stock */}
          <div className="col-12 col-md-6">
            <div className="card shadow h-100">
              <div className="card-header bg-danger text-white">
                <h5 className="mb-0">➕ Add Blood Stock</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleAddStock}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Blood Group</label>
                    <select className="form-select" required value={donorForm.group}
                      onChange={e => setDonorForm({ ...donorForm, group: e.target.value })}>
                      <option value="">Select Blood Group</option>
                      {bloodGroupList.map(i => <option key={i.group} value={i.group}>{i.group}</option>)}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Donor Name</label>
                    <input type="text" className="form-control" placeholder="Enter donor name"
                      value={donorForm.donorName} onChange={e => setDonorForm({ ...donorForm, donorName: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Units</label>
                    <input type="number" min="1" className="form-control" placeholder="Enter units" required
                      value={donorForm.units} onChange={e => setDonorForm({ ...donorForm, units: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Donor Age</label>
                    <input type="number" min="18" max="65" className="form-control" placeholder="Enter age"
                      value={donorForm.donorAge} onChange={e => setDonorForm({ ...donorForm, donorAge: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Contact</label>
                    <input type="tel" className="form-control" placeholder="Enter mobile number"
                      value={donorForm.contact} onChange={e => setDonorForm({ ...donorForm, contact: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Date</label>
                    <input type="date" className="form-control"
                      value={donorForm.date} onChange={e => setDonorForm({ ...donorForm, date: e.target.value })} />
                  </div>
                  <button type="submit" className="btn btn-danger w-100 fw-semibold">➕ Add Blood Stock</button>
                </form>
              </div>
            </div>
          </div>

          {/* Request Blood */}
          <div className="col-12 col-md-6">
            <div className="card shadow h-100">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">🔴 Request Blood</h5>
              </div>
              <div className="card-body">
                <form onSubmit={handleRequest}>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Patient Name</label>
                    <input type="text" className="form-control" placeholder="Enter patient name" required
                      value={reqForm.patientName} onChange={e => setReqForm({ ...reqForm, patientName: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Blood Group</label>
                    <select className="form-select" required value={reqForm.group}
                      onChange={e => setReqForm({ ...reqForm, group: e.target.value })}>
                      <option value="">Select Blood Group</option>
                      {bloodGroupList.map(i => <option key={i.group} value={i.group}>{i.group}</option>)}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Units Needed</label>
                    <input type="number" min="1" className="form-control" placeholder="Enter units required" required
                      value={reqForm.units} onChange={e => setReqForm({ ...reqForm, units: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Doctor</label>
                    <input type="text" className="form-control" placeholder="Enter doctor name"
                      value={reqForm.doctor} onChange={e => setReqForm({ ...reqForm, doctor: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Ward No</label>
                    <input type="text" className="form-control" placeholder="Enter ward number"
                      value={reqForm.ward} onChange={e => setReqForm({ ...reqForm, ward: e.target.value })} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Priority</label>
                    <select className="form-select" required value={reqForm.priority}
                      onChange={e => setReqForm({ ...reqForm, priority: e.target.value })}>
                      <option value="">Select Priority</option>
                      <option value="emergency">🚨 Emergency</option>
                      <option value="urgent">⚠️ Urgent</option>
                      <option value="normal">✅ Normal</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 fw-semibold">🔴 Request Blood</button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* Live Blood Bank Stock Table */}
        <div className="card shadow mb-4">
          <div className="card-header bg-dark text-white">
            <h5 className="mb-0">🏥 Current Blood Bank Stock</h5>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
              <table className="table table-striped table-hover mb-0">
                <thead className="table-danger text-center">
                  <tr>
                    <th>Blood Group</th>
                    <th>Available Units</th>
                    <th>Last Updated</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody className="text-center align-middle">
                  {stock.map(item => {
                    const s = getStatus(item.units);
                    return (
                      <tr key={item.group}>
                        <td><span className="badge bg-danger fs-6">{item.group}</span></td>
                        <td><strong>{item.units}</strong> units</td>
                        <td>{item.date}</td>
                        <td><span className={`badge bg-${s.badge}`}>{s.label}</span></td>
                        <td>
                          <button className="btn btn-sm btn-outline-danger me-1"
                            onClick={() => setReqForm({ ...emptyRequest, group: item.group })}>
                            Request
                          </button>
                          <button className="btn btn-sm btn-outline-success"
                            onClick={() => setDonorForm({ ...emptyDonor, group: item.group })}>
                            Add
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Blood_group;
