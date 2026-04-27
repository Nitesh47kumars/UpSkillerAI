import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";
import Loading from "../../interview/Components/Loading";

const Protected = ({ children }) => {
  const { loading, user } = useAuth();

  if (loading) {
    return <Loading/>
  }

  if (!user) {
    return <Navigate to={"/login"} replace />;
  }
  return children;
};

export default Protected;
