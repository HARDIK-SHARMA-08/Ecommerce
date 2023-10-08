import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from "axios";
import Spinner from "../Spinner";

export default function AdminPrivateRoute() {
  const [loading, setLoading] = useState(true); // Add loading state
  const [ok, setOk] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const authCheck = async () => {
      try {
        const res = await axios.get("/api/v1/auth/admin-auth");
        if (res.data.ok) {
          setOk(true);
        } else {
          setOk(false);
        }
      } catch (error) {
        console.error("Error checking admin authentication:", error);
        setOk(false);
      } finally {
        setLoading(false); // Set loading to false when the check is done
      }
    };
    if (auth.token) {
      authCheck();
    } else {
      setLoading(false);
    }
  }, [auth.token]);

  if (loading) {
    return <Spinner path="" />;
  }
  
  return ok ? <Outlet /> : <Spinner path="" />;
}
