import { useAuth } from "../context/authContext";
import { getLocalKey } from "../helpers/sessionKey";
import { Navigate } from "react-router";
import { AuthContextType } from "../types/type";
import { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
  allowRole: String;
}
const PrivateRoute = ({ children, allowRole }: PrivateRouteProps) => {
  const token = getLocalKey("token");
  const { auth } = useAuth() as AuthContextType;
  if (!token) {
    return <Navigate to="/login" />;
  }
  if (auth && auth.role !== allowRole) {
    return <Navigate to="/unauthorized" replace />;
  }
  return children;
};

export default PrivateRoute;
