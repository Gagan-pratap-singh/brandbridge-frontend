import API_BASE_URL from "./api";

function getToken() {
  return localStorage.getItem("token");
}

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});


// ==========================
// Apply to Campaign (Influencer)
// ==========================
export async function applyToCampaign(
  campaignId: number,
  message: string
) {
  const res = await fetch(
    `${API_BASE_URL}/applications/${campaignId}`,
    {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ message }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Failed to apply");
  }

  return data;
}


// ==========================
// Influencer: My Applications
// ==========================
export async function getMyApplications() {
  const res = await fetch(`${API_BASE_URL}/applications/my`, {
    headers: headers(),
  });

  if (!res.ok) {
    throw new Error("Failed to load applications");
  }

  return res.json();
}

// ==========================
// Brand: Get Applications
// ==========================
export async function getBrandApplications() {
  const res = await fetch(`${API_BASE_URL}/applications/brand`, {
    headers: headers(),
  });

  if (!res.ok) {
    throw new Error("Failed to load applications");
  }

  return res.json();
}


// ==========================
// Accept Application
// ==========================
export async function acceptApplication(id: number) {
  const res = await fetch(
    `${API_BASE_URL}/applications/${id}/accept`,
    {
      method: "PUT",
      headers: headers(),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Failed to accept");
  }

  return data;
}


// ==========================
// Reject Application
// ==========================
export async function rejectApplication(id: number) {
  const res = await fetch(
    `${API_BASE_URL}/applications/${id}/reject`,
    {
      method: "PUT",
      headers: headers(),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Failed to reject");
  }

  return data;
}

export async function updateApplicationStatus(
  id: number,
  action: "accept" | "reject"
) {
  const res = await fetch(
    `${API_BASE_URL}/applications/${id}/${action}`,
    {
      method: "PUT",
      headers: headers(),
    }
  );

  if (!res.ok) {
    const error = await res.json();
    throw new Error(error.detail || "Failed to update status");
  }

  return res.json();
}