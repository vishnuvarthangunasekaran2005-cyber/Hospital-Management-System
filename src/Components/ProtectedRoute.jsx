import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminRequired = false }) => {
  const token = localStorage.getItem("token");
  const user  = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token) return <Navigate to="/login" replace />;
  if (adminRequired && user.role !== "admin") return <Navigate to="/dashboard" replace />;

  return children;
};

export default ProtectedRoute;
