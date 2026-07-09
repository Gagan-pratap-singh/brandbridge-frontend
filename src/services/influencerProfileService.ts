import API_BASE_URL from "./api";

const getToken = () => localStorage.getItem("token");

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// ===================================
// Get My Profile
// ===================================
export async function getMyInfluencerProfile() {
  const response = await fetch(
    `${API_BASE_URL}/influencers/profile/me`,
    {
      headers: headers(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load profile");
  }

  return response.json();
}

// ===================================
// Create Profile
// ===================================
export async function createInfluencerProfile(data: any) {
  const response = await fetch(
    `${API_BASE_URL}/influencers/profile`,
    {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Failed to create profile");
  }

  return result;
}

// ===================================
// Update Profile
// ===================================
export async function updateInfluencerProfile(data: any) {
  const response = await fetch(
    `${API_BASE_URL}/influencers/profile`,
    {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(data),
    }
  );

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.detail || "Failed to update profile");
  }

  return result;
}

// ===================================
// Check Profile Exists
// ===================================
export async function influencerProfileExists() {
  const response = await fetch(
    `${API_BASE_URL}/influencers/profile/exists`,
    {
      headers: headers(),
    }
  );

  if (!response.ok) {
    throw new Error("Failed");
  }

  return response.json();
}