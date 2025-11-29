// API service for backend communication
// In development: uses proxy from package.json (empty string = same origin via proxy)
// In production: uses relative URLs (same port as backend)
const getApiBaseUrl = () => {
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  // In development, proxy handles it (empty string = relative URL via proxy)
  // In production (when served from backend), use relative URLs
  return ''; // Use proxy in dev, relative URLs in production
};

const API_BASE_URL = getApiBaseUrl();

/**
 * Generic API request handler
 */
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    console.log(`[API] Making request to: ${url}`, config.method || 'GET');
    const response = await fetch(url, config);
    
    // Check if response has content before parsing
    const contentType = response.headers.get('content-type');
    const text = await response.text();
    
    if (!response.ok) {
      // Try to parse as JSON, but handle non-JSON responses
      let errorData;
      try {
        errorData = text ? JSON.parse(text) : { message: 'An error occurred' };
      } catch {
        // If response is HTML (like a 404 page) or empty, provide a helpful message
        if (response.status === 404) {
          errorData = { 
            message: 'API endpoint not found. Please make sure the backend server is deployed and running.' 
          };
        } else if (response.status >= 500) {
          errorData = { 
            message: 'Server error. Please try again later.' 
          };
        } else {
          errorData = { 
            message: `Request failed with status ${response.status}. The backend may not be available.` 
          };
        }
      }
      console.error(`[API] Request failed: ${response.status}`, errorData);
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    // Parse response as JSON, handle empty responses
    if (!text || text.trim() === '') {
      // Some endpoints might return empty responses (like 204 No Content)
      return null;
    }
    
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error(`[API] Failed to parse JSON response from ${url}:`, parseError);
      throw new Error('Invalid response from server. The backend may not be properly configured.');
    }
    
    console.log(`[API] Request successful: ${url}`, data);
    return data;
  } catch (error) {
    // Handle network errors and provide user-friendly messages
    if (error.name === 'TypeError' && error.message.includes('fetch')) {
      console.error(`[API] Network error for ${url}:`, error);
      throw new Error('Cannot connect to the server. Please check if the backend API is deployed and accessible.');
    }
    console.error(`[API] Request error for ${url}:`, error);
    throw error;
  }
}

// Projects API
export const projectsAPI = {
  getAll: () => apiRequest('/api/projects'),
  getById: (id) => apiRequest(`/api/projects/${id}`),
  create: (data) => apiRequest('/api/projects', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/api/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/api/projects/${id}`, {
    method: 'DELETE',
  }),
};

// Services API
export const servicesAPI = {
  getAll: () => apiRequest('/api/services'),
  getById: (id) => apiRequest(`/api/services/${id}`),
  create: (data) => apiRequest('/api/services', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/api/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/api/services/${id}`, {
    method: 'DELETE',
  }),
  deleteAll: () => apiRequest('/api/services', {
    method: 'DELETE',
  }),
};

// Contacts API
export const contactsAPI = {
  getAll: () => apiRequest('/api/contacts'),
  getById: (id) => apiRequest(`/api/contacts/${id}`),
  create: (data) => apiRequest('/api/contacts', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/api/contacts/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/api/contacts/${id}`, {
    method: 'DELETE',
  }),
};

// Users API
export const usersAPI = {
  getAll: () => apiRequest('/api/users'),
  getById: (id) => apiRequest(`/api/users/${id}`),
  create: (data) => apiRequest('/api/users', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/api/users/${id}`, {
    method: 'DELETE',
  }),
  deleteAll: () => apiRequest('/api/users', {
    method: 'DELETE',
  }),
};

const api = {
  projects: projectsAPI,
  services: servicesAPI,
  contacts: contactsAPI,
  users: usersAPI,
};

export default api;

