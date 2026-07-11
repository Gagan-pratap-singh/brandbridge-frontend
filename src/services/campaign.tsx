import API_BASE_URL from "./api";


function getToken() {
  return localStorage.getItem("token");
}

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// ==========================
// Get All Campaigns
// ==========================
export async function getCampaigns() {
  const res = await fetch(`${API_BASE_URL}/campaigns`, {
    headers: headers(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch campaigns");
  }

  return res.json();
}

// ==========================
// Get My Campaigns
// ==========================
export async function getMyCampaigns() {
  const res = await fetch(`${API_BASE_URL}/campaigns/my`, {
    headers: headers(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch your campaigns");
  }

  return res.json();
}

// ==========================
// Get Campaign By ID
// ==========================
export async function getCampaignById(id: number) {
  const res = await fetch(`${API_BASE_URL}/campaigns/${id}`, {
    headers: headers(),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Failed to fetch campaign");
  }

  return res.json();
}

// ==========================
// Create Campaign
// ==========================
export async function createCampaign(data: {
  title: string;
  description: string;
  category: string;
  budget: number;
  requirements: string;
  deadline: string;
}) {
  const res = await fetch(`${API_BASE_URL}/campaigns`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Failed to create campaign");
  }

  return res.json();
}

// ==========================
// Update Campaign
// ==========================
export async function updateCampaign(
  id: number,
  data: {
    title: string;
    description: string;
    category: string;
    budget: number;
    requirements: string;
    deadline: string;
  }
) {
  const res = await fetch(`${API_BASE_URL}/campaigns/${id}`, {
    method: "PUT",
    headers: headers(),
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Failed to update campaign");
  }

  return res.json();
}

// ==========================
// Delete Campaign
// ==========================
export async function deleteCampaign(id: number) {
  const res = await fetch(`${API_BASE_URL}/campaigns/${id}`, {
    method: "DELETE",
    headers: headers(),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail || "Failed to delete campaign");
  }

  return res.json();
}
export async function updateCampaignStatus(
  id: number,
  isActive: boolean
) {
  const res = await fetch(
    `${API_BASE_URL}/campaigns/${id}/status?is_active=${isActive}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to update campaign");
  }

  return res.json();
}