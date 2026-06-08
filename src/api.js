const BASE = "http://localhost:5000/api";

const headers = () => ({
  "Content-Type": "application/json",
  ...(localStorage.getItem("token") && {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  }),
});

const api = {
  // ── Auth ──
  seedAdmin: () =>
    fetch(`${BASE}/auth/seed-admin`, { method: "POST", headers: headers() }).then((r) => r.json()),

  login: (data) =>
    fetch(`${BASE}/auth/login`, { method: "POST", headers: headers(), body: JSON.stringify(data) }).then((r) => r.json()),

  register: (data) =>
    fetch(`${BASE}/auth/register`, { method: "POST", headers: headers(), body: JSON.stringify(data) }).then((r) => r.json()),

  getMe: () =>
    fetch(`${BASE}/auth/me`, { headers: headers() }).then((r) => r.json()),

  changePassword: (data) =>
    fetch(`${BASE}/auth/change-password`, { method: "PUT", headers: headers(), body: JSON.stringify(data) }).then((r) => r.json()),

  // ── Patients ──
  getPatients: (params = "") =>
    fetch(`${BASE}/patients?${params}`, { headers: headers() }).then((r) => r.json()),

  addPatient: (data) =>
    fetch(`${BASE}/patients`, { method: "POST", headers: headers(), body: JSON.stringify(data) }).then((r) => r.json()),

  updatePatient: (id, data) =>
    fetch(`${BASE}/patients/${id}`, { method: "PUT", headers: headers(), body: JSON.stringify(data) }).then((r) => r.json()),

  deletePatient: (id) =>
    fetch(`${BASE}/patients/${id}`, { method: "DELETE", headers: headers() }).then((r) => r.json()),

  getPatientStats: () =>
    fetch(`${BASE}/patients/stats/summary`, { headers: headers() }).then((r) => r.json()),

  // ── Medicines ──
  getMedicines: (params = "") =>
    fetch(`${BASE}/medicines?${params}`, { headers: headers() }).then((r) => r.json()),

  addMedicine: (data) =>
    fetch(`${BASE}/medicines`, { method: "POST", headers: headers(), body: JSON.stringify(data) }).then((r) => r.json()),

  updateMedicine: (id, data) =>
    fetch(`${BASE}/medicines/${id}`, { method: "PUT", headers: headers(), body: JSON.stringify(data) }).then((r) => r.json()),

  deleteMedicine: (id) =>
    fetch(`${BASE}/medicines/${id}`, { method: "DELETE", headers: headers() }).then((r) => r.json()),

  getMedicineStats: () =>
    fetch(`${BASE}/medicines/stats/summary`, { headers: headers() }).then((r) => r.json()),

  // ── Blood ──
  getBloodStock: () =>
    fetch(`${BASE}/blood/stock`, { headers: headers() }).then((r) => r.json()),

  getDonors: () =>
    fetch(`${BASE}/blood/donors`, { headers: headers() }).then((r) => r.json()),

  addDonor: (data) =>
    fetch(`${BASE}/blood/donors`, { method: "POST", headers: headers(), body: JSON.stringify(data) }).then((r) => r.json()),

  getBloodRequests: () =>
    fetch(`${BASE}/blood/requests`, { headers: headers() }).then((r) => r.json()),

  requestBlood: (data) =>
    fetch(`${BASE}/blood/requests`, { method: "POST", headers: headers(), body: JSON.stringify(data) }).then((r) => r.json()),

  updateBloodRequest: (id, data) =>
    fetch(`${BASE}/blood/requests/${id}`, { method: "PUT", headers: headers(), body: JSON.stringify(data) }).then((r) => r.json()),

  // ── Appointments ──
  getAppointments: (params = "") =>
    fetch(`${BASE}/appointments?${params}`, { headers: headers() }).then((r) => r.json()),

  addAppointment: (data) =>
    fetch(`${BASE}/appointments`, { method: "POST", headers: headers(), body: JSON.stringify(data) }).then((r) => r.json()),

  deleteAppointment: (id) =>
    fetch(`${BASE}/appointments/${id}`, { method: "DELETE", headers: headers() }).then((r) => r.json()),

  // ── Admin ──
  getAdminStats: () =>
    fetch(`${BASE}/admin/stats`, { headers: headers() }).then((r) => r.json()),

  getUsers: () =>
    fetch(`${BASE}/admin/users`, { headers: headers() }).then((r) => r.json()),

  updateUserRole: (id, role) =>
    fetch(`${BASE}/admin/users/${id}`, { method: "PUT", headers: headers(), body: JSON.stringify({ role }) }).then((r) => r.json()),

  deleteUser: (id) =>
    fetch(`${BASE}/admin/users/${id}`, { method: "DELETE", headers: headers() }).then((r) => r.json()),
};

export default api;
