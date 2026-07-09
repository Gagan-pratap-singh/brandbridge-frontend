import API_BASE_URL from "./api";

const getToken = () => localStorage.getItem("token");

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// ========================================
// Get Current User
// ========================================
export async function getCurrentUser() {
  const response = await fetch(
    `${API_BASE_URL}/users/me`,
    {
      headers: headers(),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Failed to load user");
  }

  return result;
}

// ========================================
// Update Name & Email
// ========================================
export async function updateUser(data: any) {
  const response = await fetch(
    `${API_BASE_URL}/users/me`,
    {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Failed to update user");
  }

  return result;
}

// ========================================
// Change Password
// ========================================
export async function changePassword(data: {
  current_password: string;
  new_password: string;
}) {
  const response = await fetch(
    `${API_BASE_URL}/users/change-password`,
    {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Failed to change password");
  }

  return result;
}

// ========================================
// Delete Account
// ========================================
export async function deleteAccount() {
  const response = await fetch(
    `${API_BASE_URL}/users/me`,
    {
      method: "DELETE",
      headers: headers(),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Failed to delete account");
  }

  return result;
}