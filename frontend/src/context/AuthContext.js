import { createContext, useState, useEffect } from 'react';
import API from '../api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      };

      try {
        const res = await API.get('/auth/me');
        setUser(res.data);
      } catch (err) {
        console.log('Token validation failed:', err.message);
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    API.get('/auth/me')
    .then((res) => setUser(res.data))
    .catch((err) => {
      console.error('Failed to fetch user data:', err.message);
      localStorage.removeItem('token');
    });
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    alert('Logout successful.');
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-light">
        <div className="spinner-border text-light" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
};