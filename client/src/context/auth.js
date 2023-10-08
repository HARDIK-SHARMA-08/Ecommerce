import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // Initialize auth state using localStorage or an empty string
  const [auth, setAuth] = useState(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parsedData = JSON.parse(data);
      return {
        user: parsedData.user,
        token: parsedData.token,
      };
    }
    return {
      user: null,
      token: "", // Set to an empty string initially
    };
  });

  // Use local state for Axios headers
  const [axiosAuthHeader, setAxiosAuthHeader] = useState();

  // Update Axios headers whenever auth.token changes
  useEffect(() => {
    setAxiosAuthHeader(auth.token);
  }, [auth.token]);

  // Set the header in Axios
  axios.defaults.headers.common["Authorization"] = axiosAuthHeader;

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
