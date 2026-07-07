import API_BASE_URL from "./api";

let socket: WebSocket | null = null;

function getToken() {
  return localStorage.getItem("token");
}

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

export function connectSocket(userId: number) {
  if (
    socket &&
    (socket.readyState === WebSocket.OPEN ||
      socket.readyState === WebSocket.CONNECTING)
  ) {
    return socket;
  }

  socket = new WebSocket(
    `ws://localhost:8000/ws/chat/${userId}`
  );

  socket.onclose = () => {
    console.log("Chat socket disconnected, retrying in 3s");
    setTimeout(() => connectSocket(userId), 3000);
  };

  socket.onerror = (err) => {
    console.error("Chat socket error:", err);
  };

  return socket;
}

export function getSocket() {
  return socket;
}

export async function getConversations(
  search?: string
) {
  let url = `${API_BASE_URL}/messages`;

  if (search) {
    url += `?search=${encodeURIComponent(search)}`;
  }

  const res = await fetch(url, {
    headers: headers(),
  });

  if (!res.ok) {
    throw new Error(
      "Failed to load conversations"
    );
  }

  return res.json();
}

export async function getChat(
  userId: number
) {
  const res = await fetch(
    `${API_BASE_URL}/messages/chat/${userId}`,
    {
      headers: headers(),
    }
  );

  if (!res.ok) {
    throw new Error(
      "Failed to load chat"
    );
  }

  return res.json();
}

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
    throw new Error(
      data.detail ||
        "Failed to send message"
    );
  }

  return data;
}

// ===============================
// Upload File / Image
// ===============================
export async function uploadMessageFile(
  receiverId: number,
  file: File,
  campaignId?: number
) {
  const formData = new FormData();
  formData.append("receiver_id", String(receiverId));
  if (campaignId) {
    formData.append("campaign_id", String(campaignId));
  }
  formData.append("file", file);

  const res = await fetch(`${API_BASE_URL}/messages/upload`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
    body: formData,
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.detail || "Failed to upload file");
  }

  return data;
}