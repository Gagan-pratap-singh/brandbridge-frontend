import API_BASE_URL from "./api";

const getToken = () => localStorage.getItem("token");

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// ==============================
// Get Current User
// ==============================
export const getSettings = async () => {
  const response = await fetch(`${API_BASE_URL}/settings/me`, {
    headers: headers(),
  });

  if (!response.ok) {
    throw new Error("Failed to load settings");
  }

  return response.json();
};

// ==============================
// Update Profile
// ==============================
export const updateSettings = async (data: {
  name: string;
  email: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/settings/profile`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Failed to update profile");
  }

  return result;
};

// ==============================
// Change Password
// ==============================
export const changePassword = async (data: {
  current_password: string;
  new_password: string;
}) => {
  const response = await fetch(`${API_BASE_URL}/settings/password`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(data),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Failed to change password");
  }

  return result;
};

// ==============================
// Delete Account
// ==============================
export const deleteAccount = async () => {
  const response = await fetch(`${API_BASE_URL}/settings/account`, {
    method: "DELETE",
    headers: headers(),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Failed to delete account");
  }

  return result;
};