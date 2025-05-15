const getUserRole = (): string | null => {
  const token = localStorage.getItem("token");
  if (!token) return null;
  const payload = JSON.parse(atob(token.split(".")[1]));
  return payload?.role || null;
};

export default getUserRole;
