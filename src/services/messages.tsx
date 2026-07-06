import API_BASE_URL from "./api";

function getToken() {
  return localStorage.getItem("token");
}

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// ===============================
// Get Conversation List
// ===============================
export async function getConversations(search?: string) {
  let url = `${API_BASE_URL}/messages`;

  if (search) {
    url += `?search=${encodeURIComponent(search)}`;
  }

  const res = await fetch(url, {
    headers: headers(),
  });

  if (!res.ok) {
    throw new Error("Failed to load conversations");
  }

  return res.json();
}

// ===============================
// Get Chat
// ===============================
export async function getChat(userId: number) {
  const res = await fetch(
    `${API_BASE_URL}/messages/chat/${userId}`,
    {
      headers: headers(),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to load chat");
  }

  return res.json();
}

// ===============================
// Send Message
// ===============================
export async function sendMessage(
  receiverId: number,
  message: string,
  campaignId?: number
) {
  const res = await fetch(
    `${API_BASE_URL}/messages`,
    {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        receiver_id: receiverId,
        campaign_id: campaignId,
        message,
      }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Failed to send message");
  }

  return data;
}

// ===============================
// Unread Count
// ===============================
export async function getUnreadCount() {
  const res = await fetch(
    `${API_BASE_URL}/messages/unread/count`,
    {
      headers: headers(),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch unread count");
  }

  return res.json();
}