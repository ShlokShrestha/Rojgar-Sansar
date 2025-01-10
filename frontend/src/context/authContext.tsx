import { createContext, useState, ReactNode, useContext } from "react";
import { getLocalKey } from "../helpers/sessionKey";

interface AuthContextType {
  auth: {
    id: string;
    email: string;
    role: string;
  };
  setAuth: React.Dispatch<
    React.SetStateAction<{
      id: string;
      email: string;
      role: string;
    }>
  >;
}
export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const userInfo = JSON.parse(getLocalKey("userInfo") || "{}");
  const [auth, setAuth] = useState<AuthContextType["auth"]>({
    id: userInfo.id || "",
    email: userInfo.email || "",
    role: userInfo.role || "",
  });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
