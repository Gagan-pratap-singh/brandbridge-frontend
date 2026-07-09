import API_BASE_URL from "./api";

function getToken() {
  return localStorage.getItem("token");
}

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// =========================
// Get Notifications
// =========================
export async function getNotifications() {
  const res = await fetch(
    `${API_BASE_URL}/notifications`,
    {
      headers: headers(),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch notifications");
  }

  return res.json();
}

// =========================
// Mark One Notification Read
// =========================
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

  if (!res.ok) {
    throw new Error("Failed to mark notification as read");
  }

  return res.json();
}

// =========================
// Mark All Notifications Read
// =========================
export async function markAllAsRead() {
  const res = await fetch(
    `${API_BASE_URL}/notifications/read-all`,
    {
      method: "PUT",
      headers: headers(),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to mark all notifications");
  }

  return res.json();
}

// =========================
// Unread Count
// =========================
export async function getUnreadCount() {
  const res = await fetch(
    `${API_BASE_URL}/notifications/unread-count`,
    {
      headers: headers(),
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch unread count");
  }

  return res.json();
}