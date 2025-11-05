import React, { useState } from 'react';
import AISuggestions from '../AISuggestions';
import './ResumeForm.css';

const ResumeForm = ({ onDataChange, resumeData }) => {
  const [activeSection, setActiveSection] = useState('personal');

  const handleInputChange = (section, field, value) => {
    onDataChange({
      ...resumeData,
      [section]: {
        ...resumeData[section],
        [field]: value
      }
    });
  };

  const addItem = (section, item) => {
    onDataChange({
      ...resumeData,
      [section]: [
        ...(resumeData[section] || []),
        { ...item, id: Date.now() }
      ]
    });
  };

  const updateItem = (section, id, field, value) => {
    onDataChange({
      ...resumeData,
      [section]: resumeData[section].map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    });
  };

  const removeItem = (section, id) => {
    onDataChange({
      ...resumeData,
      [section]: resumeData[section].filter(item => item.id !== id)
    });
  };

  const renderPersonalInfo = () => (
    <div className="form-section">
      <h3>Personal Information</h3>
      <div className="form-grid">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            value={resumeData.personal?.name || ''}
            onChange={(e) => handleInputChange('personal', 'name', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={resumeData.personal?.email || ''}
            onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            value={resumeData.personal?.phone || ''}
            onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <input
            type="text"
            value={resumeData.personal?.location || ''}
            onChange={(e) => handleInputChange('personal', 'location', e.target.value)}
          />
        </div>
        <div className="form-group full-width">
          <label>Professional Summary</label>
          <textarea
            value={resumeData.personal?.summary || ''}
            onChange={(e) => handleInputChange('personal', 'summary', e.target.value)}
            rows="4"
          />
          <AISuggestions 
            text={resumeData.personal?.summary || ''} 
            section="summary"
            onSuggestionSelect={(suggestion) => 
              handleInputChange('personal', 'summary', suggestion)
            }
          />
        </div>
      </div>
    </div>
  );

  const renderExperience = () => (
    <div className="form-section">
      <h3>Work Experience</h3>
      {resumeData.experience?.map((exp, index) => (
        <div key={exp.id} className="item-card">
          <div className="form-grid">
            <div className="form-group">
              <label>Job Title</label>
              <input
                type="text"
                value={exp.title || ''}
                onChange={(e) => updateItem('experience', exp.id, 'title', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Company</label>
              <input
                type="text"
                value={exp.company || ''}
                onChange={(e) => updateItem('experience', exp.id, 'company', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Start Date</label>
              <input
                type="month"
                value={exp.startDate || ''}
                onChange={(e) => updateItem('experience', exp.id, 'startDate', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="month"
                value={exp.endDate || ''}
                onChange={(e) => updateItem('experience', exp.id, 'endDate', e.target.value)}
                placeholder="Present"
              />
            </div>
            <div className="form-group full-width">
              <label>Description</label>
              <textarea
                value={exp.description || ''}
                onChange={(e) => updateItem('experience', exp.id, 'description', e.target.value)}
                rows="3"
              />
              <AISuggestions 
                text={exp.description || ''} 
                section="experience"
                context={{ title: exp.title, company: exp.company }}
                onSuggestionSelect={(suggestion) => 
                  updateItem('experience', exp.id, 'description', suggestion)
                }
              />
            </div>
          </div>
          <button 
            className="btn btn-danger"
            onClick={() => removeItem('experience', exp.id)}
          >
            Remove
          </button>
        </div>
      ))}
      <button 
        className="btn btn-secondary"
        onClick={() => addItem('experience', {
          title: '',
          company: '',
          startDate: '',
          endDate: '',
          description: ''
        })}
      >
        Add Experience
      </button>
    </div>
  );

  const renderEducation = () => (
    <div className="form-section">
      <h3>Education</h3>
      {resumeData.education?.map((edu, index) => (
        <div key={edu.id} className="item-card">
          <div className="form-grid">
            <div className="form-group">
              <label>School/University</label>
              <input
                type="text"
                value={edu.school || ''}
                onChange={(e) => updateItem('education', edu.id, 'school', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Degree</label>
              <input
                type="text"
                value={edu.degree || ''}
                onChange={(e) => updateItem('education', edu.id, 'degree', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Field of Study</label>
              <input
                type="text"
                value={edu.field || ''}
                onChange={(e) => updateItem('education', edu.id, 'field', e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Graduation Year</label>
              <input
                type="number"
                value={edu.year || ''}
                onChange={(e) => updateItem('education', edu.id, 'year', e.target.value)}
              />
            </div>
          </div>
          <button 
            className="btn btn-danger"
            onClick={() => removeItem('education', edu.id)}
          >
            Remove
          </button>
        </div>
      ))}
      <button 
        className="btn btn-secondary"
        onClick={() => addItem('education', {
          school: '',
          degree: '',
          field: '',
          year: ''
        })}
      >
        Add Education
      </button>
    </div>
  );

  const renderSkills = () => (
    <div className="form-section">
      <h3>Skills</h3>
      <div className="form-group">
        <label>Add Skills (comma separated)</label>
        <input
          type="text"
          placeholder="e.g., JavaScript, React, Python, Project Management"
          value={resumeData.skills ? resumeData.skills.join(', ') : ''}
          onChange={(e) => handleInputChange('skills', 'list', e.target.value.split(',').map(skill => skill.trim()))}
        />
      </div>
    </div>
  );

  return (
    <div className="resume-form">
      <div className="form-sections">
        <button 
          className={`section-tab ${activeSection === 'personal' ? 'active' : ''}`}
          onClick={() => setActiveSection('personal')}
        >
          Personal Info
        </button>
        <button 
          className={`section-tab ${activeSection === 'experience' ? 'active' : ''}`}
          onClick={() => setActiveSection('experience')}
        >
          Experience
        </button>
        <button 
          className={`section-tab ${activeSection === 'education' ? 'active' : ''}`}
          onClick={() => setActiveSection('education')}
        >
          Education
        </button>
        <button 
          className={`section-tab ${activeSection === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveSection('skills')}
        >
          Skills
        </button>
      </div>

      <div className="form-content">
        {activeSection === 'personal' && renderPersonalInfo()}
        {activeSection === 'experience' && renderExperience()}
        {activeSection === 'education' && renderEducation()}
        {activeSection === 'skills' && renderSkills()}
      </div>
    </div>
  );
};

export default ResumeForm;