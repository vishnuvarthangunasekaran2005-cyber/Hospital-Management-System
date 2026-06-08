import { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const initialMedicines = [
  { id: "MED001", name: "Paracetamol 500mg",  category: "Analgesic",     stock: 250, price: 5,   expiry: "2026-12-01", supplier: "MedCorp",    status: "In Stock"     },
  { id: "MED002", name: "Amoxicillin 250mg",  category: "Antibiotic",    stock: 80,  price: 12,  expiry: "2025-08-15", supplier: "PharmaCo",   status: "In Stock"     },
  { id: "MED003", name: "Metformin 500mg",    category: "Antidiabetic",  stock: 15,  price: 8,   expiry: "2026-03-20", supplier: "HealthPlus", status: "Low Stock"    },
  { id: "MED004", name: "Atorvastatin 10mg",  category: "Cardiac",       stock: 0,   price: 25,  expiry: "2025-11-10", supplier: "MedCorp",    status: "Out of Stock" },
  { id: "MED005", name: "Omeprazole 20mg",    category: "Antacid",       stock: 180, price: 15,  expiry: "2026-06-30", supplier: "PharmaCo",   status: "In Stock"     },
];

const categories = ["Analgesic", "Antibiotic", "Antidiabetic", "Cardiac", "Antacid", "Vitamin", "Antihistamine", "Other"];

const Pharmacy_Management = () => {
  const navigate = useNavigate();
  const [medicines, setMedicines]     = useState(initialMedicines);
  const [search, setSearch]           = useState("");
  const [activeTab, setActiveTab]     = useState("inventory");
  const [form, setForm]               = useState({ id: "", name: "", category: "", stock: "", price: "", expiry: "", supplier: "" });
  const [billItems, setBillItems]     = useState([]);
  const [billMed, setBillMed]         = useState({ medId: "", qty: 1 });
  const [patientName, setPatientName] = useState("");
  const [showAlert, setShowAlert]     = useState(null);

  const flash = (type, msg) => {
    setShowAlert({ type, msg });
    setTimeout(() => setShowAlert(null), 3000);
  };

  const filtered = medicines.filter(m =>
    m.name.toLowerCase().includes(search.toLowerCase()) ||
    m.category.toLowerCase().includes(search.toLowerCase()) ||
    m.id.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddMedicine = (e) => {
    e.preventDefault();
    const stock = parseInt(form.stock);
    const newMed = {
      ...form, stock, price: parseFloat(form.price),
      status: stock === 0 ? "Out of Stock" : stock <= 20 ? "Low Stock" : "In Stock",
    };
    setMedicines([...medicines, newMed]);
    setForm({ id: "", name: "", category: "", stock: "", price: "", expiry: "", supplier: "" });
    flash("success", "Medicine added successfully!");
  };

  const handleDelete = (id) => {
    setMedicines(medicines.filter(m => m.id !== id));
    flash("danger", "Medicine removed.");
  };

  const addToBill = () => {
    const med = medicines.find(m => m.id === billMed.medId);
    if (!med) return;
    const existing = billItems.find(b => b.id === med.id);
    if (existing) {
      setBillItems(billItems.map(b => b.id === med.id ? { ...b, qty: b.qty + billMed.qty } : b));
    } else {
      setBillItems([...billItems, { ...med, qty: billMed.qty }]);
    }
    setBillMed({ medId: "", qty: 1 });
  };

  const billTotal = billItems.reduce((sum, b) => sum + b.price * b.qty, 0);

  const downloadPDF = () => {
    const doc    = new jsPDF();
    const date   = new Date().toLocaleDateString("en-IN");
    const time   = new Date().toLocaleTimeString("en-IN");
    const billNo = "BILL-" + Date.now().toString().slice(-6);

    // Green header bar
    doc.setFillColor(40, 167, 69);
    doc.rect(0, 0, 210, 30, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("HOSPITAL MANAGEMENT SYSTEM", 105, 12, { align: "center" });
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Pharmacy Bill / Invoice", 105, 22, { align: "center" });

    // Bill meta
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(10);
    doc.text("Bill No : " + billNo,                          14, 40);
    doc.text("Date    : " + date,                            14, 47);
    doc.text("Time    : " + time,                            14, 54);
    doc.text("Patient : " + (patientName || "Walk-in"),     120, 40);
    doc.text("Hospital: Medicare HMS",                       120, 47);
    doc.text("Address : Bangalore, Karnataka",               120, 54);

    doc.setDrawColor(200, 200, 200);
    doc.line(14, 58, 196, 58);

    // Items table
    autoTable(doc, {
      startY: 62,
      head: [["#", "Medicine", "Category", "Price (Rs.)", "Qty", "Total (Rs.)"]],
      body: billItems.map((b, i) => [
        i + 1,
        b.name,
        b.category,
        "Rs. " + b.price.toFixed(2),
        b.qty,
        "Rs. " + (b.price * b.qty).toFixed(2),
      ]),
      headStyles:         { fillColor: [40, 167, 69], textColor: 255, fontStyle: "bold" },
      alternateRowStyles: { fillColor: [240, 255, 240] },
      styles:             { fontSize: 10, cellPadding: 4 },
      columnStyles: {
        0: { halign: "center", cellWidth: 12 },
        3: { halign: "right" },
        4: { halign: "center" },
        5: { halign: "right" },
      },
    });

    const finalY = doc.lastAutoTable.finalY + 8;

    // Totals box
    doc.setFillColor(240, 255, 240);
    doc.roundedRect(120, finalY, 76, 30, 3, 3, "F");
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("Subtotal :", 125, finalY + 8);
    doc.text("Rs. " + billTotal.toFixed(2), 193, finalY + 8,  { align: "right" });
    doc.text("Tax (0%) :", 125, finalY + 16);
    doc.text("Rs. 0.00",                   193, finalY + 16, { align: "right" });
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text("Grand Total :", 125, finalY + 25);
    doc.text("Rs. " + billTotal.toFixed(2), 193, finalY + 25, { align: "right" });

    // Footer
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text("Thank you for choosing Medicare HMS. Get well soon!", 105, finalY + 42, { align: "center" });
    doc.text("+91-98765-43210  |  admin@hospital-hms.in  |  Bangalore, Karnataka", 105, finalY + 49, { align: "center" });

    doc.save(billNo + "_" + (patientName || "bill").replace(/\s+/g, "_") + ".pdf");
    flash("success", "Bill downloaded as " + billNo + ".pdf");
  };

  const stats = {
    total:   medicines.length,
    inStock: medicines.filter(m => m.status === "In Stock").length,
    low:     medicines.filter(m => m.status === "Low Stock").length,
    out:     medicines.filter(m => m.status === "Out of Stock").length,
  };

  const statusBadge = (s) => s === "In Stock" ? "success" : s === "Low Stock" ? "warning" : "danger";

  return (
    <div className="min-vh-100 bg-light">
      {/* Header */}
      <div className="bg-success text-white py-3 px-4 shadow">
        <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <h3 className="mb-0 fw-bold">💊 Pharmacy Management</h3>
            <small className="opacity-75">Hospital Inventory &amp; Billing System</small>
          </div>
          <button className="btn btn-outline-light btn-sm" onClick={() => navigate("/dashboard")}>
            🏠 Dashboard
          </button>
        </div>
      </div>

      <div className="container-fluid py-4 px-4">

        {showAlert && (
          <div className={`alert alert-${showAlert.type} alert-dismissible fade show`} role="alert">
            {showAlert.msg}
            <button type="button" className="btn-close" onClick={() => setShowAlert(null)} />
          </div>
        )}

        {/* Stats */}
        <div className="row g-3 mb-4">
          {[
            { label: "Total Medicines", value: stats.total,   color: "primary", icon: "💊" },
            { label: "In Stock",        value: stats.inStock,  color: "success", icon: "✅" },
            { label: "Low Stock",       value: stats.low,      color: "warning", icon: "⚠️" },
            { label: "Out of Stock",    value: stats.out,      color: "danger",  icon: "❌" },
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
          {[["inventory", "📦 Inventory"], ["add", "➕ Add Medicine"], ["billing", "🧾 Billing"]].map(([key, label]) => (
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

        {/* ── Inventory Tab ── */}
        {activeTab === "inventory" && (
          <div className="card shadow-sm">
            <div className="card-header bg-success text-white d-flex flex-wrap justify-content-between align-items-center gap-2">
              <h5 className="mb-0">Medicine Inventory</h5>
              <input
                className="form-control form-control-sm"
                style={{ maxWidth: 220 }}
                placeholder="🔍 Search medicines..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover table-bordered mb-0">
                  <thead className="table-dark text-center">
                    <tr>
                      <th>ID</th><th>Name</th><th>Category</th><th>Stock</th>
                      <th className="d-none d-md-table-cell">Price (₹)</th>
                      <th className="d-none d-lg-table-cell">Expiry</th>
                      <th className="d-none d-lg-table-cell">Supplier</th>
                      <th>Status</th><th>Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-center align-middle">
                    {filtered.length === 0 ? (
                      <tr><td colSpan={9} className="text-muted py-4">No medicines found.</td></tr>
                    ) : filtered.map(m => (
                      <tr key={m.id}>
                        <td><code>{m.id}</code></td>
                        <td className="text-start fw-semibold">{m.name}</td>
                        <td><span className="badge bg-info text-dark">{m.category}</span></td>
                        <td>{m.stock}</td>
                        <td className="d-none d-md-table-cell">₹{m.price}</td>
                        <td className="d-none d-lg-table-cell">{m.expiry}</td>
                        <td className="d-none d-lg-table-cell">{m.supplier}</td>
                        <td><span className={`badge bg-${statusBadge(m.status)}`}>{m.status}</span></td>
                        <td>
                          <button className="btn btn-danger btn-sm" onClick={() => handleDelete(m.id)}>🗑️</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ── Add Medicine Tab ── */}
        {activeTab === "add" && (
          <div className="row justify-content-center">
            <div className="col-12 col-lg-7">
              <div className="card shadow">
                <div className="card-header bg-success text-white">
                  <h5 className="mb-0">➕ Add New Medicine</h5>
                </div>
                <div className="card-body">
                  <form onSubmit={handleAddMedicine}>
                    <div className="row g-3">
                      <div className="col-md-6 col-12">
                        <label className="form-label fw-semibold">Medicine ID</label>
                        <input className="form-control" placeholder="e.g. MED006" required
                          value={form.id} onChange={e => setForm({ ...form, id: e.target.value })} />
                      </div>
                      <div className="col-md-6 col-12">
                        <label className="form-label fw-semibold">Medicine Name</label>
                        <input className="form-control" placeholder="e.g. Ibuprofen 400mg" required
                          value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                      </div>
                      <div className="col-md-6 col-12">
                        <label className="form-label fw-semibold">Category</label>
                        <select className="form-select" required value={form.category}
                          onChange={e => setForm({ ...form, category: e.target.value })}>
                          <option value="">Select Category</option>
                          {categories.map(c => <option key={c}>{c}</option>)}
                        </select>
                      </div>
                      <div className="col-md-6 col-12">
                        <label className="form-label fw-semibold">Supplier</label>
                        <input className="form-control" placeholder="Supplier name" required
                          value={form.supplier} onChange={e => setForm({ ...form, supplier: e.target.value })} />
                      </div>
                      <div className="col-md-4 col-12">
                        <label className="form-label fw-semibold">Stock (units)</label>
                        <input type="number" min="0" className="form-control" placeholder="0" required
                          value={form.stock} onChange={e => setForm({ ...form, stock: e.target.value })} />
                      </div>
                      <div className="col-md-4 col-12">
                        <label className="form-label fw-semibold">Price (₹)</label>
                        <input type="number" min="0" step="0.01" className="form-control" placeholder="0.00" required
                          value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                      </div>
                      <div className="col-md-4 col-12">
                        <label className="form-label fw-semibold">Expiry Date</label>
                        <input type="date" className="form-control" required
                          value={form.expiry} onChange={e => setForm({ ...form, expiry: e.target.value })} />
                      </div>
                      <div className="col-12">
                        <button type="submit" className="btn btn-success w-100 fw-semibold">
                          ➕ Add Medicine to Inventory
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Billing Tab ── */}
        {activeTab === "billing" && (
          <div className="row g-4">
            <div className="col-12 col-lg-5">
              <div className="card shadow">
                <div className="card-header bg-success text-white">
                  <h5 className="mb-0">🧾 Create Bill</h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Patient Name</label>
                    <input type="text" className="form-control" placeholder="Enter patient name (optional)"
                      value={patientName} onChange={e => setPatientName(e.target.value)} />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Select Medicine</label>
                    <select className="form-select" value={billMed.medId}
                      onChange={e => setBillMed({ ...billMed, medId: e.target.value })}>
                      <option value="">-- Select Medicine --</option>
                      {medicines.filter(m => m.stock > 0).map(m => (
                        <option key={m.id} value={m.id}>{m.name} — ₹{m.price}</option>
                      ))}
                    </select>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Quantity</label>
                    <input type="number" min="1" className="form-control" value={billMed.qty}
                      onChange={e => setBillMed({ ...billMed, qty: parseInt(e.target.value) || 1 })} />
                  </div>
                  <button className="btn btn-success w-100" onClick={addToBill} disabled={!billMed.medId}>
                    ➕ Add to Bill
                  </button>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-7">
              <div className="card shadow">
                <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">🏥 Bill Summary</h5>
                  <button className="btn btn-outline-light btn-sm" onClick={() => { setBillItems([]); setPatientName(""); }}>
                    Clear
                  </button>
                </div>
                <div className="card-body p-0">
                  <table className="table table-bordered mb-0">
                    <thead className="table-secondary text-center">
                      <tr><th>Medicine</th><th>Price</th><th>Qty</th><th>Total</th><th></th></tr>
                    </thead>
                    <tbody className="text-center align-middle">
                      {billItems.length === 0 ? (
                        <tr><td colSpan={5} className="text-muted py-4">No items added yet.</td></tr>
                      ) : billItems.map(b => (
                        <tr key={b.id}>
                          <td className="text-start">{b.name}</td>
                          <td>₹{b.price}</td>
                          <td>{b.qty}</td>
                          <td className="fw-semibold">₹{(b.price * b.qty).toFixed(2)}</td>
                          <td>
                            <button className="btn btn-danger btn-sm"
                              onClick={() => setBillItems(billItems.filter(x => x.id !== b.id))}>✕</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    {billItems.length > 0 && (
                      <tfoot>
                        <tr className="table-success">
                          <td colSpan={3} className="fw-bold text-end">Grand Total</td>
                          <td className="fw-bold text-center">₹{billTotal.toFixed(2)}</td>
                          <td></td>
                        </tr>
                      </tfoot>
                    )}
                  </table>
                </div>
                {billItems.length > 0 && (
                  <div className="card-footer">
                    <button className="btn btn-success w-100 fw-semibold" onClick={downloadPDF}>
                      📄 Download Bill PDF
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Pharmacy_Management;
