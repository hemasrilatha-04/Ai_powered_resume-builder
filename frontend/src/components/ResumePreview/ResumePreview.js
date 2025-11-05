import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import html2pdf from 'html2pdf.js';
import './ResumePreview.css';

const ResumePreview = ({ data, template = 'modern' }) => {
  const componentRef = useRef();

  const handleDownloadPDF = () => {
    const element = componentRef.current;
    const opt = {
      margin: 10,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    html2pdf().set(opt).from(element).save();
  };

  const renderModernTemplate = () => (
    <div className="resume modern" ref={componentRef}>
      <header className="resume-header">
        <h1>{data.personal?.name || 'Your Name'}</h1>
        <div className="contact-info">
          {data.personal?.email && <span>{data.personal.email}</span>}
          {data.personal?.phone && <span>{data.personal.phone}</span>}
          {data.personal?.location && <span>{data.personal.location}</span>}
        </div>
      </header>

      {data.personal?.summary && (
        <section className="resume-section">
          <h2>Professional Summary</h2>
          <p>{data.personal.summary}</p>
        </section>
      )}

      {data.experience && data.experience.length > 0 && (
        <section className="resume-section">
          <h2>Work Experience</h2>
          {data.experience.map((exp, index) => (
            <div key={index} className="experience-item">
              <h3>{exp.title}</h3>
              <div className="company-dates">
                <span className="company">{exp.company}</span>
                <span className="dates">
                  {exp.startDate} - {exp.endDate || 'Present'}
                </span>
              </div>
              <p>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {data.education && data.education.length > 0 && (
        <section className="resume-section">
          <h2>Education</h2>
          {data.education.map((edu, index) => (
            <div key={index} className="education-item">
              <h3>{edu.degree}</h3>
              <div className="school-year">
                <span className="school">{edu.school}</span>
                <span className="year">{edu.year}</span>
              </div>
              {edu.field && <p>{edu.field}</p>}
            </div>
          ))}
        </section>
      )}

      {data.skills && data.skills.length > 0 && (
        <section className="resume-section">
          <h2>Skills</h2>
          <div className="skills-list">
            {data.skills.map((skill, index) => (
              <span key={index} className="skill-tag">{skill}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );

  const renderClassicTemplate = () => (
    <div className="resume classic" ref={componentRef}>
      <header className="resume-header">
        <h1>{data.personal?.name || 'Your Name'}</h1>
        <div className="contact-info">
          {data.personal?.email && <span>{data.personal.email}</span>}
          {data.personal?.phone && <span>{data.personal.phone}</span>}
          {data.personal?.location && <span>{data.personal.location}</span>}
        </div>
      </header>

      <div className="resume-body">
        {data.personal?.summary && (
          <section className="resume-section">
            <h2>Summary</h2>
            <p>{data.personal.summary}</p>
          </section>
        )}

        <div className="two-column">
          {data.experience && data.experience.length > 0 && (
            <section className="resume-section">
              <h2>Experience</h2>
              {data.experience.map((exp, index) => (
                <div key={index} className="experience-item">
                  <h3>{exp.title}</h3>
                  <div className="company-dates">
                    <span className="company">{exp.company}</span>
                    <span className="dates">
                      {exp.startDate} - {exp.endDate || 'Present'}
                    </span>
                  </div>
                  <p>{exp.description}</p>
                </div>
              ))}
            </section>
          )}

          <div className="right-column">
            {data.education && data.education.length > 0 && (
              <section className="resume-section">
                <h2>Education</h2>
                {data.education.map((edu, index) => (
                  <div key={index} className="education-item">
                    <h3>{edu.degree}</h3>
                    <div className="school-year">
                      <span className="school">{edu.school}</span>
                      <span className="year">{edu.year}</span>
                    </div>
                    {edu.field && <p>{edu.field}</p>}
                  </div>
                ))}
              </section>
            )}

            {data.skills && data.skills.length > 0 && (
              <section className="resume-section">
                <h2>Skills</h2>
                <div className="skills-list">
                  {data.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="resume-preview">
      <div className="preview-actions">
        <div className="template-selector">
          <label>Template:</label>
          <select 
            value={template} 
            onChange={(e) => {/* You would add template change handler here */}}
          >
            <option value="modern">Modern</option>
            <option value="classic">Classic</option>
          </select>
        </div>
        
        <div className="action-buttons">
          <ReactToPrint
            trigger={() => <button className="btn btn-primary">Print</button>}
            content={() => componentRef.current}
          />
          <button className="btn btn-secondary" onClick={handleDownloadPDF}>
            Download PDF
          </button>
        </div>
      </div>
      
      <div className="preview-content">
        {template === 'modern' && renderModernTemplate()}
        {template === 'classic' && renderClassicTemplate()}
      </div>
    </div>
  );
};

export default ResumePreview;