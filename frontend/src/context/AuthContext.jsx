import React from 'react'
import { createContext, useContext, useState, useEffect } from 'react'
import api from '../config/axios'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("v1/auth/me", {
          withCredentials: true
        });
        if (response.status === 200 && response.data.success) {
          setIsLoggedIn(true);
          setUserId(response.data.data.id);
          // setUserId(response.data.data.user._id);
        } else {
          setIsLoggedIn(false);
          setUserId("");
        }
      } catch (error) {
        setIsLoggedIn(false);
        console.error("Authentication check failed:", error);
      }
    };
    checkAuth();
  }, [userId]);

  const logout = async () => {
        await api.post("v1/auth/signout", {}, {
            withCredentials: true
        });
        setIsLoggedIn(false);
        setUserId("");
        navigate("/"); // or window.location.reload()
    };

  return (
    <AuthContext.Provider value={{isLoggedIn, userId, setIsLoggedIn, setUserId, loading, setLoading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);