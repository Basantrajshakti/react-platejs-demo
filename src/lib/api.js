// API configuration
const API_URL = import.meta.env.PUBLIC_API_URL || 'http://localhost:3001';

export const apiClient = {
  baseURL: API_URL,

  // Helper method for making API calls
  async request(endpoint, options = {}) {
    const url = `${API_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    return response;
  },

  // AI Copilot endpoint
  async aiCopilot(data) {
    return this.request('/api/ai/copilot', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },

  // AI Command endpoint
  async aiCommand(data) {
    return this.request('/api/ai/command', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  },
};

export default apiClient;
