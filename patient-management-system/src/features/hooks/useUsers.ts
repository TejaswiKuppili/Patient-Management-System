import { useCallback, useEffect, useState } from "react";
import { fetchUsersWithRoles } from "../auth/api/userApi";
import { User } from "../auth/types";

interface UsersWithRolesState {
  users: User[];
  roles: string[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}
const useUsers = (): UsersWithRolesState => {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchUsersWithRoles();
      const users = data.users.map((user: any, index: number) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.roleName, // map roleName to role
      }));
      setUsers(users);
      setRoles(data.roles);
      setError(null); // Clear any previous error
    } catch (error) {
      setError("Failed to load users and roles.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  return { users, roles, loading, error, refetch: loadUsers };
};

export default useUsers;
