import API_BASE_URL from "./api";

function getToken() {
  return localStorage.getItem("token");
}

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

export async function getNotifications() {
  const res = await fetch(
    `${API_BASE_URL}/notifications`,
    {
      headers: headers(),
    }
  );

  return res.json();
}

export async function markAsRead(
  notificationId: number
) {
  const res = await fetch(
    `${API_BASE_URL}/notifications/${notificationId}/read`,
    {
      method: "PUT",
      headers: headers(),
    }
  );

  return res.json();
}

export async function getUnreadCount() {
  const res = await fetch(
    `${API_BASE_URL}/notifications/unread-count`,
    {
      headers: headers(),
    }
  );

  return res.json();
}