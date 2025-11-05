import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { resumeAPI } from '../../resumeService';
import ResumeForm from '../../components/ResumeForm/ResumeForm';
import ResumePreview from '../../components/ResumePreview/ResumePreview';
import './ResumeEditor.css';

const ResumeEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [resume, setResume] = useState({
    personal: {
      name: '',
      email: '',
      phone: '',
      location: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: []
  });
  const [activeTemplate, setActiveTemplate] = useState('modern');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      loadResume(id);
    }
  }, [id]);

  const loadResume = async (resumeId) => {
    try {
      const response = await resumeAPI.getResume(resumeId);
      // Transform backend data to frontend format
      const backendData = response.data;
      setResume({
        personal: {
          name: backendData.full_name || '',
          email: backendData.email || '',
          phone: backendData.phone || '',
          location: backendData.address || '',
          summary: backendData.summary || ''
        },
        experience: backendData.experience || [],
        education: backendData.education || [],
        skills: backendData.skills || []
      });
    } catch (error) {
      console.error('Error loading resume:', error);
      alert('Error loading resume');
    }
  };

  const handleResumeChange = (newResumeData) => {
    setResume(newResumeData);
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Transform frontend data to backend format
      const backendData = {
        full_name: resume.personal.name,
        email: resume.personal.email,
        phone: resume.personal.phone,
        address: resume.personal.location,
        summary: resume.personal.summary,
        skills: resume.skills,
        education: resume.education,
        experience: resume.experience,
        projects: []
      };

      if (id) {
        await resumeAPI.updateResume(id, backendData);
      } else {
        await resumeAPI.createResume(backendData);
      }

      alert('Resume saved successfully!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Error saving resume: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="resume-editor">
      <div className="editor-header">
        <h1>Resume Editor</h1>
        <div className="editor-actions">
          <button className="btn btn-primary" onClick={handleSave}>
            Save Resume
          </button>
          <select 
            value={activeTemplate} 
            onChange={(e) => setActiveTemplate(e.target.value)}
            className="template-selector"
          >
            <option value="modern">Modern</option>
            <option value="classic">Classic</option>
          </select>
        </div>
      </div>

      <div className="editor-content">
        <div className="form-section">
          <ResumeForm onDataChange={handleResumeChange} resumeData={resume} />
        </div>
        <div className="preview-section">
          <ResumePreview data={resume} template={activeTemplate} />
        </div>
      </div>
    </div>
  );
};

export default ResumeEditor;