import { useEffect, useState } from 'react';
import { fetchUsers, updateUserRole } from '../../api/userApi';
import { User } from '../../types';
import './AssignRoles.css';
import { Navigate } from 'react-router-dom';
import getUserRole from '../../../../utils/auth';

const roles = ['Admin', 'Receptionist', 'Lab Technician', 'Doctor'];

const AssignRoles = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [updatedRoles, setUpdatedRoles] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const role = getUserRole();

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      try {
        const data = await fetchUsers();
        setUsers(data);
      } catch (err) {
        setMessage('Failed to load users.');
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

//   if (role !== 'Admin') {
//     return <Navigate to="/unauthorized" />;
//   }

  const handleRoleChange = (userId: number, newRole: string) => {
    setUpdatedRoles(prev => ({ ...prev, [userId]: newRole }));
  };

  const handleUpdate = async (userId: number) => {
    const newRole = updatedRoles[userId];
    if (!newRole) return;
    try {
      await updateUserRole(userId, newRole);
      setUsers(prev =>
        prev.map(user =>
          user.id === userId ? { ...user, role: newRole } : user
        )
      );
      setMessage(`Role updated for user ${userId}`);
    } catch {
      setMessage('Failed to update role.');
    }
  };

  return (
    <div className="assign-roles-container">
      <h2>Assign Roles</h2>
      {message && <div className="info-message">{message}</div>}
      {loading ? (
        <div>Loading users...</div>
      ) : (
        <table className="roles-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Change Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <select
                    value={updatedRoles[user.id] || user.role}
                    onChange={e => handleRoleChange(user.id, e.target.value)}
                  >
                    {roles.map(roleOption => (
                      <option key={roleOption} value={roleOption}>
                        {roleOption}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <button onClick={() => handleUpdate(user.id)}>Update</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AssignRoles;