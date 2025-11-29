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
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'An error occurred' }));
      console.error(`[API] Request failed: ${response.status}`, errorData);
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    console.log(`[API] Request successful: ${url}`, data);
    return data;
  } catch (error) {
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

