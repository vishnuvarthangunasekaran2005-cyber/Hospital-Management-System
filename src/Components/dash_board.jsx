import DoctorImage from "../assets/DOCTOR 1.jpg";
import HospitalLogo from "../assets/Hospital_logo.jpg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "../Styles/dashboard.css";

const Dash_board = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  
  const loginDetails = {
    username: "admin@hospital.com",
    role: "Administrator",
    lastLogin: new Date().toLocaleString(),
    userId: "HMS-001"
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
        <div className="container-fluid">
          <a className="navbar-brand fw-bold fs-5">⚚ Hospital Management System</a>
          
          <div className="d-flex align-items-center ms-auto">
            <div className="dropdown" style={{ position: 'relative' }}>
              <button
                className="btn btn-primary btn-sm dropdown-toggle"
                type="button"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                👤 Profile
              </button>
              {showDropdown && (
                <div className="dropdown-menu show" style={{ position: 'absolute', right: 0, top: '100%', marginTop: '0.5rem', minWidth: '280px' }}>
                  <div className="px-3 py-2">
                    <h6 className="mb-2">Login Details</h6>
                    <hr className="my-2" />
                    <p className="mb-1 small"><strong>User ID:</strong> {loginDetails.userId}</p>
                    <p className="mb-1 small"><strong>Username:</strong> {loginDetails.username}</p>
                    <p className="mb-1 small"><strong>Role:</strong> {loginDetails.role}</p>
                    <p className="mb-1 small"><strong>Last Login:</strong> {loginDetails.lastLogin}</p>
                    <hr className="my-2" />
                    <button className="btn btn-danger btn-sm w-100" onClick={() => navigate("/")}>Logout</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="button">
        <button
          type="button"
          className="btn btn-outline-success"
          onClick={() => navigate("/patient_record")}
        >
          🩺 Patient Record
        </button>
        <button
          type="button"
          className="btn btn-outline-danger"
          onClick={() => navigate("/blood_group")}
        >
          🩸 Blood group Information
        </button>
        <button
          type="button"
          className="btn btn-outline-warning"
          onClick={() => navigate("/pharmacy")}
        >
          💊 Pharmacy Management
        </button>
      </div>

      <br></br>

      <div class="accordion accordion-flush" id="accordionFlushExample">
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseOne"
              aria-expanded="false"
              aria-controls="flush-collapseOne"
            >
              🩺 Patient Record
            </button>
          </h2>
          <div
            id="flush-collapseOne"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body">
              Manage doctor information efficiently within the hospital system.
              Store doctor names, departments, and specialization details
              securely. Track doctor schedules and available appointment timings
              easily. Assign doctors to patients based on medical requirements.
              Maintain attendance and duty records for all staff members. Enable
              quick communication between doctors and administration. Monitor
              emergency availability and shift timings regularly. Keep records
              of consultations and treatment history organized. Improve
              coordination between different hospital departments. Ensure better
              healthcare service and patient satisfaction daily class. This is
              the first item s accordion body.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo"
              aria-expanded="false"
              aria-controls="flush-collapseTwo"
            >
              📅 Appointment Booking
            </button>
          </h2>
          <div
            id="flush-collapseTwo"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body">
              Manage doctor information efficiently within the hospital system.
              Store doctor names, departments, and specialization details
              securely. Track doctor schedules and available appointment timings
              easily. Assign doctors to patients based on medical requirements.
              Maintain attendance and duty records for all staff members. Enable
              quick communication between doctors and administration. Monitor
              emergency availability and shift timings regularly. Keep records
              of consultations and treatment history organized. Improve
              coordination between different hospital departments. Ensure better
              healthcare service and patient satisfaction daily.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button
              class="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#flush-collapseThree"
              aria-expanded="false"
              aria-controls="flush-collapseThree"
            >
              💊 Pharmacy Management
            </button>
          </h2>
          <div
            id="flush-collapseThree"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionFlushExample"
          >
            <div class="accordion-body">
              Manage doctor information efficiently within the hospital system.
              Store doctor names, departments, and specialization details
              securely. Track doctor schedules and available appointment timings
              easily. Assign doctors to patients based on medical requirements.
              Maintain attendance and duty records for all staff members. Enable
              quick communication between doctors and administration. Monitor
              emergency availability and shift timings regularly. Keep records
              of consultations and treatment history organized. Improve
              coordination between different hospital departments. Ensure better
              healthcare service and patient satisfaction daily.
            </div>
          </div>
        </div>
      </div>

      <br></br>

      <div className="parent">
        <div className="child1">
          <h1>🩺 Hospital Management System</h1>
          <br></br>
          <h4>
            Manage doctor information efficiently within the hospital system.
            Store doctor names, departments, and specialization details
            securely. Track doctor schedules and available appointment timings
            easily. Assign doctors to patients based on medical requirements.
            Maintain attendance and duty records for all staff members. Enable
            quick communication between doctors and administration. Monitor
            emergency availability and shift timings regularly. Keep records of
            consultations and treatment history organized. Improve coordination
            between different hospital departments. Ensure better healthcare
            service and patient satisfaction daily.
          </h4>
        </div>
        <div className="child2">
          <img
            src={HospitalLogo}
            alt="Hospital Logo"
            className="hospital-logo"
          />
        </div>
      </div>

      <br></br>
      <br></br>
      <div className="cards">
        <div className="row g-4">
          {/* Card 1 */}
          <div className="col-lg-3 col-md-6">
            <div className="card shadow" style={{ width: "100%" }}>
              <img src={DoctorImage} className="card-img-top" alt="Doctor" />

              <div className="card-body text-center">
                <h5 className="card-title">Dr. John Smith</h5>

                <p className="card-text">
                  Senior Cardiologist with 10+ years of experience in heart
                  care.
                </p>

                <a
                  href="https://www.linkedin.com/jobs/search-results/?currentJobId=4417888148&keywords=bone%20doctor&origin=BLENDED_SEARCH_RESULT_NAVIGATION_JOB_CARD&originToLandingJobPostings=4412718414%2C4417888148%2C4367164979"
                  className="btn btn-primary"
                >
                  View Profile
                </a>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="col-lg-3 col-md-6">
            <div className="card shadow" style={{ width: "100%" }}>
              <img src={DoctorImage} className="card-img-top" alt="Doctor" />

              <div className="card-body text-center">
                <h5 className="card-title">Dr. Emily Johnson</h5>

                <p className="card-text">
                  Pediatrician specialized in child healthcare and wellness.
                </p>

                <a
                  href="https://www.linkedin.com/jobs/search-results/?currentJobId=4417888148&keywords=bone%20doctor&origin=BLENDED_SEARCH_RESULT_NAVIGATION_JOB_CARD&originToLandingJobPostings=4412718414%2C4417888148%2C4367164979"
                  className="btn btn-primary"
                >
                  View Profile
                </a>
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="col-lg-3 col-md-6">
            <div className="card shadow" style={{ width: "100%" }}>
              <img src={DoctorImage} className="card-img-top" alt="Doctor" />

              <div className="card-body text-center">
                <h5 className="card-title">Dr. David Wilson</h5>

                <p className="card-text">
                  Neurologist focused on brain and nervous system treatments.
                </p>
                <a
                  href="https://www.linkedin.com/jobs/search-results/?currentJobId=4417888148&keywords=bone%20doctor&origin=BLENDED_SEARCH_RESULT_NAVIGATION_JOB_CARD&originToLandingJobPostings=4412718414%2C4417888148%2C4367164979"
                  className="btn btn-primary"
                >
                  View Profile
                </a>
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="col-lg-3 col-md-6">
            <div className="card shadow" style={{ width: "100%" }}>
              <img src={DoctorImage} className="card-img-top" alt="Doctor" />

              <div className="card-body text-center">
                <h5 className="card-title">Dr. Sophia Brown</h5>

                <p className="card-text">
                  Orthopedic specialist experienced in bone and joint care.
                </p>

                <a
                  href="https://www.linkedin.com/jobs/search-results/?currentJobId=4417888148&keywords=bone%20doctor&origin=BLENDED_SEARCH_RESULT_NAVIGATION_JOB_CARD&originToLandingJobPostings=4412718414%2C4417888148%2C4367164979  "
                  className="btn btn-primary"
                >
                  View Profile
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
      <div className="management_video">
        <iframe
          width="100%"
          height="800px"
          src="https://www.youtube.com/embed/V9yYvVto8Cs?si=TKB-SpyDQjIoB9BX"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowfullscreen
        ></iframe>
      </div>

      {/* Live Stats */}
      <br></br>
      <div className="container-fluid px-4">
        <h4>📊 Live Hospital Stats</h4>
        <br></br>
        <div className="row g-3 mb-4">
          {[
            {
              label: "Total Patients",
              value: "1,284",
              color: "primary",
              icon: "👥",
            },
            {
              label: "Doctors on Duty",
              value: "48",
              color: "success",
              icon: "🩺",
            },
            {
              label: "Beds Available",
              value: "32",
              color: "warning",
              icon: "🛏️",
            },
            {
              label: "Surgeries Today",
              value: "7",
              color: "danger",
              icon: "🔬",
            },
            {
              label: "Medicines in Stock",
              value: "520",
              color: "info",
              icon: "💊",
            },
            {
              label: "Appointments Today",
              value: "93",
              color: "secondary",
              icon: "📅",
            },
          ].map((s) => (
            <div
              className="col-xl-2 col-lg-4 col-md-4 col-6"
              key={s.label}
              style={{ minWidth: 0 }}
            >
              <div className="card shadow text-center">
                <div className="card-body">
                  <div className="fs-3">{s.icon}</div>
                  <h4 className={`text-${s.color}`}>{s.value}</h4>
                  <small className="text-muted">{s.label}</small>
                </div>
              </div>
            </div>
          ))}
        </div>

        <br></br>

        {/* Recent Patients + Appointments */}
        <div className="row g-4 mb-4">
          <div className="col-lg-6">
            <div className="card shadow">
              <div className="card-header">🩺 Recent Patients</div>
              <div className="card-body p-0">
                <table className="table table-bordered table-hover mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Doctor</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        id: "P001",
                        name: "Ravi Kumar",
                        doctor: "Dr. John Smith",
                        status: "Admitted",
                        color: "success",
                      },
                      {
                        id: "P002",
                        name: "Sneha Patel",
                        doctor: "Dr. Emily Johnson",
                        status: "Admitted",
                        color: "success",
                      },
                      {
                        id: "P003",
                        name: "Arjun Singh",
                        doctor: "Dr. David Wilson",
                        status: "Discharged",
                        color: "secondary",
                      },
                      {
                        id: "P004",
                        name: "Meena Rao",
                        doctor: "Dr. Sophia Brown",
                        status: "Admitted",
                        color: "success",
                      },
                      {
                        id: "P005",
                        name: "Kiran Bose",
                        doctor: "Dr. John Smith",
                        status: "Observation",
                        color: "warning",
                      },
                    ].map((p) => (
                      <tr key={p.id}>
                        <td>
                          <code>{p.id}</code>
                        </td>
                        <td>{p.name}</td>
                        <td>{p.doctor}</td>
                        <td>
                          <span className={`badge bg-${p.color}`}>
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-lg-6">
            <div className="card shadow">
              <div className="card-header">📅 Today's Appointments</div>
              <div className="card-body p-0">
                <table className="table table-bordered table-hover mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th>Time</th>
                      <th>Patient</th>
                      <th>Doctor</th>
                      <th>Dept</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        time: "09:00 AM",
                        patient: "Rohit Das",
                        doctor: "Dr. John Smith",
                        dept: "Cardiology",
                      },
                      {
                        time: "10:30 AM",
                        patient: "Priya Nair",
                        doctor: "Dr. Emily Johnson",
                        dept: "Pediatrics",
                      },
                      {
                        time: "11:00 AM",
                        patient: "Suresh Rao",
                        doctor: "Dr. David Wilson",
                        dept: "Neurology",
                      },
                      {
                        time: "02:00 PM",
                        patient: "Anjali Mehta",
                        doctor: "Dr. Sophia Brown",
                        dept: "Orthopedics",
                      },
                      {
                        time: "03:30 PM",
                        patient: "Vikram Joshi",
                        doctor: "Dr. John Smith",
                        dept: "Cardiology",
                      },
                    ].map((a, i) => (
                      <tr key={i}>
                        <td>
                          <span className="badge bg-secondary">{a.time}</span>
                        </td>
                        <td>{a.patient}</td>
                        <td>{a.doctor}</td>
                        <td>{a.dept}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <br></br>

        {/* Department Bed Occupancy */}
        <h4>🏥 Department Bed Occupancy</h4>
        <br></br>
        <div className="row g-3 mb-4">
          {[
            { dept: "Cardiology", occupied: 18, total: 20, color: "danger" },
            { dept: "Neurology", occupied: 10, total: 15, color: "primary" },
            { dept: "Pediatrics", occupied: 12, total: 20, color: "success" },
            { dept: "Orthopedics", occupied: 8, total: 10, color: "warning" },
            { dept: "General Ward", occupied: 30, total: 50, color: "info" },
            { dept: "ICU", occupied: 9, total: 10, color: "dark" },
          ].map((d) => (
            <div className="col-lg-4 col-md-6 col-12" key={d.dept}>
              <div className="card shadow">
                <div className="card-body">
                  <div className="d-flex justify-content-between mb-2">
                    <span>{d.dept}</span>
                    <small className="text-muted">
                      {d.occupied}/{d.total} beds
                    </small>
                  </div>
                  <div className="progress" style={{ height: "14px" }}>
                    <div
                      className={`progress-bar bg-${d.color}`}
                      style={{
                        width: `${Math.round((d.occupied / d.total) * 100)}%`,
                      }}
                    >
                      {Math.round((d.occupied / d.total) * 100)}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <br></br>

        {/* Recent Activity */}
        <h4>🕐 Recent Activity</h4>
        <br></br>
        <div className="card shadow mb-4">
          <ul className="list-group list-group-flush">
            {[
              {
                msg: "Patient Ravi Kumar admitted to Room 101",
                time: "2 min ago",
                color: "primary",
              },
              {
                msg: "Pharmacy stock updated — Paracetamol 500mg (+100 units)",
                time: "15 min ago",
                color: "success",
              },
              {
                msg: "Blood request raised — O+ (2 units) for Patient P004",
                time: "30 min ago",
                color: "danger",
              },
              {
                msg: "Dr. Emily Johnson marked available for Pediatrics OPD",
                time: "1 hr ago",
                color: "info",
              },
              {
                msg: "Patient Arjun Singh discharged from Room 302",
                time: "2 hrs ago",
                color: "secondary",
              },
              {
                msg: "New appointment booked — Rohit Das with Dr. John Smith",
                time: "3 hrs ago",
                color: "warning",
              },
            ].map((a, i) => (
              <li
                key={i}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  <span className={`badge bg-${a.color} me-2`}>&nbsp;</span>
                  {a.msg}
                </span>
                <small className="text-muted ms-3">{a.time}</small>
              </li>
            ))}
          </ul>
        </div>

        <br></br>

        {/* Footer */}
        <div className="card shadow mb-4">
          <div className="card-body">
            <div className="row g-3">
              <div className="col-md-4">
                <h6>⚕️ Hospital Management System</h6>
                <p className="text-muted small mb-0">
                  Delivering quality healthcare management for modern hospitals.
                </p>
              </div>
              <div className="col-md-4">
                <h6>Quick Links</h6>
                <div className="d-flex flex-column gap-1">
                  <button
                    className="btn btn-outline-success btn-sm"
                    onClick={() => navigate("/patient_record")}
                  >
                    🩺 Patient Records
                  </button>
                  <button
                    className="btn btn-outline-warning btn-sm"
                    onClick={() => navigate("/pharmacy")}
                  >
                    💊 Pharmacy
                  </button>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => navigate("/blood_group")}
                  >
                    🩸 Blood Bank
                  </button>
                </div>
              </div>
              <div className="col-md-4">
                <h6>Contact</h6>
                <p className="text-muted small mb-1">📞 +91-98765-43210</p>
                <p className="text-muted small mb-1">
                  📧 admin@hospital-hms.in
                </p>
                <p className="text-muted small mb-0">📍 Bangalore, Karnataka</p>
              </div>
            </div>
            <hr />
            <p className="text-center text-muted small mb-0">
              © 2025 Hospital Management System. All rights reserved.
            </p>
          </div>
        </div>

        <br></br>
      </div>
    </>
  );
};

export default Dash_board;
