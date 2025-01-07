import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../services/authService";

const authMiddleware = (Component) => {
  return (props) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    const verifyAuth = async () => {
      try {
        const response = await auth();
        setAuthenticated(response);
      } catch (error) {
        setAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      verifyAuth();
    }, []);

    if (loading) {
      return null;
    }

    if (!authenticated) {
      return <Navigate to="/signin" replace />;
    }
    return <Component {...props} />;
  };
};

export default authMiddleware;
