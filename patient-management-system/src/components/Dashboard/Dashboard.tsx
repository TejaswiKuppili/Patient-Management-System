import { Link, Outlet, Routes, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import DashboardRoutes from '../../routes/DashboardRoutes';
import './Dashboard.css';
import { useAuth } from '../../features/hooks/useAuth';
import { logout } from '../../features/auth/api/authApi';

// This component serves as the main dashboard layout for authenticated users.
export const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      {/* <div className="dashboard-header">
        <h3>Welcome, {user?.name ?? 'Guest'} 👋</h3>
      </div> */}
      <nav className="dashboard-tabs">
        <div className="tabs-left">
          <Link to="/dashboard/assign-roles">Assign Roles</Link>
          <Link to="/dashboard/patients">Patients List</Link>
          <Link to="/dashboard/appointments">Appointments</Link>
          <Link to="/dashboard/medical-records">Medical Records</Link>
        </div>
        <div className="tabs-right">
          <Link to="/dashboard/profile" className="profile-link">
            <FontAwesomeIcon icon={faUser} className="profile-icon" />
             Profile
          </Link>
          {/* <button className="logout-btn" onClick={logout}>Logout</button> */}
          <Link to="/login" className="logout-btn" onClick={logout}>Logout</Link>
        </div>
      </nav>

      <div className="dashboard-content">
        <DashboardRoutes />
      </div>
    </div>
  );
};
