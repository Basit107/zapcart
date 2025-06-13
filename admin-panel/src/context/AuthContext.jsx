// AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import api from "../config/axios.js";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const verifyAdmin = async () => {
      try {
        const response = await api.get("v1/auth/admin/profile", {
          withCredentials: true
        });
        if (response.status === 200 && response.data.success) {
          setIsAuthenticated(true);
          setUser(response.data.data.admin);
          setLoading(false);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        setIsAuthenticated(false);
        console.error("Authentication check failed:", error);
        setLoading(false);
      }
    };
    verifyAdmin();
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, loading, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
