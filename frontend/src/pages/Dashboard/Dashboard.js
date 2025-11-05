import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { resumeAPI } from '../../resumeService';
import html2pdf from 'html2pdf.js';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [backendStatus, setBackendStatus] = useState('checking');
  const [resumesCount, setResumesCount] = useState(0);
  const [resumes, setResumes] = useState([]);

  // Test backend connection
  useEffect(() => {
    const loadResumes = async () => {
      try {
        const response = await resumeAPI.getAllResumes();
        setResumesCount(response.data.length);
        setResumes(response.data);
        setBackendStatus('connected');
      } catch (error) {
        setBackendStatus('disconnected');
      }
    };
    loadResumes();
  }, []);

  const createSampleResume = async () => {
    try {
      const newResume = {
        full_name: "Demo User",
        email: "demo@example.com",
        phone: "123-456-7890",
        address: "123 Main Street",
        summary: "Professional resume created with AI assistance",
        skills: ["JavaScript", "React", "Python", "AI/ML"],
        education: [],
        experience: [],
        projects: []
      };

      await resumeAPI.createResume(newResume);

      // Refresh
      const response = await resumeAPI.getAllResumes();
      setResumesCount(response.data.length);
      setResumes(response.data);

    } catch (error) {
      alert('Error creating resume: ' + error.message);
    }
  };

  const handleDeleteResume = async (resumeId) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      try {
        await resumeAPI.deleteResume(resumeId);

        // Refresh
        const response = await resumeAPI.getAllResumes();
        setResumesCount(response.data.length);
        setResumes(response.data);

        alert('Resume deleted successfully!');
      } catch (error) {
        alert('Error deleting resume: ' + error.message);
      }
    }
  };

  const handleDownloadPDF = (resume) => {
    console.log('Downloading PDF for:', resume);
    
    // Create a simple and reliable HTML content
    const content = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { 
            font-family: Arial, sans-serif; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 30px;
            line-height: 1.6;
            color: #333;
          }
          .header { 
            text-align: center; 
            border-bottom: 3px solid #2563eb; 
            padding-bottom: 20px; 
            margin-bottom: 30px;
          }
          .header h1 { 
            color: #2563eb; 
            margin: 0; 
            font-size: 32px;
          }
          .contact-info { 
            margin: 10px 0; 
            color: #666;
          }
          .section { 
            margin: 25px 0; 
          }
          .section h2 { 
            color: #2563eb; 
            border-bottom: 2px solid #e5e7eb; 
            padding-bottom: 8px;
            margin-bottom: 15px;
          }
          .skill-item, .experience-item, .education-item { 
            margin: 8px 0; 
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>${resume.full_name || 'Your Name'}</h1>
          <div class="contact-info">
            <p>📧 ${resume.email || 'No email provided'}</p>
            <p>📱 ${resume.phone || 'No phone provided'}</p>
            ${resume.address ? `<p>📍 ${resume.address}</p>` : ''}
          </div>
        </div>

        ${resume.summary ? `
          <div class="section">
            <h2>Professional Summary</h2>
            <p>${resume.summary}</p>
          </div>
        ` : ''}

        ${resume.skills && resume.skills.length > 0 ? `
          <div class="section">
            <h2>Skills</h2>
            <p><strong>${resume.skills.join(', ')}</strong></p>
          </div>
        ` : ''}

        ${resume.experience && resume.experience.length > 0 ? `
          <div class="section">
            <h2>Work Experience</h2>
            ${resume.experience.map(exp => `
              <div class="experience-item">
                <h3>${exp.title || 'Position'}</h3>
                <p><em>${exp.company || 'Company'} | ${exp.years || 'Period'}</em></p>
                <p>${exp.description || 'Responsibilities and achievements.'}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${resume.education && resume.education.length > 0 ? `
          <div class="section">
            <h2>Education</h2>
            ${resume.education.map(edu => `
              <div class="education-item">
                <h3>${edu.degree || 'Degree'}</h3>
                <p>${edu.school || 'School'} | ${edu.year || 'Year'}</p>
                ${edu.grade ? `<p><strong>Grade:</strong> ${edu.grade}</p>` : ''}
              </div>
            `).join('')}
          </div>
        ` : ''}

        ${resume.projects && resume.projects.length > 0 ? `
          <div class="section">
            <h2>Projects</h2>
            ${resume.projects.map(proj => `
              <div class="project-item">
                <h3>${proj.name || 'Project'}</h3>
                <p>${proj.description || 'Project description.'}</p>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280;">
          <p>Generated by AI Resume Builder</p>
        </div>
      </body>
      </html>
    `;

    // Create a temporary element
    const element = document.createElement('div');
    element.innerHTML = content;
    document.body.appendChild(element);

    // PDF options
    const options = {
      margin: 10,
      filename: `${resume.full_name || 'resume'}_${Date.now()}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        useCORS: true,
        logging: true
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait' 
      }
    };

    // Generate PDF
    html2pdf()
      .set(options)
      .from(element)
      .save()
      .then(() => {
        // Clean up
        document.body.removeChild(element);
        console.log('PDF generated successfully!');
      })
      .catch((error) => {
        console.error('PDF generation failed:', error);
        document.body.removeChild(element);
        alert('PDF generation failed. Please try again.');
      });
  };

  return (
    <div className="dashboard">
      {/* Backend Status - Add this small indicator */}
      <div style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        padding: '5px 10px',
        backgroundColor: backendStatus === 'connected' ? '#4CAF50' : '#ff9800',
        color: 'white',
        borderRadius: '15px',
        fontSize: '12px',
        fontWeight: 'bold'
      }}>
        {backendStatus === 'connected' ? '✅ Backend' : '🔴 Backend'}
      </div>

      {/* YOUR ORIGINAL DASHBOARD CONTENT */}
      <div className="welcome-section">
        <h1>AI Resume Builder</h1>
        <h2>Welcome back, Demo User!</h2>
        <p>Here's an overview of your resumes and documents</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{resumesCount}</h3>
          <p>Resumes</p>
        </div>
        <div className="stat-card">
          <h3>2</h3>
          <p>Cover Letters</p>
        </div>
        <div className="stat-card">
          <h3>12</h3>
          <p>Applications Sent</p>
        </div>
        <div className="stat-card">
          <h3>4</h3>
          <p>Interviews</p>
        </div>
      </div>

      <div className="dashboard-nav">
        <button className="nav-btn active">My Resumes</button>
        <button className="nav-btn">Cover Letters</button>
        <button className="nav-btn">Account Settings</button>
      </div>

      <div className="resumes-section">
        <div className="section-header">
          <h2>Your Resumes</h2>
          <button
            onClick={() => navigate('/create-resume')}
            className="create-btn"
          >
            Create New Resume
          </button>
        </div>

        {resumes.length === 0 ? (
          <div className="empty-state">
            <p>No resumes yet. Create your first resume!</p>
          </div>
        ) : (
          <div className="resumes-grid">
            {resumes.map((resume, index) => (
              <div key={index} className="resume-card">
                <h3>{resume.full_name}</h3>
                <p><strong>Email:</strong> {resume.email}</p>
                <p><strong>Phone:</strong> {resume.phone}</p>
                <p><strong>Summary:</strong> {resume.summary}</p>
                <p><strong>Skills:</strong> {resume.skills?.join(', ')}</p>
                <div className="card-actions">
                  <button className="btn-primary" onClick={() => navigate(`/resume-editor/${resume.id}`)}>Edit</button>
                  <button className="btn-secondary" onClick={() => handleDownloadPDF(resume)}>Download PDF</button>
                  <button className="btn-danger" onClick={() => handleDeleteResume(resume.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;