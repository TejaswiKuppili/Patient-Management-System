import { useEffect, useState } from "react";
import { fetchUsersWithRoles } from "../auth/api/userApi";
import { User } from "../auth/types";

interface UsersWithRolesState {
  users: User[];
  roles: string[];
  loading: boolean;
  error: string | null;
}

const useUsers = (): UsersWithRolesState => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsersWithRoles();
        // Format the users data
        const users = data.users.map((user: any, index: number) => ({
          id: index + 1, // Fallback if there's no id from backend
          name: user.name,
          email: user.email,
          role: user.roleName, // map roleName to role
        }));

        setUsers(users);
        setRoles(data.roles);
      } catch (err) {
        setError("Failed to load users and roles.");
      } finally {
        setLoading(false);
      }
    };
    loadUsers();
  }, []);

  return { users, roles, loading, error };
};

export default useUsers;
