import API_BASE_URL from "./api";

function getToken() {
  return localStorage.getItem("token");
}

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// Get Brand by User ID
export async function getBrandByUserId(userId: number) {
  const res = await fetch(
    `${API_BASE_URL}/brands/${userId}`,
    {
      headers: headers(),
    }
  );

  if (!res.ok) {
    throw new Error("Brand not found");
  }

  return res.json();
}

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
// ==========================================
// Upload Brand Logo
// ==========================================
export async function uploadBrandLogo(file: File) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    `${API_BASE_URL}/upload/brand/logo`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload logo");
  }

  return response.json();
}


// ==========================================
// Upload Brand Cover
// ==========================================
export async function uploadBrandCover(file: File) {
  const formData = new FormData();

  formData.append("file", file);

  const response = await fetch(
    `${API_BASE_URL}/upload/brand/cover`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Failed to upload cover");
  }

  return response.json();
}