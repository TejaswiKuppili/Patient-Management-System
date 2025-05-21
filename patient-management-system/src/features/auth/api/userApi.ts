import apiClient from "./apiClient";
import { UsersWithRoles } from "../types";

//API call to fetch users with roles
export const fetchUsersWithRoles = async (): Promise<UsersWithRoles> => {
  const response = await apiClient.get<UsersWithRoles>("/api/users/with-roles");
  return response.data;
};

//API call to add a new user
export const addUser = async (user: {
  name: string;
  email: string;
  role: string;
}) => {
  const payload = {
    Name: user.name,
    Email: user.email,
    RoleName: user.role,
  };
  console.log("Adding user:", user);
  console.log("Adding user:", payload);
  const response = await apiClient.post("/api/users", payload);
  return response.data;
};

//API call to update user role
export const updateUserRole = async (
  userId: number,
  newRole: string
): Promise<void> => {
  console.log("Updating user role:", userId, newRole);
  await apiClient.put(`/api/users/with-roles/${userId}/role`, {
    role: newRole,
  });
};
