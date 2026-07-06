import API_BASE_URL from "./api";

// -------------------------
// LOGIN USER
// -------------------------
export async function loginUser(email: string, password: string) {
  const formData = new URLSearchParams();

  formData.append("username", email);
  formData.append("password", password);

  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: formData,
  });

  // 🔥 Better error handling (IMPORTANT)
  let data;
  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.detail || "Invalid email or password");
  }

  return data;
}

// -------------------------
// REGISTER USER
// -------------------------
export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
  role: string;
}) {
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  let result;
  try {
    result = await response.json();
  } catch {
    result = null;
  }

  if (!response.ok) {
    throw new Error(result?.detail || "Registration failed");
  }

  return result;
}