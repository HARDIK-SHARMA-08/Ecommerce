//Used for state management
import React, { useState, useEffect, useContext, createContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  //Default Axios
  axios.defaults.headers.common["Authorization"] = auth && auth.token;

  //Used for storing the data of the logged in user
  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parserData = JSON.parse(data);
      setAuth({
        ...auth,
        user: parserData.user,
        token: parserData.token,
      });
    }
  }, []);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

//Custom Hook
const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
