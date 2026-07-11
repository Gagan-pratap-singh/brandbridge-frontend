import API_BASE_URL from "./api";

function getToken() {
  return localStorage.getItem("token");
}

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// ======================================
// GET MY BOOKMARKS
// ======================================
export async function getBookmarks() {
  const res = await fetch(
    `${API_BASE_URL}/bookmarks/my`,
    {
      headers: headers(),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.detail || "Failed to load bookmarks"
    );
  }

  return data;
}

// ======================================
// ADD BOOKMARK
// ======================================
export async function addBookmark(
  campaignId: number
) {
  const res = await fetch(
    `${API_BASE_URL}/bookmarks/${campaignId}`,
    {
      method: "POST",
      headers: headers(),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.detail || "Failed to bookmark campaign"
    );
  }

  return data;
}

// ======================================
// REMOVE BOOKMARK
// ======================================
export async function removeBookmark(
  campaignId: number
) {
  const res = await fetch(
    `${API_BASE_URL}/bookmarks/${campaignId}`,
    {
      method: "DELETE",
      headers: headers(),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(
      data.detail || "Failed to remove bookmark"
    );
  }

  return data;
}