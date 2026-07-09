import API_BASE_URL from "./api";

const getToken = () => localStorage.getItem("token");

export const getBrandProfile = async () => {
  const response = await fetch(`${API_BASE_URL}/brands/profile`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch profile");
  }

  return response.json();
};

export const createBrandProfile = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/brands/profile`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to create profile");
  }

  return response.json();
};

export const updateBrandProfile = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/brands/profile`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getToken()}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update profile");
  }

  return response.json();
};