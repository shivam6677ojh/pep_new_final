import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const storageKey = 'smartstore_token';

  const saveAuth = (payload, rememberMe = true) => {
    localStorage.removeItem(storageKey);
    sessionStorage.removeItem(storageKey);

    if (rememberMe) {
      localStorage.setItem(storageKey, payload.token);
    } else {
      sessionStorage.setItem(storageKey, payload.token);
    }

    setUser({
      _id: payload._id,
      name: payload.name,
      email: payload.email,
      role: payload.role
    });
  };

  const login = async (credentials, rememberMe = true) => {
    const { data } = await api.post('/auth/login', credentials);
    saveAuth(data, rememberMe);
    return data;
  };

  const register = async (payload, rememberMe = true) => {
    const { data } = await api.post('/auth/register', payload);
    saveAuth(data, rememberMe);
    return data;
  };

  const logout = () => {
    localStorage.removeItem(storageKey);
    sessionStorage.removeItem(storageKey);
    setUser(null);
  };

  useEffect(() => {
    const hydrate = async () => {
      const token = localStorage.getItem(storageKey) || sessionStorage.getItem(storageKey);

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await api.get('/auth/me');
        setUser(data);
      } catch (error) {
        localStorage.removeItem('smartstore_token');
      } finally {
        setLoading(false);
      }
    };

    hydrate();
  }, []);

  const value = useMemo(
    () => ({
      user,
      loading,
      login,
      register,
      logout,
      isAuthenticated: Boolean(user)
    }),
    [user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
