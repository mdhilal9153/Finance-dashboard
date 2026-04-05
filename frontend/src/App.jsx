import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, useAuth } from "./context/AuthContext"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Records from "./pages/Records"
import Users from "./pages/Users"
import AddRecord from "./pages/AddRecord"
import Register from "./pages/Register"

function ProtectedRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" />
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/records" element={<Records/>}/>
          <Route path="/users" element={<Users/>}/>
          <Route path="/create" element={<ProtectedRoute><AddRecord/></ProtectedRoute>}/>

          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App