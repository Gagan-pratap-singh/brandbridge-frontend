import API_BASE_URL from "./api";

function getToken() {
  return localStorage.getItem("token");
}

const headers = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// ======================================
// Create Profile
// ======================================
export async function createProfile(data: any) {
  const res = await fetch(
    `${API_BASE_URL}/influencers/profile`,
    {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(data),
    }
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.detail || "Failed to create profile"
    );
  }

  return result;
}

// ======================================
// Update Profile
// ======================================
export async function updateProfile(data: any) {
  const res = await fetch(
    `${API_BASE_URL}/influencers/profile`,
    {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(data),
    }
  );

  const result = await res.json();

  if (!res.ok) {
    throw new Error(
      result.detail || "Failed to update profile"
    );
  }

  return result;
}

// ======================================
// Get My Profile
// ======================================
export async function getMyProfile() {
  const res = await fetch(
    `${API_BASE_URL}/influencers/profile/me`,
    {
      headers: headers(),
    }
  );

  if (!res.ok) {
    throw new Error("Profile not found");
  }

  return res.json();
}

// ======================================
// Check Profile Exists
// ======================================
export async function profileExists() {
  const res = await fetch(
    `${API_BASE_URL}/influencers/profile/exists`,
    {
      headers: headers(),
    }
  );

  if (!res.ok) {
    throw new Error("Failed");
  }

  return res.json();
}

// ======================================
// Get Influencer By User ID
// ======================================
export async function getInfluencer(
  userId: number
) {
  const res = await fetch(
    `${API_BASE_URL}/influencers/${userId}`,
    {
      headers: headers(),
    }
  );

  if (!res.ok) {
    throw new Error("Influencer not found");
  }

  return res.json();
}

// ======================================
// Discover Influencers
// ======================================
export async function discoverInfluencers(
  params?: {
    search?: string;
    niche?: string;
    location?: string;
    min_followers?: number;
    min_engagement?: number;
    sort?: string;
    page?: number;
    limit?: number;
  }
) {
  const query = new URLSearchParams();

  if (params?.search)
    query.append(
      "search",
      params.search
    );

  if (params?.niche)
    query.append(
      "niche",
      params.niche
    );

  if (params?.location)
    query.append(
      "location",
      params.location
    );

  if (params?.min_followers)
    query.append(
      "min_followers",
      String(params.min_followers)
    );

  if (params?.min_engagement)
    query.append(
      "min_engagement",
      String(params.min_engagement)
    );

  if (params?.sort)
    query.append(
      "sort",
      params.sort
    );

  if (params?.page)
    query.append(
      "page",
      String(params.page)
    );

  if (params?.limit)
    query.append(
      "limit",
      String(params.limit)
    );

  const res = await fetch(
    `${API_BASE_URL}/influencers?${query.toString()}`,
    {
      headers: headers(),
    }
  );

  if (!res.ok) {
    throw new Error(
      "Failed to load influencers"
    );
  }

  return res.json();
}