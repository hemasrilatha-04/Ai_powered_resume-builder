import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const resumeAPI = {
  // Get all resumes
  getAllResumes: () => api.get('/resumes/'),

  // Get single resume
  getResume: (id) => api.get(`/resumes/${id}/`),

  // Create new resume
  createResume: (resumeData) => api.post('/resumes/', resumeData),

  // Update resume
  updateResume: (id, resumeData) => api.put(`/resumes/${id}/`, resumeData),

  // Delete resume
  deleteResume: (id) => api.delete(`/resumes/${id}/`),
};

export default api;
