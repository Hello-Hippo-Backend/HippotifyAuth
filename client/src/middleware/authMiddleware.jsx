import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInstance";

const authMiddleware = (Component) => {
  return (props) => {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    const verifyAuth = async () => {
      try {
        const response = await axiosInstance.get('/auth');
        setAuthenticated(response.data);
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