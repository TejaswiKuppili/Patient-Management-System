// import './App.css';
// import { Register } from './features/auth/pages/Register/Register';
// import { Login } from './features/auth/pages/Login/Login';
// import { Navigate, Route, Routes } from 'react-router-dom';
// import './styles/variables.css';
// import { Dashboard } from './components/Dashboard/Dashboard';

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Navigate to="/login" />} />
//       <Route path="/register" element={<Register />} />
//       <Route path="/login" element={<Login />} />
//       <Route path="/dashboard/*" element={<Dashboard />} />
//     </Routes>
//   );
// }

// export default App;

import './App.css';
import { Register } from './features/auth/pages/Register/Register';
import { Login } from './features/auth/pages/Login/Login';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './styles/variables.css';
import { Dashboard } from './components/Dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import AssignRoles from './components/AssignRoles/AssignRoles';
import { AuthProvider } from './features/auth/AuthProvider';

function App() {
  return (
    <AuthProvider>
       <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard/*" element={<Dashboard />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AssignRoles />
              </ProtectedRoute>
            }
          />
        </Routes>
    </AuthProvider>
  );
}

export default App;
