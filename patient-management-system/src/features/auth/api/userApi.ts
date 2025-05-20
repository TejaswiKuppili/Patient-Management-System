import apiClient from "./apiClient";
import { UsersWithRoles } from "../types";

//API call to fetch users with roles
export const fetchUsersWithRoles = async (): Promise<UsersWithRoles> => {
  const response = await apiClient.get<UsersWithRoles>("/api/users/with-roles");
  console.log("Fetched users with roles:", response.data);
  return response.data;
};

//API call to update user role
export const updateUserRole = async (
  userId: number,
  newRole: string
): Promise<void> => {
  console.log("Updating user ID:", userId);
  console.log("Payload:", newRole);
  const response = await apiClient.put(`/api/users/with-roles/${userId}/role`, {
    role: newRole,
  });
  console.log("Updated user role:", response.data);
  // return response.data;
};
