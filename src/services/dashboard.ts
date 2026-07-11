import API_BASE_URL from "./api";

function getToken() {
  return localStorage.getItem("token");
}

const headers = () => ({
  Authorization: `Bearer ${getToken()}`,
});

export async function getBrandDashboard() {
  const response = await fetch(
    `${API_BASE_URL}/dashboard/brand`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load dashboard");
  }

  return response.json();
}

export async function getInfluencerDashboard() {
  const res = await fetch(
    `${API_BASE_URL}/dashboard/influencer`,
    {
      headers: headers(),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load dashboard");
  }

  return res.json();
}
export async function getMonthlyApplications() {
  const response = await fetch(
    `${API_BASE_URL}/dashboard/brand/chart`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to load chart");
  }

  return response.json();
}

export async function getRecentApplications() {
  const response = await fetch(
    `${API_BASE_URL}/dashboard/brand/recent-applications`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch applications");
  }

  return response.json();
}

export async function getTopInfluencers() {
  const response = await fetch(
    `${API_BASE_URL}/dashboard/brand/top-influencers`,
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch influencers");
  }

  return response.json();
}