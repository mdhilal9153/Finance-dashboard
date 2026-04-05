import { createContext, useContext, useState } from "react"
import axios from 'axios';

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  

  const login = async (email, password) => {

    const response = await axios.post("http://localhost:8080/api/auth/login",{email,password});
    const data = response.data;
    console.log(data);
    setToken(data.token);
    // static mock user for now, will replace with JWT later
    setUser({ name: data.name, email, role: data.role });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify({ name: data.name, email, role: data.role }));
  }

  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }
  return (
    <AuthContext.Provider value={{ user,token, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}