// import { useState } from 'react';
// import { useUsers } from '../../features/hooks/useUsers';
// import { updateUserRole } from '../../features/auth/api/userApi';

// const roles = ['Admin', 'Receptionist', 'Lab Technician', 'Doctor'];

// const AssignRoles = () => {
//   const { users, loading, error } = useUsers();
//   const [updatedRoles, setUpdatedRoles] = useState<Record<string, string>>({});
//   const [message, setMessage] = useState('');

//   // Removed previous useEffect since useUsers handles it

//   const handleRoleChange = (userId: number, newRole: string) => {
//     setUpdatedRoles(prev => ({ ...prev, [userId]: newRole }));
//   };

//   const handleUpdate = async (userId: number) => {
//     const newRole = updatedRoles[userId];
//     if (!newRole) return;
//     const user = users.find(u => u.id === userId);
//     const username = user?.name || 'Unknown';

//     try {
//       await updateUserRole(userId, newRole);
//       setMessage(`Role updated for user ${username}`);
//     } catch {
//       setMessage('Failed to update role.');
//     }
//   };

//   return (
//     <div className="assign-roles-container">
//       <h2>Assign Roles</h2>
//       {message && <div className="info-message">{message}</div>}
//       {loading ? (
//         <div>Loading users...</div>
//       ) : (
//         <table className="roles-table">
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Current Role</th>
//               <th>Change Role</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {users.map(user => (
//               <tr key={user.id}>
//                 <td>{user.name}</td>
//                 <td>{user.email}</td>
//                 <td>{user.role}</td>
//                 <td>
//                   <select
//                     value={updatedRoles[user.id] || user.role}
//                     onChange={e => handleRoleChange(user.id, e.target.value)}
//                   >
//                     {roles.map(roleOption => (
//                       <option key={roleOption} value={roleOption}>
//                         {roleOption}
//                       </option>
//                     ))}
//                   </select>
//                 </td>
//                 <td>
//                   <button onClick={() => handleUpdate(user.id)}>Update</button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default AssignRoles;









import { useState } from 'react';
import { updateUserRole } from '../../features/auth/api/userApi';
import './AssignRoles.css';
import useUsers from '../../features/hooks/useUsers';

const AssignRoles = () => {
  const { users, roles, loading, error } = useUsers();
  const [updatedRoles, setUpdatedRoles] = useState<Record<string, string>>({});
  const [message, setMessage] = useState('');

  // if (role !== 'Admin') {
  //   return <Navigate to="/unauthorized" />;
  // }

  const handleRoleChange = (userId: number, newRole: string) => {
    setUpdatedRoles(prev => ({ ...prev, [userId]: newRole }));
  };

  const handleUpdate = async (userId: number) => {
    const newRole = updatedRoles[userId];
    console.log('New role:', newRole);
    if (!newRole) return;

    const user = users.find(u => u.id === userId);
    const username = user?.name || 'Unknown';
    console.log('Username:', username);

    try {
      await updateUserRole(userId, newRole);
      setMessage(`Role updated for user ${username}`);
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
      )}
    </div>
  );
};

export default AssignRoles;