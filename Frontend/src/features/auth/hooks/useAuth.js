import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { getMe, login, logout, register } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      setUser(data.user);
    } catch (err) {
      console.log("HandleLogin Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ userName, email, password }) => {
    setLoading(true);
    try {
      const data = await register({ userName, email, password });
      setUser(data.user);
    } catch (err) {
      console.log("HandleRegister Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handlelogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } catch (err) {
      console.log("HandleLogout Error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGetMe = async () => {
    setLoading(true);
    try {
      const data = await getMe();
      setUser(data.user);
    } catch (err) {
      console.log("HandleGetMe Error:", err);
    }
    setLoading(false);
  };

  return {
    user,
    loading,
    handleLogin,
    handleRegister,
    handlelogout,
    handleGetMe,
  };
};
