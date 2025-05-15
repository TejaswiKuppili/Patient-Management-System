import axios from "axios";
import { User } from "../types";

let mockUsers: User[] = [
  { id: 1, name: "Aditya Malluvalasa", email: "aditya@c9.com", role: "Admin" },
  {
    id: 2,
    name: "Tejaswi Kuppili",
    email: "tejaswi@c9.com",
    role: "Admin",
  },
  {
    id: 3,
    name: "Pranitha Alluri",
    email: "pranitha@c9.com",
    role: "Receptionist",
  },
  {
    id: 4,
    name: "Swarna Bandela",
    email: "swarna@c9.com",
    role: "Lab Technician",
  },
];
export const fetchUsers = async (): Promise<User[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...mockUsers]);
    }, 500); // simulate delay
  });
  //   const response = await axios.get("/api/users");
  //   return response.data;
};

//API call to update user role
// export const updateUserRole = async (
//   id: number,
//   newRole: string
// ): Promise<void> => {
//   await axios.put(`/api/users/${id}/role`, { role: newRole });
// };

// Mock API call to update user role
export const updateUserRole = async (
  userId: number,
  newRole: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = mockUsers.findIndex((user) => user.id === userId);
      if (index !== -1) {
        mockUsers[index].role = newRole;
        resolve();
      } else {
        reject("User not found");
      }
    }, 300); // simulate delay
  });
};
