const API_URL = "http://localhost:5000/api";

// Generic API call
export const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "API Error");
    }

    return data;
  } catch (error) {
    console.error(`API Error (${endpoint}):`, error);
    throw error;
  }
};

// Specific API calls
export const authAPI = {
  sendOTP: (phone) =>
    apiCall("/otp/send", {
      method: "POST",
      body: JSON.stringify({ phone }),
    }),

  verifyOTP: (phone, otp) =>
    apiCall("/otp/verify", {
      method: "POST",
      body: JSON.stringify({ phone, otp }),
    }),

  getProfile: () => apiCall("/auth/me"),

  updateProfile: (data) =>
    apiCall("/otp/update-profile", {
      method: "PUT",
      body: JSON.stringify(data),
    }),
};

export const jobsAPI = {
  getJobs: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return apiCall(`/jobs${query ? `?${query}` : ""}`);
  },

  createJob: (data) =>
    apiCall("/jobs", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
