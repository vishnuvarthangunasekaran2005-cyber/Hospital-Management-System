import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login               from "../Components/Login";
import Register            from "../Components/Register";
import AdminPanel          from "../Components/AdminPanel";
import Dash_board          from "../Components/dash_board";
import Blood_group         from "../Components/blood_group_information";
import Pharmacy_Management from "../Components/pharmacy_management";
import Patient_Record      from "../Components/patient_record";
import ProtectedRoute      from "../Components/ProtectedRoute";

const App_route = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/"      element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />

        {/* Protected — any logged-in user */}
        <Route path="/dashboard"     element={<ProtectedRoute><Dash_board /></ProtectedRoute>} />
        <Route path="/blood_group"   element={<ProtectedRoute><Blood_group /></ProtectedRoute>} />
        <Route path="/pharmacy"      element={<ProtectedRoute><Pharmacy_Management /></ProtectedRoute>} />
        <Route path="/patient_record" element={<ProtectedRoute><Patient_Record /></ProtectedRoute>} />

        {/* Admin only */}
        <Route path="/register" element={<ProtectedRoute adminRequired><Register /></ProtectedRoute>} />
        <Route path="/admin"    element={<ProtectedRoute adminRequired><AdminPanel /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
};

export default App_route;
