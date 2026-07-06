import API_BASE_URL from "./api";

function getToken() {
  return localStorage.getItem("token");
}

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// =====================================
// Send Invitation
// =====================================
export async function sendInvitation(
  campaignId: number,
  influencerId: number,
  message: string
) {
  const res = await fetch(
    `${API_BASE_URL}/invitations`,
    {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        campaign_id: campaignId,
        influencer_id: influencerId,
        message,
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Failed to send invitation");
  }

  return data;
}

// =====================================
// Brand Invitations
// =====================================
export async function getBrandInvitations() {
  const res = await fetch(
    `${API_BASE_URL}/invitations/brand`,
    {
      headers: headers(),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load invitations");
  }

  return res.json();
}

// =====================================
// Influencer Invitations
// =====================================
export async function getInfluencerInvitations() {
  const res = await fetch(
    `${API_BASE_URL}/invitations/influencer`,
    {
      headers: headers(),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load invitations");
  }

  return res.json();
}

// =====================================
// Accept / Reject
// =====================================
export async function updateInvitation(
  invitationId: number,
  status: "accepted" | "rejected"
) {
  const res = await fetch(
    `${API_BASE_URL}/invitations/${invitationId}`,
    {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify({
        status,
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Failed");
  }

  return data;
}