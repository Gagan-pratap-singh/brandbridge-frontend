import API_BASE_URL from "./api";

function getToken() {
  return localStorage.getItem("token");
}

const headers = () => ({
  Authorization: `Bearer ${getToken()}`,
});

export async function getBrandDashboard() {
  const res = await fetch(
    `${API_BASE_URL}/dashboard/brand`,
    {
      headers: headers(),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load dashboard");
  }

  return res.json();
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