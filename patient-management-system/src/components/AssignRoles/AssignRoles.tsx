import { useEffect, useState } from 'react';
import { addUser, updateUserRole } from '../../features/auth/api/userApi';
import './AssignRoles.css';
import useUsers from '../../features/hooks/useUsers';
import Modal from '../common/Modal/Modal';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../features/hooks/useAuth';

// This component allows an admin to assign roles to users, add new users, and update existing user roles.
const AssignRoles = () => {
  const { users, roles, loading, error, refetch } = useUsers();
  const [updatedRoles, setUpdatedRoles] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');
  const[newUser, setNewUser] = useState({ name: '', email: '', role: roles[0] || '' });
  const[showAddUserForm, setShowAddUserForm] = useState(false);

  // This effect clears the message after 3 seconds.
    useEffect(() => {
      if (message) {
        const timer = setTimeout(() => setMessage(''), 3000);
        return () => clearTimeout(timer);
      }
    }, [message]);
  
  // Replace this with your actual way of getting the current user's role.
  // For example, if you have a useAuth hook:
  // const { user } = useAuth();
  // const currentRole = user?.role; 
  // console.log(currentRole);

  const currentRole = localStorage.getItem('Role');

  if (currentRole !== 'Admin') {
    return <Navigate to="/unauthorized" />;
  }

  // This function validates the new user data, calls the API to add the user, and updates the UI accordingly.
  const handleAddUser = async () => {
    try {
      if (!newUser.name || !newUser.email || !newUser.role) {
        setMessage("Please fill in all fields.");
        return;
      }
      await addUser(newUser);
      await refetch(); // refetch users after adding a new one
      setMessage(`User ${newUser.name} added successfully`);
      setNewUser({ name: '', email: '', role: roles[0] || '' });
      setShowAddUserForm(false);
    }
    catch {
      setMessage('Failed to add user.');
    }
  };

  // This function updates the state with the new role for the specified user.
  const handleRoleChange = (userId: number, newRole: string) => {
    setUpdatedRoles(prev => ({ ...prev, [userId]: newRole }));
  };

  const handleUpdate = async (userId: number) => {
    const newRole = updatedRoles[userId];
    if (!newRole) return;

    const user = users.find(u => u.id === userId);
    const username = user?.name || 'Unknown';

    try {
      await updateUserRole(userId, newRole);
      setMessage(`Role updated for user ${username}`);
    } 
    catch {
      setMessage('Failed to update role.');
    }
  };

  return (
    <div className="assign-roles-container">
      <h2>Assign Roles</h2>
      {message && <div className="info-message">{message}</div>}
      {error && <div className="error-message">{error}</div>}

      <button className="add-user-btn" onClick={() => setShowAddUserForm(true)}>Add User</button>

      {loading ? (
        <div>Loading users...</div>
      ) : (
        <div className={`users-table-scroll-wrapper ${showAddUserForm ? 'modal-open' : ''}`}>
        <table className="users-table">
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
                    value={updatedRoles[user.id] ?? user.role}
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
        </div>
      )}
      {showAddUserForm && (
        <Modal onClose={() => setShowAddUserForm(false)}>        
          <h3>Add New User</h3>
          {error && <div className="error-message">{error}</div>}
          <div className="modal-form">
            <input
              type="text"
              placeholder="Name"
              value={newUser.name}
              onChange={e => setNewUser(prev => ({ ...prev, name: e.target.value }))}
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={e => setNewUser(prev => ({ ...prev, email: e.target.value }))}
            />
            <select
              value={newUser.role}
              onChange={e => setNewUser(prev => ({ ...prev, role: e.target.value }))}
            >
              <option value="" disabled>Select Role</option>
              {roles.map(roleOption => (
                <option key={roleOption} value={roleOption}>
                  {roleOption}
                </option>
              ))}
            </select>
            <button onClick={handleAddUser}>Add User</button>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AssignRoles;