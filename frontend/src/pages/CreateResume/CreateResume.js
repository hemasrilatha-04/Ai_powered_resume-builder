import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { resumeAPI } from '../../resumeService';
import './CreateResume.css';

const CreateResume = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedTemplate = location.state;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    portfolio: '',
    summary: '',
    experiences: [
      {
        id: 1,
        jobTitle: '',
        company: '',
        experience: '',
        startDate: '',
        endDate: '',
        current: false
      }
    ],
    education: [
      {
        id: 1,
        school: '',
        degree: '',
        graduation: '',
        field: ''
      }
    ],
    skills: ''
  });

  const [activeTab, setActiveTab] = useState('personal');

  const handleInputChange = (e, section, id, field) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    
    setFormData(prevData => ({
      ...prevData,
      [section]: prevData[section].map(item => 
        item.id === id ? { ...item, [field]: value } : item
      )
    }));
  };

  const handleBasicInfoChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const addExperience = () => {
    setFormData(prevData => ({
      ...prevData,
      experiences: [
        ...prevData.experiences,
        {
          id: Date.now(),
          jobTitle: '',
          company: '',
          experience: '',
          startDate: '',
          endDate: '',
          current: false
        }
      ]
    }));
  };

  const removeExperience = (id) => {
    if (formData.experiences.length <= 1) return;
    
    setFormData(prevData => ({
      ...prevData,
      experiences: prevData.experiences.filter(exp => exp.id !== id)
    }));
  };

  const addEducation = () => {
    setFormData(prevData => ({
      ...prevData,
      education: [
        ...prevData.education,
        {
          id: Date.now(),
          school: '',
          degree: '',
          graduation: '',
          field: ''
        }
      ]
    }));
  };

  const removeEducation = (id) => {
    if (formData.education.length <= 1) return;
    
    setFormData(prevData => ({
      ...prevData,
      education: prevData.education.filter(edu => edu.id !== id)
    }));
  };

  // Parse skills string into an array
  const skillsArray = formData.skills
    ? formData.skills.split(',').map(skill => skill.trim()).filter(skill => skill)
    : ['JavaScript', 'HTML/CSS', 'React', 'Node.js'];

  const handleSaveResume = async () => {
    try {
      // Transform formData to backend format
      const resumeData = {
        full_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.location,
        summary: formData.summary,
        skills: skillsArray,
        education: formData.education.map(edu => ({
          degree: edu.degree,
          school: edu.school,
          field: edu.field,
          graduation: edu.graduation
        })),
        experience: formData.experiences.map(exp => ({
          title: exp.jobTitle,
          company: exp.company,
          description: exp.experience,
          start_date: exp.startDate,
          end_date: exp.current ? null : exp.endDate,
          current: exp.current
        })),
        projects: []
      };

      const response = await resumeAPI.createResume(resumeData);
      alert('Resume saved successfully!');
      navigate('/dashboard'); // Navigate to dashboard after saving
    } catch (error) {
      alert('Error saving resume: ' + error.message);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>Professional Resume Builder</h1>
        <p>Create a polished resume in minutes</p>
        {selectedTemplate && (
          <div className="selected-template-info">
            <p>Selected Template: <strong>{selectedTemplate.templateName}</strong></p>
          </div>
        )}
      </header>
      
      <ul className="nav-tabs">
        <li>
          <a 
            href="#personal" 
            className={activeTab === 'personal' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); handleTabChange('personal'); }}
          >
            Personal Info
          </a>
        </li>
        <li>
          <a 
            href="#experience" 
            className={activeTab === 'experience' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); handleTabChange('experience'); }}
          >
            Experience
          </a>
        </li>
        <li>
          <a 
            href="#education" 
            className={activeTab === 'education' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); handleTabChange('education'); }}
          >
            Education
          </a>
        </li>
        <li>
          <a 
            href="#skills" 
            className={activeTab === 'skills' ? 'active' : ''}
            onClick={(e) => { e.preventDefault(); handleTabChange('skills'); }}
          >
            Skills
          </a>
        </li>
      </ul>
      
      <div className="content">
        <div className="editor-panel">
          <h2>Enter Your Details</h2>
          
          {activeTab === 'personal' && (
            <>
              <div className="section">
                <h3>Personal Information</h3>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input 
                    type="text" 
                    id="fullName" 
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={handleBasicInfoChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={handleBasicInfoChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    placeholder="(123) 456-7890"
                    value={formData.phone}
                    onChange={handleBasicInfoChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="location">City, State</label>
                  <input 
                    type="text" 
                    id="location" 
                    placeholder="New York, NY"
                    value={formData.location}
                    onChange={handleBasicInfoChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="linkedin">LinkedIn Profile (optional)</label>
                  <input 
                    type="url" 
                    id="linkedin" 
                    placeholder="https://linkedin.com/in/username"
                    value={formData.linkedin}
                    onChange={handleBasicInfoChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="portfolio">Portfolio Website (optional)</label>
                  <input 
                    type="url" 
                    id="portfolio" 
                    placeholder="https://yourportfolio.com"
                    value={formData.portfolio}
                    onChange={handleBasicInfoChange}
                  />
                </div>
              </div>
              
              <div className="section">
                <h3>Professional Summary</h3>
                <div className="form-group">
                  <textarea 
                    id="summary" 
                    placeholder="Brief summary of your professional background and career goals"
                    value={formData.summary}
                    onChange={handleBasicInfoChange}
                  ></textarea>
                </div>
              </div>
            </>
          )}
          
          {activeTab === 'experience' && (
            <div className="section">
              <h3>
                Work Experience 
                <button 
                  type="button" 
                  className="btn-add"
                  onClick={addExperience}
                >
                  <i className="fas fa-plus"></i> Add Another
                </button>
              </h3>
              
              {formData.experiences.map((exp, index) => (
                <div key={exp.id} className="form-section">
                  {index > 0 && <hr className="section-divider" />}
                  <div className="form-group">
                    <label htmlFor={`jobTitle-${exp.id}`}>Job Title</label>
                    <input 
                      type="text" 
                      id={`jobTitle-${exp.id}`}
                      placeholder="Senior Developer"
                      value={exp.jobTitle}
                      onChange={(e) => handleInputChange(e, 'experiences', exp.id, 'jobTitle')}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor={`company-${exp.id}`}>Company</label>
                    <input 
                      type="text" 
                      id={`company-${exp.id}`}
                      placeholder="Tech Solutions Inc."
                      value={exp.company}
                      onChange={(e) => handleInputChange(e, 'experiences', exp.id, 'company')}
                    />
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor={`startDate-${exp.id}`}>Start Date</label>
                      <input 
                        type="text" 
                        id={`startDate-${exp.id}`}
                        placeholder="MM/YYYY"
                        value={exp.startDate}
                        onChange={(e) => handleInputChange(e, 'experiences', exp.id, 'startDate')}
                      />
                    </div>
                    
                    <div className="form-group">
                      <label htmlFor={`endDate-${exp.id}`}>
                        End Date 
                        <span className="checkbox-container">
                          <input 
                            type="checkbox" 
                            id={`current-${exp.id}`}
                            checked={exp.current}
                            onChange={(e) => handleInputChange(e, 'experiences', exp.id, 'current')}
                          />
                          <label htmlFor={`current-${exp.id}`} className="checkbox-label">Current</label>
                        </span>
                      </label>
                      <input 
                        type="text" 
                        id={`endDate-${exp.id}`}
                        placeholder={exp.current ? "Present" : "MM/YYYY"}
                        value={exp.current ? "Present" : exp.endDate}
                        onChange={(e) => handleInputChange(e, 'experiences', exp.id, 'endDate')}
                        disabled={exp.current}
                      />
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor={`experience-${exp.id}`}>Experience Details</label>
                    <textarea 
                      id={`experience-${exp.id}`}
                      placeholder="Responsibilities and achievements..."
                      value={exp.experience}
                      onChange={(e) => handleInputChange(e, 'experiences', exp.id, 'experience')}
                    ></textarea>
                  </div>
                  
                  {formData.experiences.length > 1 && (
                    <button 
                      type="button" 
                      className="btn-remove"
                      onClick={() => removeExperience(exp.id)}
                    >
                      <i className="fas fa-trash"></i> Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'education' && (
            <div className="section">
              <h3>
                Education 
                <button 
                  type="button" 
                  className="btn-add"
                  onClick={addEducation}
                >
                  <i className="fas fa-plus"></i> Add Another
                </button>
              </h3>
              
              {formData.education.map((edu, index) => (
                <div key={edu.id} className="form-section">
                  {index > 0 && <hr className="section-divider" />}
                  <div className="form-group">
                    <label htmlFor={`school-${edu.id}`}>School/University</label>
                    <input 
                      type="text" 
                      id={`school-${edu.id}`}
                      placeholder="University Name"
                      value={edu.school}
                      onChange={(e) => handleInputChange(e, 'education', edu.id, 'school')}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor={`degree-${edu.id}`}>Degree</label>
                    <input 
                      type="text" 
                      id={`degree-${edu.id}`}
                      placeholder="Bachelor of Science in Computer Science"
                      value={edu.degree}
                      onChange={(e) => handleInputChange(e, 'education', edu.id, 'degree')}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor={`field-${edu.id}`}>Field of Study (optional)</label>
                    <input 
                      type="text" 
                      id={`field-${edu.id}`}
                      placeholder="Computer Science"
                      value={edu.field}
                      onChange={(e) => handleInputChange(e, 'education', edu.id, 'field')}
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor={`graduation-${edu.id}`}>Graduation Year</label>
                    <input 
                      type="text" 
                      id={`graduation-${edu.id}`}
                      placeholder="2015-2019 or May 2019"
                      value={edu.graduation}
                      onChange={(e) => handleInputChange(e, 'education', edu.id, 'graduation')}
                    />
                  </div>
                  
                  {formData.education.length > 1 && (
                    <button 
                      type="button" 
                      className="btn-remove"
                      onClick={() => removeEducation(edu.id)}
                    >
                      <i className="fas fa-trash"></i> Remove
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'skills' && (
            <div className="section">
              <h3>Skills</h3>
              <div className="form-group">
                <label htmlFor="skills">List your skills (comma separated)</label>
                <textarea 
                  id="skills" 
                  placeholder="JavaScript, React, HTML, CSS, Node.js"
                  value={formData.skills}
                  onChange={handleBasicInfoChange}
                ></textarea>
                <p className="help-text">Enter skills separated by commas (e.g., JavaScript, React, Node.js)</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="preview-panel">
          <div className="preview-header">
            <h2>Live Preview</h2>
            <div className="template-selector">
              <span className="template-label">Template:</span>
              <button className="btn btn-outline">
                <i className="fas fa-desktop"></i> Modern
              </button>
              <button className="btn btn-primary" onClick={handleSaveResume}>
                <i className="fas fa-save"></i> Save Resume
              </button>
            </div>
          </div>
          
          <div className="preview-container">
            <div className="resume-header">
              <h2 id="preview-name">{formData.fullName || 'Your Name'}</h2>
              <div className="resume-contact">
                <span id="preview-email">{formData.email || 'email@example.com'}</span>
                <span id="preview-phone">{formData.phone || '(123) 456-7890'}</span>
                <span id="preview-location">{formData.location || 'City, State'}</span>
                {formData.linkedin && (
                  <span id="preview-linkedin">
                    {formData.linkedin.replace('https://', '')}
                  </span>
                )}
                {formData.portfolio && (
                  <span id="preview-portfolio">
                    {formData.portfolio.replace('https://', '')}
                  </span>
                )}
              </div>
            </div>
            
            <div className="resume-section">
              <h3>Professional Summary</h3>
              <p id="preview-summary">
                {formData.summary || 'Brief summary of your professional background and career goals. Fill the form to see your resume here.'}
              </p>
            </div>
            
            {formData.experiences.some(exp => exp.jobTitle || exp.company) && (
              <div className="resume-section">
                <h3>Experience</h3>
                {formData.experiences.map((exp, index) => (
                  (exp.jobTitle || exp.company) && (
                    <div key={exp.id} className="experience-item">
                      <h4>
                        {exp.jobTitle && <span className="job-title">{exp.jobTitle}</span>}
                        {exp.jobTitle && exp.company && <span> at </span>}
                        {exp.company && <span className="company">{exp.company}</span>}
                      </h4>
                      {(exp.startDate || exp.endDate) && (
                        <div className="date-range">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </div>
                      )}
                      {exp.experience && (
                        <p className="experience-details">{exp.experience}</p>
                      )}
                    </div>
                  )
                ))}
              </div>
            )}
            
            {formData.education.some(edu => edu.school || edu.degree) && (
              <div className="resume-section">
                <h3>Education</h3>
                {formData.education.map((edu, index) => (
                  (edu.school || edu.degree) && (
                    <div key={edu.id} className="education-item">
                      <h4>
                        {edu.degree && <span className="degree">{edu.degree}</span>}
                        {edu.field && <span className="field">, {edu.field}</span>}
                      </h4>
                      {edu.school && <div className="school">{edu.school}</div>}
                      {edu.graduation && <div className="graduation-date">{edu.graduation}</div>}
                    </div>
                  )
                ))}
              </div>
            )}
            
            <div className="resume-section">
              <h3>Skills</h3>
              <div className="skills-container">
                {skillsArray.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="skill-name">{skill}</div>
                    <div className="skill-level">
                      <div 
                        className="skill-value" 
                        style={{width: `${Math.min(90 - (index * 5), 100)}%`}}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateResume;