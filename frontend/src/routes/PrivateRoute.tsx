import { useAuth } from "../context/authContext";
import { getLocalKey } from "../helpers/sessionKey";
import { Navigate } from "react-router";
import { AuthContextType } from "../types/type";
import { ReactNode } from "react";

interface PrivateRouteProps {
  children: ReactNode;
  allowRole: string[];
}
const PrivateRoute = ({ children, allowRole }: PrivateRouteProps) => {
  const token = getLocalKey("token");
  const { auth } = useAuth() as AuthContextType;
  console.log(allowRole, auth);
  if (!token) {
    return <Navigate to="/login" />;
  } else if (auth?.role && !allowRole.includes(auth?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
