import API_BASE_URL from "./api";

function getToken() {
  return localStorage.getItem("token");
}

const headers = {
  Authorization: `Bearer ${getToken()}`,
};

export async function getInfluencerDashboard() {
  const res = await fetch(
    `${API_BASE_URL}/dashboard/influencer`,
    { headers }
  );

  if (!res.ok) throw new Error("Dashboard failed");

  return res.json();
}

export async function getInfluencerChart() {
  const res = await fetch(
    `${API_BASE_URL}/dashboard/influencer/chart`,
    { headers }
  );

  if (!res.ok) throw new Error("Chart failed");

  return res.json();
}

export async function getAcceptanceRate() {
  const res = await fetch(
    `${API_BASE_URL}/dashboard/influencer/acceptance-rate`,
    { headers }
  );

  if (!res.ok) throw new Error("Rate failed");

  return res.json();
}

export async function getRecentCampaigns() {
  const res = await fetch(
    `${API_BASE_URL}/dashboard/influencer/recent-campaigns`,
    { headers }
  );

  if (!res.ok) throw new Error("Campaigns failed");

  return res.json();
}