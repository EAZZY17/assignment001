// Connection test utility to verify backend is accessible
import { projectsAPI } from '../services/api';

export const testBackendConnection = async () => {
  try {
    const response = await fetch('/api/projects');
    if (response.ok) {
      return { connected: true, message: 'Backend connected successfully' };
    }
    return { connected: false, message: `Backend responded with status: ${response.status}` };
  } catch (error) {
    return { connected: false, message: `Connection failed: ${error.message}` };
  }
};

export const checkBackendHealth = async () => {
  try {
    const response = await fetch('/');
    if (response.ok) {
      const data = await response.json();
      return { healthy: true, message: data.message || 'Backend is running' };
    }
    return { healthy: false, message: 'Backend health check failed' };
  } catch (error) {
    return { healthy: false, message: `Health check failed: ${error.message}` };
  }
};

