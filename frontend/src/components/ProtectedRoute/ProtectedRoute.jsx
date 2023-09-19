import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ loggedIn, children }) => {
  return (
    loggedIn ? children : <Navigate to="/sign-in" replace />
  )
}

export default ProtectedRoute;