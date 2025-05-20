import { Link, Outlet, Routes, Route } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import './Dashboard.css';
import AssignRoles from '../AssignRoles/AssignRoles';
import Patients from '../Patients/Patients';
import Appointments from '../Appointments/Appointments';
import MedicalRecords from '../MedicalRecords/MedicalRecords';

export const Dashboard = () => {
  return (
    <div className="dashboard-container">
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
        </div>
      </nav>
      <div className="dashboard-content">
        <Routes>
          <Route path="assign-roles" element={<AssignRoles />} />
          <Route path="patients" element={<Patients />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="medical-records" element={<MedicalRecords />} />
        </Routes>
      </div>
    </div>
  );
};
