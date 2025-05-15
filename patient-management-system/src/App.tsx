import './App.css';
import { Register } from './features/auth/pages/Register/Register';
import { Login } from './features/auth/pages/Login/Login';
import { Navigate, Route, Routes } from 'react-router-dom';
import './styles/variables.css';
import { Dashboard } from './features/auth/components/Dashboard/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
    </Routes>
  );
}

export default App;
